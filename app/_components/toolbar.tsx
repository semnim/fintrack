import {Logo} from "@/components/ui/logo";
import {Nav} from "@/app/_components/nav";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

export const Toolbar = async () => {
  const {user} = await getServerSession(authOptions) ?? {user: null};

  if (!user) return null;
  return (
    <div className='grid grid-cols-[1fr_3fr_1fr] p-4'>
      <Logo size="regular"/>
      <Nav/>
    </div>
  )
}
