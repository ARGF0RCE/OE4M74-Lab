"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState } from 'react';
import Link from 'next/link';
import Messages from './messages';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabase.auth.signUp({
      email,
      password,
    });
	  router.push("/auth/callback");
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
	  router.push("/account");
  };

  return (
    <div className="flex flex-col justify-center flex-1 w-full px-8 sm:max-w-md gap-2">
      <Link
        href="/"
        className="absolute flex items-center px-4 py-2 text-sm no-underline left-8 top-8 rounded-md text-foreground bg-btn-background hover:bg-btn-background-hover group"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{' '}
        Back
      </Link>

      <form
        onSubmit={handleSignIn}
        className="flex flex-col justify-center flex-1 w-full gap-2 text-foreground"
      >
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="px-4 py-2 mb-6 border rounded-md bg-inherit"
          name="email"
          placeholder="you@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="px-4 py-2 mb-6 border rounded-md bg-inherit"
          type="password"
          name="password"
          placeholder="••••••••"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="px-4 py-2 mb-2 text-white bg-green-700 rounded">
          Sign In
        </button>
        <button
          type="button"
          onClick={handleSignUp}
          className="px-4 py-2 mb-2 text-black border border-gray-700 rounded"
        >
          Sign Up
        </button>
        <Messages />
      </form>
    </div>
  );
}

