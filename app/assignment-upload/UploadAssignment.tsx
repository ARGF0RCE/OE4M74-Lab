"use client"
import { useState, useEffect } from 'react';
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { FcCheckmark } from 'react-icons/fc';

export default function UploadAssignment({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadComplete, setUploadComplete] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsername() {
      if (session) {
        let { data, error } = await supabase.from('profiles').select('username').eq('id', session.user.id).single();

        if (error) {
          console.error('Error fetching username:', error);
        } else if (data && data.username) {
          setUsername(data.username);
        }
      }
    }

    fetchUsername();
  }, [session, supabase]);

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
    if (!file || !username) return;

    setUploading(true);

    const filePath = `assignments/assignment_1/${username}/${file.name}`;
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
    <div className="w-full max-w-md p-6 mx-auto mt-10 shadow-md bg-background rounded-md">
      <h2 className="mb-5 text-2xl font-bold text-foreground">Upload to Assignment 1</h2>

      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold" htmlFor="assignmentFile">
          Choose File
        </label>
        <input
          type="file"
          id="assignmentFile"
          onChange={onFileChange}
          className="px-3 py-2 text-sm border rounded-md text-foreground"
        />
      </div>
      <button
        className="relative w-full px-4 py-2 font-bold text-white rounded bg-btn-background hover:bg-btn-background-hover"
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
