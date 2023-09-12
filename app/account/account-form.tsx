"use client"
import { useCallback, useEffect, useState } from 'react'
import { Database } from '../database'
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Avatar from './avatar'
export default function AccountForm({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient<Database>()
  const [loading, setLoading] = useState(true)
  const [fullname, setFullname] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [website, setWebsite] = useState<string | null>(null)
  const [avatar_url, setAvatarUrl] = useState<string | null>(null)
  const user = session?.user

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, username, website, avatar_url`)
        .eq('id', user?.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setFullname(data.full_name)
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      alert('Error loading user data!')
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    getProfile()
  }, [user, getProfile])

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string | null
    fullname: string | null
    website: string | null
    avatar_url: string | null
  }) {
    try {
      setLoading(true)

      let { error } = await supabase.from('profiles').upsert({
        id: user?.id as string,
        full_name: fullname,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      })
      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
    } finally {
      setLoading(false)
    }
  }

  return (
	<div className="form-widget bg-dark text-foreground p-8 rounded-lg shadow-lg">

            {/* Avatar Section */}
            <div className="mb-6 flex justify-center items-center">
                <Avatar
                    uid={user.id}
                    url={avatar_url}
                    size={150}
                    onUpload={(url) => {
                        setAvatarUrl(url)
                        updateProfile({ fullname, username, website, avatar_url: url })
                    }}
                />
            </div>

            {/* Form Section */}
            <div className="space-y-4">
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
                    <input id="email" type="text" value={session?.user.email} disabled className="w-full p-2 bg-gray-800 rounded border border-foreground/20 text-white" />
                </div>
                <div>
                    <label htmlFor="fullName" className="block mb-2 text-sm font-medium">Full Name</label>
                    <input
                        id="fullName"
                        type="text"
                        value={fullname || ''}
                        onChange={(e) => setFullname(e.target.value)}
                        className="w-full p-2 bg-gray-800 rounded border border-foreground/20"
                    />
                </div>
                <div>
                    <label htmlFor="username" className="block mb-2 text-sm font-medium">Username</label>
                    <input
                        id="username"
                        type="text"
                        value={username || ''}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-2 bg-gray-800 rounded border border-foreground/20"
                    />
                </div>
                <div>
                    <label htmlFor="website" className="block mb-2 text-sm font-medium">Website</label>
                    <input
                        id="website"
                        type="url"
                        value={website || ''}
                        onChange={(e) => setWebsite(e.target.value)}
                        className="w-full p-2 bg-gray-800 rounded border border-foreground/20"
                    />
                </div>

                <div className="mt-6">
                    <button
                        className="button primary block w-full py-2 px-4 bg-btn-background hover:bg-btn-background-hover transform transition duration-150 ease-in-out hover:scale-105"
                        onClick={() => updateProfile({ fullname, username, website, avatar_url })}
                        disabled={loading}
                    >
                        {loading ? 'Loading ...' : 'Update'}
                    </button>
                </div>

                <div className="mt-4">
                    <form action="/auth/sign-out" method="post">
                        <button className="button block w-full py-2 px-4 bg-red-500 hover:bg-red-600 transform transition duration-150 ease-in-out hover:scale-105" type="submit">
                            Sign out
                        </button>
                    </form>
                </div>
                <div className="mt-4">
					<form action="/assignment-upload/" method="post">
                        <button className="button block w-full py-2 px-4 bg-red-500 hover:bg-red-600 transform transition duration-150 ease-in-out hover:scale-105" type="submit">
                            Upload Assignments
                        </button>
                    </form>
                </div>
            </div>
        </div>
  )
} 
