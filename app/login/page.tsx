import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Image from "next/image";

export default function Login() {
  return (
    <div
      className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className={"text-3xl"}>Welcome back</h1>
        <form className={"flex flex-col gap-4"}>
          <Input placeholder={"your@email.com"} type={"email"}/>
          <Input placeholder={"*********"} type={"password"}/>
          <Button type={"submit"} variant={"default"}>Login</Button>
        </form>
        <p className={"text-center w-full text-zinc-500"}>OR</p>
        <Button variant={"outline"}>
          <Image
            aria-hidden
            src="/google_logo.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Continue With Google
        </Button>
      </main>
    </div>
  );
}
