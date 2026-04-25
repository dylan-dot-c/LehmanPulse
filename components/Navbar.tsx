import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-full  flex justify-between p-4 px-8 border-b-1px border-b-slate-300 bg-white items-center">
      <div className="flex gap-4">
        <Link href="/">
          <h1>CampusLife</h1>
        </Link>
      </div>
      <div className="flex gap-4">
        <Link href="/posts">Posts</Link>

        <Link href="/posts/new">New Post</Link>

        <Link href="/posts">Logout</Link>
      </div>
    </nav>
  );
};

export default Navbar;
