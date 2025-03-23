'use client'

import {redirect} from "next/navigation";
import {useUser} from "@/hooks/use-user";
import AuthLayout from "@/app/(auth)/_components/auth-layout";
import {LoginForm} from "@/app/(auth)/login/_components/LoginForm";


export default function Login() {
  const user = useUser()

  if (user) {
    redirect('/')
  }


  return (
    <AuthLayout>
      <LoginForm/>
    </AuthLayout>
  )
}
