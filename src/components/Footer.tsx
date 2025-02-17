"use client";
import { Facebook, Instagram, Mountain, Twitter, Youtube } from "lucide-react";
import Link from "next/link";
import Button from "./ui/button";
import { Input } from "./ui/input";

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Mountain className="w-6 h-6" />
              <span className="font-bold text-xl">Reels Hub</span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Share your moments in a snap. Fast, easy, and fun.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {["Home", "Features", "Pricing", "About", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              Follow Us
            </h3>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
                <Link
                  key={index}
                  href="#"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              Stay Updated
            </h3>
            <form className="flex flex-col space-y-2">
              <Input type="email" placeholder="Enter your email" />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Reels Hub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
