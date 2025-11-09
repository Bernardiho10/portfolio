"use client";

import { useState, useEffect, useCallback } from "react";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import dynamic from "next/dynamic";

// Dynamically import drawer to prevent SSR evaluation
// We'll use a wrapper component that loads the drawer
const DynamicDrawer = dynamic(
  () => import("@/components/ui/drawer").then((mod) => mod.Drawer),
  { ssr: false }
);

const DynamicDrawerContent = dynamic(
  () => import("@/components/ui/drawer").then((mod) => mod.DrawerContent),
  { ssr: false }
);

const DynamicDrawerHeader = dynamic(
  () => import("@/components/ui/drawer").then((mod) => mod.DrawerHeader),
  { ssr: false }
);

const DynamicDrawerTitle = dynamic(
  () => import("@/components/ui/drawer").then((mod) => mod.DrawerTitle),
  { ssr: false }
);

const DynamicDrawerTrigger = dynamic(
  () => import("@/components/ui/drawer").then((mod) => mod.DrawerTrigger),
  { ssr: false }
);

// TweakCN integration component
export function ThemeCustomizer() {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [themeData, setThemeData] = useState({
    colors: {
      primary: "#3b82f6",
      secondary: "#10b981",
    },
    fonts: {
      heading: "Inter",
      body: "Inter",
    },
    spacing: {
      base: "1rem",
    },
  });
  const { data: session } = useSession();

  // Only render on client to avoid SSR issues with vaul
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const applyTheme = useCallback((data: typeof themeData) => {
    // Apply CSS variables
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      if (data.colors) {
        root.style.setProperty("--theme-primary", data.colors.primary);
        root.style.setProperty("--theme-secondary", data.colors.secondary);
      }
    }
  }, []);

  useEffect(() => {
    // Load saved theme if user is signed in
    if (session?.user) {
      fetch("/api/themes")
        .then((res) => res.json())
        .then((data) => {
          if (data.theme) {
            setThemeData(data.theme.themeData);
            applyTheme(data.theme.themeData);
          }
        })
        .catch(console.error);
    }
  }, [session, applyTheme]);

  const handleSave = async () => {
    if (!session?.user) {
      toast.error("Please sign in to save your theme");
      return;
    }

    try {
      const response = await fetch("/api/themes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ themeData }),
      });

      if (!response.ok) {
        throw new Error("Failed to save theme");
      }

      applyTheme(themeData);
      toast.success("Theme saved successfully!");
    } catch (error) {
      console.error("Error saving theme:", error);
      toast.error("Failed to save theme");
    }
  };

  const handleExport = () => {
    const css = `
:root {
  --theme-primary: ${themeData.colors.primary};
  --theme-secondary: ${themeData.colors.secondary};
  --theme-heading-font: ${themeData.fonts.heading};
  --theme-body-font: ${themeData.fonts.body};
  --theme-spacing-base: ${themeData.spacing.base};
}
    `.trim();

    const blob = new Blob([css], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "theme.css";
    a.click();
    URL.revokeObjectURL(url);

    toast.success("Theme exported as CSS!");
  };

  // Don't render on server
  if (!isMounted) {
    return null;
  }

  return (
    <DynamicDrawer open={isOpen} onOpenChange={setIsOpen}>
      <DynamicDrawerTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-4 right-4 z-40 rounded-full"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </DynamicDrawerTrigger>
      <DynamicDrawerContent>
        <DynamicDrawerHeader>
          <DynamicDrawerTitle>Customize Blog Theme</DynamicDrawerTitle>
        </DynamicDrawerHeader>
        <div className="p-6 space-y-6">
          <div>
            <label className="text-sm font-medium mb-2 block">Primary Color</label>
            <input
              type="color"
              value={themeData.colors.primary}
              onChange={(e) =>
                setThemeData({
                  ...themeData,
                  colors: { ...themeData.colors, primary: e.target.value },
                })
              }
              className="w-full h-10 rounded"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Secondary Color</label>
            <input
              type="color"
              value={themeData.colors.secondary}
              onChange={(e) =>
                setThemeData({
                  ...themeData,
                  colors: { ...themeData.colors, secondary: e.target.value },
                })
              }
              className="w-full h-10 rounded"
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave} disabled={!session?.user}>
              Save Theme
            </Button>
            <Button onClick={handleExport} variant="outline">
              Export CSS
            </Button>
            <Button
              onClick={() => {
                applyTheme(themeData);
                toast.info("Theme applied (not saved)");
              }}
              variant="outline"
            >
              Apply
            </Button>
          </div>
          {!session?.user && (
            <p className="text-sm text-muted-foreground">
              Sign in to save your theme preferences
            </p>
          )}
        </div>
      </DynamicDrawerContent>
    </DynamicDrawer>
  );
}

