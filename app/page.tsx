import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {getServerSession} from "next-auth";

export default async function Home() {
  return (
    <div
      className='grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20'>
      <main
        className='row-start-2 flex flex-col items-center gap-[32px] sm:items-start'>

      </main>
    </div>
  );
}
