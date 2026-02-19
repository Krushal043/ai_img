"use client";

import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import Image from 'next/image'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { navLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'
import Link from 'next/link';

export default function MobileNav() {
    const pathname = usePathname();

    return (
        <header className='header'>
            <Link href="/" className="flex items-center gap-2 md:py-2">
                <Image
                    src="/assets/images/logo-text.svg"
                    alt="logo"
                    width={180}
                    height={28}
                />
            </Link>

            <nav className='flex gap-2'>
                <SignedIn>
                    <UserButton />
                    <Sheet>
                        <SheetTrigger>
                            <Image
                                src="/assets/icons/menu.svg"
                                alt="menu"
                                width={32}
                                height={32}
                                className="cursor-pointer"
                            />
                        </SheetTrigger>
                        <SheetContent className='sheet-content sm:w-64'>
                            <>
                                <VisuallyHidden.Root>
                                    <SheetTitle>Navigation Menu</SheetTitle>
                                </VisuallyHidden.Root>

                                <Link href="/" className="p-3">
                                    <Image
                                        src="/assets/images/logo-text.svg"
                                        alt="logo"
                                        width={152}
                                        height={23}
                                    />
                                </Link>

                                <ul className="header-nav_elements m-0">
                                    {navLinks.map((link) => {
                                        const isActive = link.route === pathname;
                                        return (
                                            <li
                                                className={`${isActive ? 'gradient-text' : 'text-dark-700'} flex whitespace-nowrap `}
                                                key={link.route}
                                            >
                                                <Link className="sidebar-link cursor-pointer" href={link.route}>
                                                    <Image
                                                        src={link.icon}
                                                        alt="logo"
                                                        width={24}
                                                        height={24}
                                                    />
                                                    {link.label}
                                                </Link>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </>
                        </SheetContent>
                    </Sheet>
                </SignedIn>

                <SignedOut>
                    <Button asChild className="button bg-purple-gradient bg-cover">
                        <Link href="/sign-in">Sign In</Link>
                    </Button>
                </SignedOut>
            </nav>
        </header>
    )
}
