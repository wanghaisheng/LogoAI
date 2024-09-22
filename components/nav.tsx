"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="container mx-auto flex justify-between items-center p-4 md:p-6">
      <div className="text-xl md:text-2xl font-bold bg-gradient text-transparent !bg-clip-text">
        <span>LogoAI</span>
      </div>
      <div className="md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>
      <div
        className={`${isMenuOpen ? "flex" : "hidden"} md:flex flex-col md:flex-row items-center
          space-y-4 md:space-y-0 md:space-x-6 absolute md:relative top-16 md:top-0 left-0
          right-0 bg-popover md:bg-transparent p-4 md:p-0`}
      >
        <a href="#" className="hover:text-primary">
          About
        </a>
        <a href="#" className="hover:text-primary">
          Pricing
        </a>
        <a href="#" className="hover:text-primary">
          Blog
        </a>
        {isMenuOpen && (
          <Button
            variant="outline"
            className="w-full md:hidden md:w-auto rounded-full border-primary"
          >
            Log in
          </Button>
        )}
      </div>
      <Button
        variant="outline"
        className="hidden md:flex w-full md:w-auto rounded-full border-primary"
      >
        Log in
      </Button>
    </nav>
  );
}
