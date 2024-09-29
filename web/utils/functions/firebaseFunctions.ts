import { storage } from '@/firebase/firebaseInit';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';

// Upload an image to firebase
export async function uploadImageToFirebase(storagePath: string, file: File) {
  const storageRef = ref(storage, storagePath);

  // Upload the file
  const snapshot = await uploadBytes(storageRef, file);

  // Return the url
  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
}

// Delete an image from firebase
export async function deleteImageFromFirebase(imageUrl: string) {
  if (!imageUrl) return;
  // Get the image ref
  const storageRef = ref(storage, imageUrl);
  try {
    // Delete the image
    await deleteObject(storageRef);
  } catch (error) {
    console.error('Error deleting old image: ', error);
  }
}
