import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { generateLogo } from "@/actions/logogen";
import { Loader2 } from "lucide-react";

export default function LogoGeneratorForm({
  onImageGenerated,
}: {
  onImageGenerated: (imageUrl: string) => void;
}) {
  const [prompt, setPrompt] = useState("");
  const [context, setContext] = useState("default");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");

  const handleGenerate = async () => {
    setErrorMessage("");
    setIsLoading(true);
    try {
      const response = await generateLogo(prompt, name);
      if (response.status === 200) {
        const newImageUrl = `data:image/png;base64,${response.image}`;
        setImageUrl(newImageUrl);
        onImageGenerated(newImageUrl);
      } else {
        setErrorMessage(`Error generating logo: ${response.error}`);
        console.error("Detailed error:", response.error);
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred");
      console.error("Error generating logo:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderPreview = () => {
    if (imageUrl) {
      return (
        <div style={getPreviewStyle()}>
          <Image
            src={imageUrl}
            alt="Generated Logo"
            className="w-full h-full object-contain"
          />
        </div>
      );
    }
    return (
      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
        Your logo preview will appear here
      </div>
    );
  };

  const getPreviewStyle = () => {
    switch (context) {
      case "businessCard":
        return {
          maxWidth: "350px",
          padding: "20px",
          backgroundColor: "#fff",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        };
      case "socialMedia":
        return {
          maxWidth: "300px",
          borderRadius: "50%",
          overflow: "hidden",
        };
      default:
        return {};
    }
  };

  return (
    <div className="bg-background p-4 md:p-6 rounded-lg shadow-lg mb-12 border-2 border-border">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col gap-4">
          <div>
            <Label htmlFor="prompt">Logo Prompt</Label>
            <Input
              id="prompt"
              placeholder="Describe your logo idea..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <p className="text-sm text-muted-foreground mt-1">
              Tip: Include specific details about style, colors, and symbolism
              for better results.
            </p>
          </div>
          <div>
            <Label htmlFor="name">Name for Logo</Label>
            <Input
              id="name"
              placeholder="Enter name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <Button
            onClick={handleGenerate}
            className="w-full mt-4"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Logo"
            )}
          </Button>
          {errorMessage && (
            <div className="mt-2 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
              <p className="font-bold">Error:</p>
              <p>{errorMessage}</p>
            </div>
          )}
        </div>
        <div className="space-y-4">
          <div>
            <Label htmlFor="context">Preview Context</Label>
            <Select value={context} onValueChange={setContext}>
              <SelectTrigger id="context">
                <SelectValue placeholder="Select preview context" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="businessCard">Business Card</SelectItem>
                <SelectItem value="socialMedia">Social Media</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div
            className="bg-card/45 border-2 border-border rounded-lg p-4 flex items-center
              justify-center aspect-video"
          >
            {isLoading ? (
              <div className="col-span-2 flex flex-col items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="mt-2 text-sm text-muted-foreground">
                  Generating logo...
                </p>
              </div>
            ) : (
              renderPreview()
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
