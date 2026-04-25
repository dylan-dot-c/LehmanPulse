"use client";

import { createClient } from "@/lib/supabase/client";
import { Database } from "@/lib/database.types";

import PostCard from "./PostCard";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export type Post = Database["public"]["Tables"]["posts"]["Row"];
const supabase = createClient();
// page to get all posts from db

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>();
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [order, setOrder] = useState("desc");
  const [upvote, setUpvotes] = useState("all");

  useEffect(() => {
    const getAllPosts = async () => {
      const { data, error } = await supabase.from("posts").select("*");

      if (data) {
        setPosts(data);
      }

      if (error) {
        alert(error.cause);
      }
    };

    getAllPosts();
  }, []);

  const filteredPosts = posts
    ?.filter((post) => post.title?.includes(search))
    ?.filter((post) =>
      type !== "all"
        ? post.post_type?.toLowerCase() === type.toLowerCase()
        : true,
    )
    ?.toSorted((a, b) => {
      // Sort by date first if desc
      if (order === "desc") {
        const dateDiff =
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        if (dateDiff !== 0) return dateDiff;
      }

      // Then sort by upvotes
      if (upvote !== "all") {
        return upvote === "most"
          ? b.upvotes - a.upvotes
          : a.upvotes - b.upvotes;
      }

      return 0;
    });

  return (
    <div>
      <h2 className="text-center">All Posts</h2>
      <div className="flex justify-center my-6 grid-cols-2 gap-4">
        <Input
          type="text"
          className="bg-white max-w-sm"
          placeholder="Search By title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex gap-4">
          <Select value={order} onValueChange={(val) => setOrder(val)}>
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Order by Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Post Type</SelectLabel>
                <SelectItem value="desc">Newest Posts</SelectItem>
                <SelectItem value="asc">Oldest Posts</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select value={type} onValueChange={(val) => setType(val)}>
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Filter By Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Post Type</SelectLabel>
                <SelectItem value="all">All Posts</SelectItem>
                <SelectItem value="EVENT">Event</SelectItem>
                <SelectItem value="NATURE">Nature and Surroundings</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select value={upvote} onValueChange={(val) => setUpvotes(val)}>
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Order by Upvotes" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Post Type</SelectLabel>
                <SelectItem value="all">All Upvotes</SelectItem>
                <SelectItem value="most">Most Upvotes</SelectItem>
                <SelectItem value="least">Least Upvotes</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {filteredPosts?.map((item) => (
          <PostCard post={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default Posts;
