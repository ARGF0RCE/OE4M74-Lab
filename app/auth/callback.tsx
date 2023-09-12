import { useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/router';

export default function Callback() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    // This function exchanges the code for a session and then redirects the user
    const handleAuthCallback = async () => {
      const { code } = router.query;

      if (code) {
        await supabase.auth.exchangeCodeForSession(code as string);
        router.push('/'); // redirect to home or any other page after authentication
      } else {
        // Handle error or edge case where code might be missing
        console.error("Auth callback error: 'code' parameter is missing from the URL.");
        router.push('/login'); // or redirect to some error page
      }
    };

    handleAuthCallback();
  }, [router, supabase]);

  // You can show some loading state to the user while the auth process completes
  return <div>Processing authentication...</div>;
}

