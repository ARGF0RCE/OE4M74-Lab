import {createClientComponentClient} from "@supabase/auth-helpers-nextjs"
import {useRouter} from "next/navigation"

export default function LogoutButton() {
	const router = useRouter()
	const supabase = createClientComponentClient()
	 const handleSignOut = async () => {
    await supabase.auth.signOut()
		 router.push("/login")
  }
	return (
      <button onClick={handleSignOut} className="px-4 py-2 no-underline rounded-md bg-btn-background hover:bg-btn-background-hover">
        Logout
      </button>
  )
}
