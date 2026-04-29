import Link from "next/link";

import { Button } from "./ui/button";
import { Stars } from "lucide-react";

export function Hero() {
  return (
    <div>
      <span className="bg-green-200 text-green-800 font-semibold px-3 py-2 rounded-full flex gap-3 ">
        <Stars /> <span>Join the 100+ students already striving</span>
      </span>

      <h1 className="font-playfair mt-4 text-center">
        The Heart of <span className="italic text-green-400">Campus Life</span>
      </h1>

      <p className="text-center max-w-2xl text-xl text-green-800 mt-2">
        A dedicated space for the spirited intellect. Connect with peers, share
        groundbreaking research, discover club events, and grow your academic
        network all in one vibrant community.
      </p>

      <div className="flex justify-center gap-4">
        <Link href="/posts">
          <Button className="bg-green-800">View Posts</Button>
        </Link>
        <Link href="/posts/new">
          <Button variant={"outline"} className="bg-green-300">
            Create A Post
          </Button>
        </Link>
      </div>
    </div>
  );
}
