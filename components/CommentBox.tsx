import React from "react";
import type { Comment } from "./Comments";
import { timeAgo } from "./PostCard";

type Props = {
  comment: Comment;
};
const CommentBox = ({ comment }: Props) => {
  return (
    <div>
      <span>{timeAgo(new Date(comment.created_at))}</span>
      <span>{comment.content}</span>
    </div>
  );
};

export default CommentBox;
