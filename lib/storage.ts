import { getStorage, ref, uploadBytes, getDownloadURL, UploadResult } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';
import type { UserRole } from '@/types';

/**
 * Upload a photo to Firebase Storage
 * @param file - The image file to upload
 * @param author - The user who is uploading (role)
 * @returns The download URL of the uploaded photo
 */
export async function uploadPhoto(
  file: File,
  author: UserRole
): Promise<string> {
  try {
    const storage = getStorage();
    const timestamp = Date.now();
    const filename = `photos/${author}/${timestamp}-${file.name}`;
    const storageRef = ref(storage, filename);
    
    // Upload the file
    const result: UploadResult = await uploadBytes(storageRef, file);
    
    // Get the download URL
    const downloadURL = await getDownloadURL(result.ref);
    
    // Save photo metadata to Firestore
    await addDoc(collection(db, 'photos'), {
      url: downloadURL,
      filename: result.ref.name,
      author,
      timestamp: Date.now(),
      path: filename,
    });
    
    return downloadURL;
  } catch (error) {
    console.error('Error uploading photo:', error);
    throw error;
  }
}

/**
 * Convert data URL to File object
 */
export function dataURLtoFile(dataurl: string, filename: string): File {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  
  return new File([u8arr], filename, { type: mime });
}

