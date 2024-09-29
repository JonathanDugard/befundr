'use client';

import { uploadImageToFirebase } from '@/utils/functions/firebaseFunctions';
import {
  getTimestampInFuture,
  toCamelCase,
} from '@/utils/functions/utilFunctions';
import { PublicKey } from '@solana/web3.js';
import toast from 'react-hot-toast';

// function to prepare the project object to use in the blockchain TX
export const handleProjectCreation = async (
  project: Project,
  projectImage: File | null,
  userPublicKey: PublicKey
) => {
  //* check data completion
  const validation = validateProjectToCreate(project);
  if (validation !== true) {
    console.error(validation);
    if (typeof validation === 'string') {
      toast.error(validation);
    }
  }

  //* upload project image
  const timestamp = Date.now();
  let imageUrl = '';
  if (projectImage) {
    try {
      imageUrl = await uploadImageToFirebase(
        `projects/${toCamelCase(project.name)}_${timestamp}/mainImage`,
        projectImage
      );
    } catch (error) {
      console.error('Error uploading project image:', error);
      toast.error('Failed to upload the project image.');
      return;
    }
  }

  //* Prepare the rewards data and upload reward images if provided
  const updatedRewards = await Promise.all(
    project.rewards.map(async (reward) => {
      if (reward.imageFile) {
        try {
          // Upload reward image to Firebase
          const rewardImageUrl = await uploadImageToFirebase(
            `projects/${toCamelCase(
              project.name
            )}_${timestamp}/rewards/${toCamelCase(reward.name)}`,
            reward.imageFile
          );
          // convert stringify number to real number
          let convertedSupply = null;
          if (reward.maxSupply) convertedSupply = Number(reward.maxSupply);
          const convertedPrice = Number(reward.price);
          // Return updated reward with the image URL
          return {
            ...reward,
            imageUrl: rewardImageUrl,
            maxSupply: convertedSupply,
            price: convertedPrice,
          };
        } catch (error) {
          console.error(
            `Error uploading reward image for ${reward.name}:`,
            error
          );
          toast.error(`Failed to upload image for reward: ${reward.name}`);
          return reward; // Return the original reward if upload fails
        }
      } else {
        return reward; // If no image, return reward as-is
      }
    })
  );

  //* Prepare final data for blockchain transaction
  // convert stringify number to real number
  const convertedSafetyDeposit = Number(project.safetyDeposit);
  const convertedGoalAmount = Number(project.goalAmount);
  // convert endtime number to timestamp
  const convertedEndTime = getTimestampInFuture(project.endTime);
  const convertedEndTimeInSecond = Math.floor(convertedEndTime / 1000); // convertion from millisecond to second for BE compatibility

  const projectData: Project = {
    ...project,
    imageUrl, // Replace with the uploaded project image URL
    rewards: updatedRewards, // Include the rewards with their uploaded images
    ownerId: userPublicKey.toString(),
    timestamp: Date.now(), // Replace with current timestamp
    safetyDeposit: convertedSafetyDeposit,
    endTime: convertedEndTimeInSecond,
    goalAmount: convertedGoalAmount,
  };

  return projectData;
};

/**
 * Checks if all necessary information in projectToCreate is filled.
 * Returns the missing field or true if everything is properly filled.
 *
 * @param projectToCreate - The project object to be validated.
 * @returns {boolean | string} - Returns true if everything is filled, otherwise returns a message indicating the missing field.
 */
const validateProjectToCreate = (
  projectToCreate: Project
): boolean | string => {
  // Define the required fields with readable names
  const requiredFields: Array<keyof Project> = [
    'name',
    'category',
    'imageUrl',
    'projectDescription',
    'goalAmount',
    'timestamp',
    'endTime',
  ];

  // Check each required field
  for (const field of requiredFields) {
    if (
      !projectToCreate[field] ||
      projectToCreate[field] === '' ||
      projectToCreate[field] === 0
    ) {
      return `The field "${field}" is required and must be filled.`;
    }
  }

  // Additional check for rewards
  if (projectToCreate.rewards.length === 0) {
    return 'At least one reward must be added to the project.';
  }

  // If everything is good, return true
  return true;
};
