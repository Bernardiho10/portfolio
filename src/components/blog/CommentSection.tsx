"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { Reply } from "lucide-react";
import { usePointerInteraction } from "@/components/magicui/pointer";

interface Comment {
  id: number;
  body: string;
  createdAt: string;
  updatedAt: string;
  parentId: number | null;
  user: {
    id: string;
    name: string | null;
    image: string | null;
    email: string | null;
  };
  replies?: Comment[];
}

interface CommentSectionProps {
  articleSlug: string;
  initialComments: Comment[];
}

export function CommentSection({
  articleSlug,
  initialComments,
}: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const pointerInteraction = usePointerInteraction();

  const handleSubmitComment = async (parentId?: number) => {
    const commentText = parentId ? replyText : newComment;
    if (!commentText.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/articles/${articleSlug}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          commentBody: commentText,
          parentId: parentId || null,
        }),
      });

      if (response.status === 401) {
        toast.error("Please sign in to comment");
        signIn();
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to post comment");
      }

      const data = await response.json();
      
      if (parentId) {
        // Add reply to parent comment
        setComments((prev) =>
          prev.map((comment) =>
            comment.id === parentId
              ? { ...comment, replies: [...(comment.replies || []), data.comment] }
              : comment
          )
        );
        setReplyText("");
        setReplyingTo(null);
      } else {
        // Add new top-level comment
        setComments((prev) => [data.comment, ...prev]);
        setNewComment("");
      }

      toast.success("Comment posted successfully!");
    } catch (error) {
      console.error("Error posting comment:", error);
      toast.error("Failed to post comment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const CommentItem = ({ comment, depth = 0 }: { comment: Comment; depth?: number }) => {
    const [showReply, setShowReply] = useState(false);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${depth > 0 ? "ml-8 mt-4" : ""}`}
      >
        <div className="flex gap-4">
          <Avatar>
            <AvatarImage src={comment.user.image || undefined} />
            <AvatarFallback>
              {comment.user.name?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold">
                {comment.user.name || comment.user.email}
              </span>
              <span className="text-sm text-muted-foreground">
                {format(new Date(comment.createdAt), "MMM d, yyyy 'at' h:mm a")}
              </span>
            </div>
            <p className="text-sm mb-2 whitespace-pre-wrap">{comment.body}</p>
            {depth < 2 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowReply(!showReply)}
                className="h-8 px-2 cursor-none"
                {...pointerInteraction}
              >
                <Reply className="w-4 h-4 mr-1" />
                Reply
              </Button>
            )}
            {showReply && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2"
              >
                <Textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write a reply..."
                  className="mb-2"
                />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleSubmitComment(comment.id)}
                    disabled={isLoading || !replyText.trim()}
                  >
                    Post Reply
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setShowReply(false);
                      setReplyText("");
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </motion.div>
            )}
            {comment.replies && comment.replies.length > 0 && (
              <div className="mt-4">
                {comment.replies.map((reply) => (
                  <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-6">Comments</h2>
      <div className="mb-6">
        <label htmlFor="comment-input" className="sr-only">
          Write a comment
        </label>
        <Textarea
          id="comment-input"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="mb-2 min-h-[100px]"
          aria-label="Comment input"
        />
        <Button
          onClick={() => handleSubmitComment()}
          disabled={isLoading || !newComment.trim()}
          aria-label="Submit comment"
        >
          Post Comment
        </Button>
      </div>
      <div className="space-y-6">
        <AnimatePresence>
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </AnimatePresence>
        {comments.length === 0 && (
          <p className="text-muted-foreground text-center py-8">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  );
}

