import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import LogoutButton from '../components/LogoutButton'
import SupabaseLogo from '../components/SupabaseLogo'
// import NextJsLogo from '../components/NextJsLogo'
import SvgComponent from '../components/IIITLogo'
import {Head} from 'next/document'
export const dynamic = 'force-dynamic'


export default async function Index() {
  const supabase = createServerComponentClient({ cookies })

    const {
        data: { user },
    } = await supabase.auth.getUser()

    return (
		<div className="flex flex-col items-center w-full bg-dark text-foreground">
            {/* Navigation */}
            <nav className="flex justify-center w-full h-16 border-b border-b-foreground/10">
                <div className="flex items-center justify-between w-full max-w-4xl p-3 text-sm">
                    <div />
                    <div>
                        {user ? (
                            <div className="flex items-center gap-4">
                                Hey, {user.email}!
                                <LogoutButton />
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="px-4 py-2 no-underline rounded-md bg-btn-background hover:bg-btn-background-hover"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="flex flex-col max-w-4xl px-3 py-16 opacity-0 animate-in gap-14 lg:py-24">
                <div className="flex flex-col items-center mb-4 lg:mb-12">
                    <div className="flex items-center justify-center gap-8">
                        <Link href="https://supabase.com/" target="_blank">
                            <SupabaseLogo />
                        </Link>
                        <span className="h-6 border-l rotate-45" />
                        <SvgComponent />
                    </div>
                </div>

                {/* Description */}
                <div className="mt-12 text-center">
                    <h1 className="mb-6 text-2xl font-bold lg:text-4xl">AI ML for Engineering Applications Lab Assignments Portal</h1>
                    <p className="text-lg lg:text-xl">Welcome to the official portal for AI and ML assignments. Here, students can submit their assignments, view grades, and receive feedback. Get started by logging in!</p>
                </div>

            </div>
        </div>
    )
}
