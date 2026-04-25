import { createClient } from "@/lib/supabase/client";
import { Database } from "@/lib/database.types";

import PostCard from "./PostCard";

export type Post = Database["public"]["Tables"]["posts"]["Row"];
const supabase = createClient();
// page to get all posts from db

const Posts = async () => {
  const result = await supabase.from("posts").select("*");
  console.log(result);
  // .order("created_at", { ascending: false });

  return (
    <div className="grid grid-cols-3 gap-4">
      {result.data?.map((item) => (
        <PostCard post={item} key={item.id} />
      ))}
    </div>
  );
};

export default Posts;
