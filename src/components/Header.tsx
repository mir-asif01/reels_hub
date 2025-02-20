"use client";

import { signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Mountain, User2 } from "lucide-react";
import Button from "@/components/ui/button";

const Header = () => {
  const { data: session } = useSession();

  const handleLogOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.log(error);
    }
  };

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300${
        isScrolled
          ? "bg-white/80 backdrop-blur-md dark:bg-gray-900/80 shadow-sm border-b border-opacity-55 "
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Mountain className="w-6 h-6" />
            <span className="font-bold text-xl">SnapShare</span>
          </Link>

          <nav className="flex items-center space-x-4">
            {session?.user ? (
              <div className="cursor-pointer flex justify-between items-center gap-10">
                <button>
                  <Link href={"/images"}>Explore</Link>
                </button>
                <button>
                  <Link href={"/upload"}>Upload</Link>
                </button>
                <Button onClick={handleLogOut}>Log Out</Button>
                <Link
                  href={"/dashboard"}
                  className="bg-gray-100 p-2 rounded-full"
                >
                  <User2 />
                </Link>
              </div>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Register</Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
