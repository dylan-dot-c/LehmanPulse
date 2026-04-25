import { use, Suspense } from "react";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";

// Async component — awaiting is fine here inside Suspense
const PostContent = async ({ id }: { id: string }) => {
  const client = createClient();
  const { data } = await client.from("posts").select("*").eq("id", id).single();

  if (!data) return <p>Post not found.</p>;

  return (
    <div className="flex gap-4">
      <div className="flex-1">
        <h1 className="text-2xl font-bold">{data.title}</h1>
        <p className="whitespace-pre-wrap">{data.content}</p>
      </div>
      {data.img_url && (
        <div className="relative w-48 h-48 shrink-0">
          <Image
            src={data.img_url}
            alt={data.title ?? "Post image"}
            fill
            className="object-cover rounded"
          />
        </div>
      )}
    </div>
  );
};

// Fallback shown while PostContent is loading
const PostSkeleton = () => (
  <div className="flex gap-4 animate-pulse">
    <div className="flex-1 space-y-3">
      <div className="h-8 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-full" />
      <div className="h-4 bg-gray-200 rounded w-5/6" />
    </div>
    <div className="w-48 h-48 bg-gray-200 rounded shrink-0" />
  </div>
);

// Page stays sync — use React.use() to unwrap the params Promise
const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params); // ✅ unwraps Promise without await

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Suspense fallback={<PostSkeleton />}>
        <PostContent id={id} />
      </Suspense>
    </div>
  );
};

export default Page;
