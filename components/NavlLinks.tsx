"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { ChartPie, CircleUserRound, HelpCircle, LayoutDashboard, Loader, Rss, User2, User2Icon } from "lucide-react";

import { User } from "next-auth";
import SignOutButton from "./SignOutButton";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export const NavlLinks = ({ user }: { user: User }) => {
    const session = useSession();
    // console.log(session);

    switch (session.status) {
        case "unauthenticated":
            return <SignedOut />;
        case "authenticated":
            return <SignedIn user={user} />;
        case "loading":
            return <Loading />;
        default:
            null;
    }
    return <p>Hello</p>;
};

const Loading = () => {
    return (
        <p className="text-4md font-bold">
            <Loader className="animate-spin" />
        </p>
    );
};

export const SignedIn = ({ user }: { user: User }) => {
    return (
        <div className="mt-10 flex h-[80%] w-full flex-col gap-8 md:mt-0 md:h-full md:flex-row">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <Link
                    href={"/explore"}
                    className="flex items-center gap-2 border-b pb-0 md:border-b-0 md:pb-0 md:hover:underline"
                >
                    Explore
                </Link>
                <Link
                    href={"/save"}
                    className="flex items-center gap-2 border-b pb-0 md:border-b-0 md:pb-0 md:hover:underline"
                >
                    Save
                </Link>
                <Link
                    href={"/about"}
                    className="flex items-center gap-2 border-b pb-0 md:border-b-0 md:pb-0 md:hover:underline"
                >
                    About
                </Link>
            </div>
            <Popover>
                <PopoverTrigger className="hidden md:block">
                    <Button variant={"secondary"} className="text-base capitalize">
                        {/* <span className="bg-muted-foreground text-white flex items-center justify-center size-8 md:size-8 rounded-full"> */}
                        <CircleUserRound className="mr-2" strokeWidth={1.5} />
                        {user?.name ?? <CircleUserRound />}
                    </Button>
                    {/* </span> */}
                </PopoverTrigger>
                <PopoverContent className="mr-10 p-0">
                    <div className="flex items-center gap-4 p-4 border-b-2">
                        <span className="bg-primary text-white flex items-center justify-center size-12 rounded-full">
                            {user?.name?.[0] ?? <User2Icon />}
                        </span>
                        <div className="">
                            <p className="text-lg capitalize font-semibold">{user?.name}</p>
                            <p className="text-muted-foreground text-sm">{user?.email}</p>
                        </div>
                    </div>
                    <div className="p-4 flex flex-col gap-4">

                        <Button variant="ghost" className="w-full justify-start" asChild>
                            <Link href={"/overview/profile"}>
                                <User2 className="mr-2 h-5 w-5" />
                                Your Profile
                            </Link>
                        </Button>
                        <Button variant="ghost" className="w-full justify-start" asChild>
                            <Link href={"/"}>
                                <HelpCircle className="mr-2 h-5 w-5" />
                                Help & Support
                            </Link>
                        </Button>
                        <SignOutButton />
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export const SignedOut = () => {
    return (
        <div className="mt-10 flex w-full flex-col-reverse gap-10 md:mt-0 md:flex-row">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <Link
                    href={"/explore"}
                    className="flex items-center gap-2 border-b pb-0 md:border-b-0 md:pb-0 md:hover:underline"
                >
                    Explore
                </Link>
                <Link
                    href={"/save"}
                    className="flex items-center gap-2 border-b pb-0 md:border-b-0 md:pb-0 md:hover:underline"
                >
                    Save
                </Link>
                <Link
                    href={"/about"}
                    className="flex items-center gap-2 border-b pb-0 md:border-b-0 md:pb-0 md:hover:underline"
                >
                    About
                </Link>
            </div>
            <ul className="flex flex-col-reverse gap-x-4 gap-y-4 md:flex-row md:items-center">
                <li>
                    <Button
                        variant={"outline"}
                        size={"sm"}
                        className="w-full bg-muted md:w-fit"
                        asChild
                    >
                        <Link href="/auth/sign-in">Log In</Link>
                    </Button>
                </li>
                <li>
                    <Button size={"sm"} className="w-full md:w-fit" asChild>
                        <Link href="/auth/sign-up">Create an Account</Link>
                    </Button>
                </li>
            </ul>
        </div>
    );
};
