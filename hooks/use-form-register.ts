'use client'
import {zodResolver} from '@hookform/resolvers/zod'

import {useForm} from 'react-hook-form'
import {z} from 'zod'

import {registerSchema} from "@/schemas/forms/register";

export type FormTypeRegister = z.infer<typeof registerSchema>

export const useFormRegister = () =>
  useForm<FormTypeRegister>({
    resolver: zodResolver(registerSchema),
  })
