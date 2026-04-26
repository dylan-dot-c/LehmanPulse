import { Suspense } from "react";
import PostContent from "./post-content";

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

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Suspense fallback={<PostSkeleton />}>
        <PostContent id={id} />
      </Suspense>
    </div>
  );
};

export default Page;
