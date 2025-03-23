"use client"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import {useUser} from "@/hooks/use-user";
import Link from "next/link";
import {usePathname} from "next/navigation";
import UserInfo from "@/app/_components/user-info";
import {Bell} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import type {SessionUser} from "@/lib/types";

type Props = {
  href: string,
  title: string,
}
const NavItem = ({href, title}: Props) => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <NavigationMenuItem>
      <Link href={href} legacyBehavior passHref>
        <NavigationMenuLink
          className={`${navigationMenuTriggerStyle()} ${
            isActive(href) ? "bg-gray-300" : ""
          }`}>
          <span>{title}</span>
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  )
}

const UserContext = ({user}: { user: SessionUser }) => {
  return (
    <div className="flex items-center justify-end">
      <Button variant="ghost">
        <Bell/>
      </Button>
      <Separator orientation="vertical" className="mx-4 py-2 2xl:mr-6"/>
      <UserInfo user={user}/>
    </div>
  )
}
export const Nav = () => {
  const user = useUser()

  if (!user) return null;

  const routes = [
    {href: "/", title: "Dashboard"},
    {href: "/transactions", title: "Transactions"},
    {href: "/plan", title: "Plan"},
    {href: "/reports", title: "Reports"},
    {href: "/budget", title: "Budget and goals"},
  ]
  return (
    <>
      <div className='mx-auto flex w-full justify-center'>
        <NavigationMenu>
          <NavigationMenuList>
            {
              routes.map(({href, title}) => <NavItem key={href} href={href} title={title}/>)
            }
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      {user && <UserContext user={user}/>}
    </>
  )
}
