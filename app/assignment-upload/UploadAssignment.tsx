"use client"
import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { FcCheckmark } from 'react-icons/fc';

export default function UploadAssignment({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadComplete, setUploadComplete] = useState<boolean>(false);
	
  useEffect(() => {
    if (uploadComplete) {
      setTimeout(() => setUploadComplete(false), 3000); // Reset after 3 seconds
    }
  }, [uploadComplete]);
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.length) {
      setFile(files[0]);
    }
  };

  const onUpload = async () => {
    if (!file) return;

    setUploading(true);

    const filePath = `assignments/assignment_1/${file.name}`;
    let { error: uploadError } = await supabase.storage.from('assignments').upload(filePath, file);

    if (uploadError) {
      console.error("Error uploading file:", uploadError.message);
      // Handle the error appropriately here.
    } else {
      console.log("File uploaded successfully!");
	  setUploadComplete(true);
    }

    setUploading(false);
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10 p-6 bg-background rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-5 text-foreground">Upload to Assignment 1</h2>

      <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="assignmentFile">
          Choose File
        </label>
        <input 
          type="file" 
          id="assignmentFile" 
          onChange={onFileChange}
          className="px-3 py-2 border rounded-md text-sm text-foreground"
        />
      </div>
	<button 
      className="w-full bg-btn-background hover:bg-btn-background-hover text-white font-bold py-2 px-4 rounded relative"
      onClick={onUpload}
      disabled={uploading}
    >
      {uploading ? 'Uploading...' : 'Upload'}

      {uploadComplete && (
        <div className="absolute inset-0 flex items-center justify-center">
          <FcCheckmark className="in-animate" />
        </div>
      )}
    </button>
    </div>
  );
}

