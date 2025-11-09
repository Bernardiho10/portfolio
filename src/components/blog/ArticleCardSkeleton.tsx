import { Card, CardContent } from "@/components/ui/card";

export function ArticleCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="w-full h-48 bg-muted animate-pulse" />
      <CardContent className="p-6">
        <div className="h-4 bg-muted rounded w-32 mb-4 animate-pulse" />
        <div className="h-6 bg-muted rounded w-full mb-2 animate-pulse" />
        <div className="h-6 bg-muted rounded w-3/4 mb-4 animate-pulse" />
        <div className="h-4 bg-muted rounded w-full mb-2 animate-pulse" />
        <div className="h-4 bg-muted rounded w-2/3 mb-4 animate-pulse" />
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <div className="h-6 bg-muted rounded w-16 animate-pulse" />
            <div className="h-6 bg-muted rounded w-20 animate-pulse" />
          </div>
          <div className="h-4 bg-muted rounded w-12 animate-pulse" />
        </div>
      </CardContent>
    </Card>
  );
}

