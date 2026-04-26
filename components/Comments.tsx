"use client";

import { createClient } from "@/lib/supabase/client";
import { Input } from "./ui/input";
import { useState, useEffect } from "react";
import { Database } from "@/lib/database.types";
import { Button } from "./ui/button";
import CommentBox from "./CommentBox";

type Params = {
  post_id: string;
};

export type Comment = Database["public"]["Tables"]["comments"]["Row"];
const supabase = createClient();

const Comments = ({ post_id }: Params) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [currentComment, setCurrentComment] = useState("");
  const [userID, setUserID] = useState("");

  useEffect(() => {
    const load = async () => {
      const user = await supabase.auth.getUser();
      const res = await supabase
        .from("comments")
        .select("*")
        .eq("post_id", post_id);

      const { data } = res;
      if (data) setComments(data);
      if (user.data.user?.id) {
        setUserID(user.data.user.id);
      }
    };

    load();
  }, [post_id]);

  const submitComment = async () => {
    const { data, error } = await supabase
      .from("comments")
      .insert({ post_id: post_id, content: currentComment, user_id: userID })
      .select()
      .single();

    if (!error) {
      alert("Comment has been saved");
      setComments((prev) => [data, ...prev]);
    }
  };
  return (
    <div>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitComment();
          }}
          className="flex gap-2 mb-4"
        >
          <Input
            type="text"
            name="comment"
            placeholder="Enter your thoughts here..."
            value={currentComment}
            onChange={(e) => setCurrentComment(e.target.value)}
          />
          <Button
            variant={"default"}
            className="bg-orange-500 text-white"
            type="submit"
          >
            Add Comment
          </Button>
        </form>
      </div>
      {comments.map((comment) => (
        <CommentBox key={comment.comment_id} comment={comment} />
      ))}
    </div>
  );
};

export default Comments;
