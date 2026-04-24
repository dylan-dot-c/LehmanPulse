import { createClient } from "@/lib/supabase/client";

const client = createClient();
const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const { data } = await client.from("posts").select("*").eq("id", id).single();

  return (
    <div>
      <h1>{data?.title}</h1>

      <p className="w whitespace-pre-wrap">{data?.content}</p>
    </div>
  );
};

export default Page;
