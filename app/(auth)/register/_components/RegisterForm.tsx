import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {signIn} from "next-auth/react";
import Link from "next/link";
import {useFormRegister} from "@/hooks/use-form-register";
import {DatePicker} from "@/components/ui/date-picker";
import bcrypt from "bcryptjs";
import type {InsertUser} from "@/db/users/schema";
import {usersTable} from "@/db/users/schema";
import {db} from "@/db/index";
import {toast} from "sonner";
import {tryCatch} from "@/lib/try-catch";
import {Controller} from "react-hook-form"

export function RegisterForm({
                               className,
                               ...props
                             }: React.ComponentPropsWithoutRef<"div">) {

  const {
    register, formState: {errors},
    control,
    handleSubmit
  } = useFormRegister()

  const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 10;
    return await new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, (error, hash) => {
        if (error) reject(error.message);
        if (!hash) reject("Error generating hash!");
        resolve(hash as string);
      })
    });

  }
  const insertUser = async ({name, email, password, dob}: Omit<InsertUser, 'passwordHash'> & {
    password: string
  }) => {
    const passwordHash = await hashPassword(password);

    const user: InsertUser = {
      name,
      email,
      passwordHash,
      dob
    };

    await db.insert(usersTable).values(user);
  }


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Sign up</CardTitle>
          <CardDescription>
            Tell us something about yourself
          </CardDescription>
        </CardHeader>
        <CardContent>

          <div className="grid gap-6">
            <form
              onSubmit={
                handleSubmit(async ({email, password, name, dob}) => {
                  const user = await tryCatch(insertUser({
                    name,
                    email,
                    password,
                    dob,
                  }));

                  if (user.error) {
                    toast.error(user.error.message);
                    return;
                  }
                  toast("User created. 🎉")
                  await signIn('credentials', {email, password, callbackUrl: '/'})
                })
              }>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Name"
                    required
                    {...register("name")}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="name">Date of birth</Label>
                  <Controller
                    control={control}
                    name='dob'
                    render={({field}) => (
                      <DatePicker
                        error={errors.dob}
                        onChangeAction={(date) => field.onChange(date)}
                        date={field.value}
                      />
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    {...register("email")}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" required
                         placeholder="********" {...register("password")}/>
                </div>
                <Button type="submit" className="w-full">
                  Sign up
                </Button>
              </div>
            </form>
            <div className="text-center text-sm">
              Already have an account?&nbsp;
              <Link href="/login" className="underline underline-offset-4">
                Sign in
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
      <div
        className='text-balance text-center text-muted-foreground text-xs [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary '>
        By clicking continue, you agree to our <a href="/#">Terms of Service</a>&nbsp;
        and <a href="/#">Privacy Policy</a>.
      </div>
    </div>
  )
}
