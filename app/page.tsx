import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import LogoutButton from '../components/LogoutButton'
import SupabaseLogo from '../components/SupabaseLogo'
// import NextJsLogo from '../components/NextJsLogo'
import SvgComponent from '../components/IIITLogo'
export const dynamic = 'force-dynamic'


export default async function Index() {
  const supabase = createServerComponentClient({ cookies })

    const {
        data: { user },
    } = await supabase.auth.getUser()

    return (
        <div className="w-full flex flex-col items-center bg-dark text-foreground">

            {/* Navigation */}
            <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
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
                                className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="animate-in flex flex-col gap-14 opacity-0 max-w-4xl px-3 py-16 lg:py-24">
                <div className="flex flex-col items-center mb-4 lg:mb-12">
                    <div className="flex gap-8 justify-center items-center">
                        <Link href="https://supabase.com/" target="_blank">
                            <SupabaseLogo />
                        </Link>
                        <span className="border-l rotate-45 h-6" />
                        <SvgComponent />
                    </div>
                </div>

                {/* Description */}
                <div className="text-center mt-12">
                    <h1 className="text-2xl lg:text-4xl font-bold mb-6">AI ML for Engineering Applications Lab Assignments Portal</h1>
                    <p className="text-lg lg:text-xl">Welcome to the official portal for AI and ML assignments. Here, students can submit their assignments, view grades, and receive feedback. Get started by logging in!</p>
                </div>

            </div>
        </div>
    )
}
