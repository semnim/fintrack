'use client'

import AuthLayout from "@/app/(auth)/_components/auth-layout";
import {RegisterForm} from "@/app/(auth)/register/_components/RegisterForm";

export default function Register() {
  return (
    <AuthLayout>
      <RegisterForm/>
    </AuthLayout>
  )
}
