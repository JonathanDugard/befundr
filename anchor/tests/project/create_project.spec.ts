import { program } from "../config";
import { createProject, createUser, createUserWalletWithSol } from "../utils";
import { ONE_DAY_MILLISECONDS, projectData1 } from "./project_dataset";
import { userData1 } from "../user/user_dataset";
import { BN } from "@coral-xyz/anchor";

describe('createProject', () => {
    it("should successfully create a project", async () => {
        const userWallet = await createUserWalletWithSol();
        const userPdaKey = await createUser(userData1, userWallet);
        const projectPdaKey = await createProject(projectData1, 0, userPdaKey, userWallet)

        const projectPda = await program.account.project.fetch(projectPdaKey);

        expect(projectPda.name).toEqual(projectData1.name);
        expect(projectPda.description).toEqual(projectData1.description);
        expect(projectPda.imageUrl).toEqual(projectData1.imageUrl);
        expect(projectPda.owner).toEqual(userWallet.publicKey);
        expect(projectPda.user).toEqual(userPdaKey);
        expect(projectPda.endTime.toNumber()).toEqual(Math.floor(projectData1.endTime.toNumber() / 1000));
        expect(projectPda.goalAmount.toNumber()).toEqual(projectData1.goalAmount.toNumber());
        expect(projectPda.safetyDeposit.toNumber()).toEqual(projectData1.safetyDeposit.toNumber());
    });

    it("should throw an error if the name is too short", async () => {
        const userWallet = await createUserWalletWithSol();
        const userPdaKey = await createUser(userData1, userWallet);
        const expectedError = /Error Code: NameTooShort\. Error Number: .*\. Error Message: Project name is too short \(min 5 characters\).*/;
        const MIN_NAME_LENGTH = 5;
        const projectData = { ...projectData1, name: "a".repeat(Math.max(0, MIN_NAME_LENGTH - 1)) };

        await expect(createProject(projectData, 0, userPdaKey, userWallet)).rejects
            .toThrow(expectedError);
    });

    it("should throw an error if the name is too long", async () => {
        const userWallet = await createUserWalletWithSol();
        const userPdaKey = await createUser(userData1, userWallet);
        const expectedError = /Error Code: NameTooLong\. Error Number: .*\. Error Message: Project name is too long \(max 64 characters\).*/;
        const MAX_NAME_LENGTH = 64;
        const projectData = { ...projectData1, name: "a".repeat(MAX_NAME_LENGTH + 1) };

        await expect(createProject(projectData, 0, userPdaKey, userWallet)).rejects
            .toThrow(expectedError);
    });

    it("should throw an error if the image url is too long", async () => {
        const userWallet = await createUserWalletWithSol();
        const userPdaKey = await createUser(userData1, userWallet);
        const expectedError = /Error Code: ImageUrlTooLong\. Error Number: .*\. Error Message: Image URL is too long \(max 256 characters\).*/;
        const MAX_URL_LENGTH = 256;
        const projectData = { ...projectData1, imageUrl: "a".repeat(MAX_URL_LENGTH + 1) };

        await expect(createProject(projectData, 0, userPdaKey, userWallet)).rejects
            .toThrow(expectedError);
    });

    it("should throw an error if the description is too short", async () => {
        const userWallet = await createUserWalletWithSol();
        const userPdaKey = await createUser(userData1, userWallet);
        const expectedError = /Error Code: DescriptionTooShort\. Error Number: .*\. Error Message: Description is too short \(min 10 characters\).*/;
        const MIN_DESCRIPTION_LENGTH = 10;
        const projectData = { ...projectData1, description: "a".repeat(Math.max(0, MIN_DESCRIPTION_LENGTH - 1)) };

        await expect(createProject(projectData, 0, userPdaKey, userWallet)).rejects
            .toThrow(expectedError);
    });

    it("should throw an error if the description is too long", async () => {
        const userWallet = await createUserWalletWithSol();
        const userPdaKey = await createUser(userData1, userWallet);
        const expectedError = /Error Code: DescriptionTooLong\. Error Number: .*\. Error Message: Description is too long \(max 500 characters\).*/;
        const MAX_DESCRIPTION_LENGTH = 500;
        const projectData = { ...projectData1, description: "a".repeat(MAX_DESCRIPTION_LENGTH + 1) };

        await expect(createProject(projectData, 0, userPdaKey, userWallet)).rejects
            .toThrow(expectedError);
    });

    it("should throw an error if the goal amount is too low", async () => {
        const userWallet = await createUserWalletWithSol();
        const userPdaKey = await createUser(userData1, userWallet);
        const expectedError = /Error Code: GoalAmountBelowLimit\. Error Number: .*\. Error Message: Goal amount is too low \(min \$1\).*/;
        const MIN_PROJECT_GOAL_AMOUNT = 0;
        const projectData = { ...projectData1, goalAmount: new BN(Math.max(0, MIN_PROJECT_GOAL_AMOUNT - 1)) };

        await expect(createProject(projectData, 0, userPdaKey, userWallet)).rejects
            .toThrow(expectedError);
    });

    it("should throw an error if the end time is in the past", async () => {
        const userWallet = await createUserWalletWithSol();
        const userPdaKey = await createUser(userData1, userWallet);
        const expectedError = /Error Code: EndTimeInPast\. Error Number: .*\. Error Message: End time is in the past.*/;
        const projectData = { ...projectData1, endTime: new BN(Date.now() - ONE_DAY_MILLISECONDS) };

        await expect(createProject(projectData, 0, userPdaKey, userWallet)).rejects
            .toThrow(expectedError);
    });

    it("should throw an error if the end time is too far in the future", async () => {
        const userWallet = await createUserWalletWithSol();
        const userPdaKey = await createUser(userData1, userWallet);
        const expectedError = /Error Code: ExceedingEndTime\. Error Number: .*\. Error Message: End time beyond the limit.*/;
        const MAX_PROJECT_CAMPAIGN_DURATION = ONE_DAY_MILLISECONDS * 90;
        const projectData = { ...projectData1, endTime: new BN(Date.now() + MAX_PROJECT_CAMPAIGN_DURATION * 2) };

        await expect(createProject(projectData, 0, userPdaKey, userWallet)).rejects
            .toThrow(expectedError);
    });

    it("should throw an error if there are not enough rewards", async () => {
        const userWallet = await createUserWalletWithSol();
        const userPdaKey = await createUser(userData1, userWallet);
        const expectedError = /Error Code: NotEnoughRewards\. Error Number: .*\. Error Message: Not enough rewards \(min 1\).*/;
        const MIN_REWARDS_NUMBER = 1;
        const projectData = { ...projectData1, rewards: projectData1.rewards.slice(0, Math.max(0, MIN_REWARDS_NUMBER - 1)) };

        await expect(createProject(projectData, 0, userPdaKey, userWallet)).rejects
            .toThrow(expectedError);
    });

    it("should throw an error if there are too many rewards", async () => {
        const userWallet = await createUserWalletWithSol();
        const userPdaKey = await createUser(userData1, userWallet);
        const expectedError = /Error Code: TooManyRewards\. Error Number: .*\. Error Message: Too many rewards \(max 10\).*/;
        const MAX_REWARDS_NUMBER = 5;
        const projectData = { ...projectData1, rewards: Array(MAX_REWARDS_NUMBER + 1).fill(projectData1.rewards.at(0)) };

        await expect(createProject(projectData, 0, userPdaKey, userWallet)).rejects
            .toThrow(expectedError);
    });
});