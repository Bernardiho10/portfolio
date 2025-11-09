"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function SeedButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [isMigrating, setIsMigrating] = useState(false);

  const handleMigrate = async () => {
    setIsMigrating(true);
    try {
      const response = await fetch("/api/migrate", {
        method: "POST",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || error.details || "Failed to run migration");
      }

      const data = await response.json();
      toast.success(data.message || "Migration completed successfully!");
      setIsMigrating(false);
      
      // After migration, try to seed (skip migration check since we just ran it)
      setTimeout(() => {
        handleSeed(true);
      }, 500);
    } catch (error: any) {
      console.error("Error running migration:", error);
      toast.error(error.message || "Failed to run migration");
      setIsMigrating(false);
    }
  };

  const handleSeed = async (skipMigrationCheck = false) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/seed", {
        method: "POST",
      });

      const data = await response.json();
      
      // Check if migration is needed (even if response is 200, it might have needsMigration flag)
      if (data.needsMigration && !skipMigrationCheck) {
        toast.info("Database tables do not exist. Running migration first...");
        setIsLoading(false);
        await handleMigrate();
        return;
      }

      if (!response.ok) {
        throw new Error(data.error || data.details || "Failed to seed database");
      }

      // Success case
      if (data.message) {
        toast.success(data.message || "Database seeded successfully!");
      } else {
        toast.success("Database seeded successfully!");
      }
      
      // Reload the page after a short delay
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error: any) {
      console.error("Error seeding database:", error);
      toast.error(error.message || "Failed to seed database");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 items-center">
      <Button
        onClick={() => handleSeed()}
        disabled={isLoading || isMigrating}
        className="mt-4"
      >
        {isMigrating
          ? "Running Migration..."
          : isLoading
          ? "Seeding..."
          : "Seed Database"}
      </Button>
      <p className="text-xs text-muted-foreground">
        This will create tables if needed and seed 8 articles
      </p>
    </div>
  );
}

