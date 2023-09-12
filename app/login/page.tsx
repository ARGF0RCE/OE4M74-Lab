import Link from 'next/link'
import Messages from './messages'

export default function Login() {
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
        className="flex flex-col justify-center flex-1 w-full gap-2 text-foreground"
		action="/api/auth/sign-in"
        method="post"
      >
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="px-4 py-2 mb-6 border rounded-md bg-inherit"
          name="email"
          placeholder="you@example.com"
          required
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
        />
        <button className="px-4 py-2 mb-2 text-white bg-green-700 rounded">
          Sign In
        </button>
        <button
			formAction="/api/auth/sign-up"
          className="px-4 py-2 mb-2 text-black border border-gray-700 rounded"
        >
          Sign Up
        </button>
        <Messages />
      </form>
    </div>
  )
}
