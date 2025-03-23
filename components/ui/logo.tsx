"use client"

import {ChartNoAxesColumn} from "lucide-react";
import {redirect} from "next/navigation";
import Link from "next/link";
import {cn} from "@/lib/utils";

type Props = {
  size: "regular" | "large"
}
export const Logo = ({size}: Props) => {
  return (
    <Link href="/"
          className={
            cn(
              'box-border flex w-min items-center gap-2 border-transparent border-b hover:border-red-600 hover:border-b',
              {
                "text-xl": size === "regular",
                "text-4xl": size === "large",
              }
            )
          }
          onClick={() => redirect("/")}>
      <ChartNoAxesColumn color="red" size={30}/>
      <h1>Fin<span className="text-red-600">Track</span></h1>
    </Link>
  )
}
