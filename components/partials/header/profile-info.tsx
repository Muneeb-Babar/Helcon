"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@/components/ui/icon";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import React from "react";

const ProfileInfo = () => {
  // ✅ Replace session with local user data (optional: fetch from localStorage or props)
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    image: "/default-avatar.png", // use a placeholder or public user image
  };

  return (
    <div className="md:block hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <div className="flex items-center gap-3 text-default-800">
            {/* <Image
              src={user.image}
              alt={user.name?.charAt(0) || "U"}
              width={36}
              height={36}
              className="rounded-full"
            /> */}
            <div className="text-sm font-medium capitalize lg:block hidden">
              {user.name}
            </div>
            <span className="text-base me-2.5 lg:inline-block hidden">
              <Icon icon="heroicons-outline:chevron-down" />
            </span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 p-0" align="end">
          <DropdownMenuLabel className="flex gap-2 items-center mb-1 p-3">
            <Image
              src={user.image}
              alt={user.name?.charAt(0) || "U"}
              width={36}
              height={36}
              className="rounded-full"
            />
            <div>
              <div className="text-sm font-medium text-default-800 capitalize">
                {user.name}
              </div>
              <Link
                href="/dashboard"
                className="text-xs text-default-600 hover:text-primary"
              >
                {user.email}
              </Link>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuGroup>
            {[
              { name: "Profile", icon: "heroicons:user", href: "/user-profile" },
              { name: "Settings", icon: "heroicons:paper-airplane", href: "/dashboard" },
            ].map((item, index) => (
              <Link href={item.href} key={`info-menu-${index}`} className="cursor-pointer">
                <DropdownMenuItem className="flex items-center gap-2 text-sm font-medium text-default-600 capitalize px-3 py-1.5 cursor-pointer">
                  <Icon icon={item.icon} className="w-4 h-4" />
                  {item.name}
                </DropdownMenuItem>
              </Link>
            ))}
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="flex items-center gap-2 text-sm font-medium text-default-600 capitalize px-3 py-1.5">
                <Icon icon="heroicons:user-plus" className="w-4 h-4" />
                Invite user
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {["email", "message", "facebook"].map((item, index) => (
                    <Link href="/dashboard" key={`invite-${index}`} className="cursor-pointer">
                      <DropdownMenuItem className="text-sm font-medium text-default-600 capitalize px-3 py-1.5 cursor-pointer">
                        {item}
                      </DropdownMenuItem>
                    </Link>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>

            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="flex items-center gap-2 text-sm font-medium text-default-600 capitalize px-3 py-1.5 cursor-pointer">
                <Icon icon="heroicons:phone" className="w-4 h-4" />
                Support
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {["slack", "whatsapp"].map((item, index) => (
                    <Link href="/dashboard" key={`support-${index}`}>
                      <DropdownMenuItem className="text-sm font-medium text-default-600 capitalize px-3 py-1.5 cursor-pointer">
                        {item}
                      </DropdownMenuItem>
                    </Link>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>

          <DropdownMenuSeparator className="mb-0 dark:bg-background" />

          <DropdownMenuItem className="flex items-center gap-2 text-sm font-medium text-default-600 capitalize my-1 px-3 cursor-pointer">
            <div className="w-full flex items-center gap-2">
              <Icon icon="heroicons:power" className="w-4 h-4" />
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/login";
                }}
                className="w-full text-left"
              >
                Log out
              </button>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfileInfo;
