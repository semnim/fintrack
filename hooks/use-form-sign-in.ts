'use client'
import { zodResolver } from '@hookform/resolvers/zod'

import { useForm } from 'react-hook-form'
import type {z} from "zod";
import {signInSchema} from "@/schemas/forms/sign-in";

export type FormTypeSignin = z.infer<typeof signInSchema>

export const useFormSignIn = () =>
  useForm<FormTypeSignin>({
    resolver: zodResolver(signInSchema),
  })
