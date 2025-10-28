'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { useStore } from '@/lib/store';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { db, storage, isFirebaseConfigured } from '@/lib/firebase';

export default function PhotoUpload() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const user = useStore((state) => state.user);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setOriginalFile(file);

    const reader = new FileReader();
    reader.onload = (event) => {
      setSelectedImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!selectedImage || !originalFile || !user) return;
    
    // Check if Firebase is configured
    if (!isFirebaseConfigured()) {
      alert('⚠️ Please configure Firebase first! Check .env.local file.');
      return;
    }
    
    setUploading(true);
    
    try {
      // Create a unique filename
      const timestamp = Date.now();
      const fileExt = originalFile.name.split('.').pop();
      const filename = `photos/${user.role}/${timestamp}-${Date.now()}.${fileExt}`;
      
      // Get a reference to the storage location
      const storageRef = ref(storage, filename);
      
      // Upload the file
      const snapshot = await uploadBytes(storageRef, originalFile);
      console.log('Upload complete:', snapshot);
      
      // Get the download URL
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log('File available at:', downloadURL);
      
      // Save metadata to Firestore
      await addDoc(collection(db, 'photos'), {
        url: downloadURL,
        filename: snapshot.ref.name,
        author: user.role,
        timestamp: Date.now(),
        size: originalFile.size,
        type: originalFile.type,
      });
      
      console.log('Photo metadata saved to Firestore');
      
      // Reset form
      setUploading(false);
      setSelectedImage(null);
      setOriginalFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      // Show success notification
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 glass px-6 py-3 rounded-xl text-white bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg z-50';
      notification.innerHTML = '✨ Photo uploaded to Firebase successfully! 💕';
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.remove();
      }, 3000);
      
    } catch (error) {
      console.error('Upload error:', error);
      setUploading(false);
      
      // Show error notification
      const errorNotification = document.createElement('div');
      errorNotification.className = 'fixed top-4 right-4 glass px-6 py-3 rounded-xl text-white bg-gradient-to-r from-red-500 to-pink-500 shadow-lg z-50';
      errorNotification.innerHTML = '❌ Upload failed. Check console for details.';
      document.body.appendChild(errorNotification);
      
      setTimeout(() => {
        errorNotification.remove();
      }, 3000);
    }
  };

  const handleRemove = () => {
    setSelectedImage(null);
    setOriginalFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="glass p-6 rounded-3xl backdrop-blur-sm">
      <h2 className="text-3xl romantic-font text-rose-700 mb-6">
        Upload Memories 📸
      </h2>

      <div className="space-y-4">
        {/* Upload area */}
        {!selectedImage ? (
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="border-2 border-dashed border-rose-300 rounded-2xl p-12 text-center cursor-pointer hover:bg-rose-50/50 transition-all"
            onClick={() => fileInputRef.current?.click()}
          >
            <ImageIcon className="w-16 h-16 mx-auto mb-4 text-rose-400" />
            <p className="text-gray-600 mb-2">Click to upload photo</p>
            <p className="text-sm text-gray-400">PNG, JPG up to 10MB</p>
          </motion.div>
        ) : (
          <div className="relative">
            <img
              src={selectedImage}
              alt="Preview"
              className="w-full h-64 object-cover rounded-2xl"
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleRemove}
              className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full shadow-lg"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Action buttons */}
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleUpload}
              disabled={uploading}
              className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? 'Uploading...' : 'Upload Photo'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-xl font-semibold transition-colors"
            >
              Change
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

