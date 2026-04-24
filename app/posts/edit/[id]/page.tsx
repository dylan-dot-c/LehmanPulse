"use client";

import { SubmitEvent, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createClient } from "@/lib/supabase/client";
import { nanoid } from "nanoid";
import { Button } from "@/components/ui/button";
// import { useState } from "react";
const client = createClient();

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const [postName, setPostName] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postType, setPostType] = useState("");
  const [postImg, setPostImg] = useState("");
  const [postID, setPostID] = useState("");

  const getCurrentPost = async (id: string) => {
    const { data, error } = await client
      .from("posts")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      alert("Page not found");
    }

    if (data) {
      setPostContent(data.content!);
      setPostImg(data.img_url!);
      setPostName(data.title!);
      setPostType(data.post_type!);
    }
  };

  const submitForm = async (e: SubmitEvent) => {
    e.preventDefault();
    // think about using getClaims
    const {
      data: { user },
      error: err,
    } = await client.auth.getUser();

    if (err) {
      alert("You are not signed in so leave");
    }

    const { data, error } = await client.from("posts").insert({
      id: nanoid(10),
      title: postName,
      content: postContent,
      post_type: postType,
      img_url: postImg,
      user_id: user?.id,
    });

    console.log(data, error);
    if (!error) {
      alert("Post Created");
      navigation.navigate("/posts");
    }

    console.log(postName, postContent, postType, postImg);
  };

  const deletePost = async (post_id: string) => {
    const { data } = await client.from("posts").delete().eq("id", post_id);

    if (data) {
      alert("Well done");
      navigation.navigate("/posts");
    }
  };

  useEffect(() => {
    const load = async () => {
      const post_id = await params;

      getCurrentPost(post_id.id);
      setPostID(post_id.id);
    };

    load();
  });
  return (
    <div className="p-4">
      <h1 className="text-center text-4xl font-bold">Edit Post</h1>
      <Button onClick={() => deletePost(postID)}>Delete Post</Button>
      <div>
        <form className="max-w-3xl m-auto" onSubmit={(e) => submitForm(e)}>
          <FieldGroup>
            <Field>
              <FieldLabel>Title</FieldLabel>
              <Input
                type="text"
                id="title"
                placeholder="Name of your post"
                value={postName}
                onChange={(e) => setPostName(e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel>Content</FieldLabel>
              <Textarea
                id="title"
                placeholder="Post content"
                rows={10}
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
              />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel>Img Upload</FieldLabel>
                <Input type="file" id="img" accept="image/*" />
                <FieldDescription>Allowed Types: images/*</FieldDescription>
              </Field>
              <Field>
                <FieldLabel>Post Type</FieldLabel>
                <Select
                  value={postType}
                  onValueChange={(val) => setPostType(val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Fruits</SelectLabel>
                      <SelectItem value="EVENT">Event</SelectItem>
                      <SelectItem value="nature">
                        Nature and Surroundings
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
            </div>
            <Field>
              <Input type="submit" value="Update Post" />
            </Field>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
};

export default Page;
