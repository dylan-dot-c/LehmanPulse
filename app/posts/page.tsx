import { Suspense } from "react";
import Posts from "@/components/Posts";

const Page = async () => {
  // .order("created_at", { ascending: false });

  return (
    <Suspense fallback={<div>Loading</div>}>
      <div>
        <Posts />
      </div>
    </Suspense>
  );
};

export default Page;
