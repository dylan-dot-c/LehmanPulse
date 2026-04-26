import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ArrowBigDown, ArrowBigUp, ArrowRight } from "lucide-react";

import type { Post } from "./Posts";
import { Button } from "./ui/button";
import Link from "next/link";

export function timeAgo(date: Date) {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
    }
  }
  return "just now";
}

type props = {
  post: Post;
};

const PostCard = ({ post }: props) => {
  return (
    <Card className="w-52 w-xs">
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <CardDescription className="truncate">
          {post.post_type} ▪ {timeAgo(new Date(post.created_at))}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className=" line-clamp-2">{post.content}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="bg-yellow-200 rounded-xl p-2 flex gap-1">
          <ArrowBigUp />
          {post.upvotes}
          <ArrowBigDown />
        </div>
        <Button variant={"link"} className="p-0 block">
          <Link href={`/posts/${post.id}`} className="flex items-center gap-1">
            View Post <ArrowRight />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
