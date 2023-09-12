"use client"

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Session } from '@supabase/auth-helpers-nextjs'; // Import the type for Session if necessary
import UploadAssignment from './UploadAssignment'; 

export default function Assignment() {
  const supabase = createClientComponentClient(); // Use the client-side Supabase client
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // This function fetches the session and updates the local state
    const fetchSession = async () => {
      const {
        data: { session: fetchedSession }
      } = await supabase.auth.getSession();
      setSession(fetchedSession);
    };

    // Call the function after the component is mounted
    fetchSession();
  }, []); // The empty dependency array ensures this effect runs once after the component is mounted

  return <UploadAssignment session={session} />;
}

