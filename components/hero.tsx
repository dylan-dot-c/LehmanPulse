import Link from "next/link";

import { Button } from "./ui/button";
import { ArrowRight, Stars } from "lucide-react";

export function Hero() {
  return (
    <div className="flex flex-col items-center">
      <span className="bg-blue-200 text-green-700 text-sm font-semibold px-3 py-2 rounded-full flex gap-3 items-center ">
        <Stars size={16} />{" "}
        <span>
          Join the <b>100+</b> students already striving
        </span>
      </span>

      <h1 className="font-playfair mt-4 text-center">
        The Heart of <span className="italic text-green-600">Campus Life</span>
      </h1>

      <p className="text-center max-w-2xl text-md text-green-800 mt-2">
        A dedicated space for the spirited intellect. Connect with peers, share
        groundbreaking research, discover club events, and grow your academic
        network all in one vibrant community.
      </p>

      <div className="flex justify-center gap-4">
        <Link href="/posts">
          <Button className="bg-green-800 hover:bg-green-600 p-6" size={"lg"}>
            Explore Posts <ArrowRight />
          </Button>
        </Link>
        <Link href="/posts/new">
          <Button
            size={"lg"}
            variant={"outline"}
            className="sborder border-green-800 bg-white text-green-800 p-6"
          >
            Login
          </Button>
        </Link>
      </div>
    </div>
  );
}
