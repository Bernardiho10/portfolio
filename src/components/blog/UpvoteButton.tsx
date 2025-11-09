"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { toast } from "sonner";
import { usePointerInteraction } from "@/components/magicui/pointer";

interface UpvoteButtonProps {
  articleSlug: string;
  initialCount: number;
  initialHasUpvoted: boolean;
}

export function UpvoteButton({
  articleSlug,
  initialCount,
  initialHasUpvoted,
}: UpvoteButtonProps) {
  const [upvoteCount, setUpvoteCount] = useState(initialCount);
  const [hasUpvoted, setHasUpvoted] = useState(initialHasUpvoted);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const pointerInteraction = usePointerInteraction();

  // Fetch user's upvote status on mount
  useEffect(() => {
    if (session?.user) {
      fetch(`/api/articles/${articleSlug}/upvote`)
        .then((res) => res.json())
        .then((data) => {
          if (data.hasUpvoted !== undefined) {
            setHasUpvoted(data.hasUpvoted);
          }
        })
        .catch(console.error);
    }
  }, [session, articleSlug]);

  const handleUpvote = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/articles/${articleSlug}/upvote`, {
        method: "POST",
      });

      if (response.status === 401) {
        toast.error("Please sign in to upvote");
        signIn();
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to toggle upvote");
      }

      const data = await response.json();
      setHasUpvoted(data.upvoted);
      setUpvoteCount((prev) => (data.upvoted ? prev + 1 : prev - 1));
      router.refresh();
    } catch (error) {
      console.error("Error toggling upvote:", error);
      toast.error("Failed to upvote. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...pointerInteraction}
    >
      <Button
        variant="outline"
        size="lg"
        onClick={handleUpvote}
        disabled={isLoading}
        className="gap-2 cursor-none"
        aria-label={hasUpvoted ? "Remove upvote" : "Upvote this article"}
        aria-pressed={hasUpvoted}
      >
        <motion.div
          animate={{
            scale: hasUpvoted ? [1, 1.3, 1] : 1,
          }}
          transition={{ duration: 0.3 }}
          aria-hidden="true"
        >
          <Heart
            className={`w-5 h-5 ${hasUpvoted ? "fill-red-500 text-red-500" : ""}`}
          />
        </motion.div>
        <span aria-live="polite">{upvoteCount}</span>
      </Button>
    </motion.div>
  );
}

