import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const requestUrl = new URL(request.nextUrl)
  const supabase = createRouteHandlerClient({ cookies })

  await supabase.auth.signOut()

  return NextResponse.redirect(`${requestUrl.origin}/login`, {
    // a 301 status is required to redirect from a POST to a GET route
    status: 301,
  })
}
