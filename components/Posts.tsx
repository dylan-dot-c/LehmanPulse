import { createClient } from "@/lib/supabase/client";
import { Database } from "@/lib/database.types";
import Image from "next/image";

export type Post = Database["public"]["Tables"]["posts"]["Row"];
const supabase = createClient();
// page to get all posts from db

const Posts = async () => {
  const result = await supabase.from("posts").select("*");
  // .order("created_at", { ascending: false });

  return (
    <div>
      {result.data?.map((item) => (
        <div key={item.id}>
          {item.title} {item.upvotes}
          {item.img_url && (
            <Image
              loading="lazy"
              width={300}
              height={100}
              src={item.img_url}
              alt="psot aimg"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Posts;
