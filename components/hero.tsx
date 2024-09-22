"use client";

import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="text-center mb-12 lg:mb-24">
      <Button
        variant="outline"
        size="sm"
        className="mb-6 rounded-full border-primary text-primary"
      >
        Made by Daniel Cruz
      </Button>
      <h1
        className="text-5xl md:text-7xl font-bold mb-2 md:mb-6 bg-gradient text-transparent
          !bg-clip-text pb-2"
      >
        Create Beautiful
        <br />
        Logos with AI
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto">
        Create stunning logos in real-time with your team. AI-powered logo
        generation has never been this fun and easy.
      </p>
      <Button size="lg" className="w-fit md:w-auto rounded-full">
        <Github className="mr-2 h-5 w-5" /> Continue with Github
      </Button>
    </section>
  );
}
