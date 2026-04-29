import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import Comments from "@/components/Comments";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const PostContent = async ({ id }: { id: string }) => {
  const client = await createClient();
  const { data } = await client.from("posts").select("*").eq("id", id).single();
  const { data: res } = await client.auth.getUser();

  console.log(data, res);

  if (!data) return <p>Post not found.</p>;

  return (
    <div className="">
      <div className="flex gap-4 bg-white p-4 rounded-xl">
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{data.title}</h1>
          <div className="flex gap-4">
            <span>Posted By: {res.user?.email?.split("@")[0]}</span>
            {res.user?.id == data.user_id && (
              <Link href={`/posts/edit/${data.id}`}>
                <Button variant={"secondary"}>Edit Post</Button>
              </Link>
            )}
          </div>
          <div className="flex">
            <p className="whitespace-pre-wrap">{data.content}</p>
          </div>
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
      <div className="bg-white p-4 rounded-xl my-4">
        <h2 className="m-0 mb-4 text-center">Comments</h2>
        <Comments post_id={data.id} />
      </div>
    </div>
  );
};

export default PostContent;
