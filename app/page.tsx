import { Hero } from "@/components/hero";
import { ThemeSwitcher } from "@/components/theme-switcher";

import Link from "next/link";
// import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import { AuthButton } from "@/components/auth-button";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <nav className="w-full flex items-center justify-between border-b border-b-foreground/10 h-20 max-w-7xl">
          <h1 className="text-blue-500 italic font-serif">LehmanPulse</h1>
          <div className="links flex items-center gap-4">
            <Link href={"/"} className="">
              Home
            </Link>
            <Link href={"/posts"}>All Posts</Link>
            <Link href={"/posts/new"}>Create A Post</Link>
          </div>
          <div className="flex gap-2">
            <Suspense fallback={<p>Signup</p>}>
              <AuthButton />
            </Suspense>
            {/* <Button variant={"default"}>
              <Link href={"/auth/login"}>Login</Link>
            </Button>
            <Button variant={"outline"}>
              <Link href={"auth/sign-up"}>Signup</Link>
            </Button> */}
          </div>
        </nav>
        <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5">
          <Hero />
        </div>

        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
          <p>
            Powered by{" "}
            <a
              href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
              target="_blank"
              className="font-bold hover:underline"
              rel="noreferrer"
            >
              Supabase
            </a>
          </p>
          <ThemeSwitcher />
        </footer>
      </div>
    </main>
  );
}
