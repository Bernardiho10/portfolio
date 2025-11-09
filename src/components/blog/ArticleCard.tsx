"use client";

import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface ArticleCardProps {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  heroImage?: string | null;
  publishDate: Date;
  tags?: string[] | null;
  readingTime: number;
  upvoteCount: number;
  views: number;
}

export function ArticleCard({
  title,
  slug,
  excerpt,
  heroImage,
  publishDate,
  tags,
  readingTime,
  upvoteCount,
}: ArticleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
      className="w-full"
    >
      <Link href={`/blog/${slug}`} className="block">
        <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow h-full">
          {heroImage && (
            <div className="relative w-full h-48 md:h-56">
              <Image
                src={heroImage}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-wrap items-center gap-2 mb-2 text-xs md:text-sm text-muted-foreground">
              <Clock className="w-3 h-3 md:w-4 md:h-4" />
              <span>{readingTime} min read</span>
              <span>•</span>
              <span>{format(new Date(publishDate), "MMM d, yyyy")}</span>
            </div>
            <h2 className="text-lg md:text-xl font-semibold mb-2 line-clamp-2">{title}</h2>
            <p className="text-sm md:text-base text-muted-foreground mb-4 line-clamp-2">{excerpt}</p>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex flex-wrap gap-2">
                {tags?.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center gap-1 text-xs md:text-sm text-muted-foreground">
                <Heart className="w-3 h-3 md:w-4 md:h-4" />
                <span>{upvoteCount}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

