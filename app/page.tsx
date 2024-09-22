"use client";

import { useState } from "react";
import Nav from "@/components/nav";
import HeroSection from "@/components/hero";
import LogoGeneratorForm from "@/components/logoform";
import ExportButtons from "@/components/export-buttons";
import Footer from "@/components/footer";

export default function Home() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleExport = (format: "PNG" | "SVG") => {
    console.log(`Exporting logo as ${format}`);
    if (!imageUrl) return;

    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `generated_logo.${format.toLowerCase()}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImageGenerated = (imageUrl: string) => {
    setImageUrl(imageUrl);
  };

  return (
    <div className="relative h-full w-full bg-background">
      <div
        className="absolute bottom-0 left-0 right-0 top-0
          bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)]
          bg-[size:14px_24px]"
      ></div>
      <div className="relative z-10 min-h-screen text-foreground">
        <Nav />
        <main className="max-w-[110rem] mx-auto px-4 py-8 md:py-16">
          <HeroSection />
          <LogoGeneratorForm onImageGenerated={handleImageGenerated} />
          {imageUrl && (
            <ExportButtons imageUrl={imageUrl} handleExport={handleExport} />
          )}
        </main>
        <Footer />
      </div>
    </div>
  );
}
