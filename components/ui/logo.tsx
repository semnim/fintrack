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
    <Link href={"/public"}
          className={
            cn(
              "flex gap-2 items-center box-border border-b border-transparent w-min hover:border-b hover:border-red-600",
              {
                "text-xl": size === "regular",
                "text-4xl": size === "large",
              }
            )
          }
          onClick={() => redirect("/")}>
      <ChartNoAxesColumn color={"red"} size={30}/>
      <h1>Fin<span className={"text-red-600"}>Track</span></h1>
    </Link>
  )
}
