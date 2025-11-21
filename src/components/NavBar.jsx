"use client";

import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";

export default function NavBar() {
  const { user } = useUser();

  return (
    <nav className="bg-gray-900 text-white px-4 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-xl font-semibold tracking-wide">
          Card Games Forum
        </div>
        <ul className="flex items-center space-x-6">
          <li>
            <Link href="/" className="hover:text-gray-300 transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/posts"
              className="hover:text-gray-300 transition-colors"
            >
              Posts
            </Link>
          </li>

          <SignedIn>
            <li>
              <Link
                href={`/profile/${user?.id}`}
                className="hover:text-gray-300 transition-colors"
              >
                My Profile
              </Link>
            </li>
            <li>
              <UserButton afterSignOutUrl="/" />
            </li>
          </SignedIn>

          <SignedOut>
            <SignInButton></SignInButton>
            <SignUpButton></SignUpButton>
          </SignedOut>
        </ul>
      </div>
    </nav>
  );
}
