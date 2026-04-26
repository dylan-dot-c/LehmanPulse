"use client";

import { ChangeEvent, SubmitEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { redirect } from "next/navigation";
// import { useState } from "react";
const client = createClient();
type UploadType = "url" | "upload";
const BASE_IMG_URL =
  "https://hupmdqrgdzxsumclvopj.supabase.co/storage/v1/object/public/";

const Page = () => {
  const [postName, setPostName] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postType, setPostType] = useState("");
  const [postImg, setPostImg] = useState("");
  const [imgURL, setIMGURL] = useState("");
  const [uploadType, setUploadType] = useState<UploadType>("url");

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
      img_url: uploadType == "upload" ? imgURL : postImg,
      user_id: user?.id,
    });

    console.log(data, error);
    if (!error) {
      alert("Post Created");
      redirect("/posts");
    }

    console.log(postName, postContent, postType, postImg);
  };

  const onFileChange = async (
    e: ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    if (e.target.files) {
      const dataFile = e.target.files[0];
      const fileExt = dataFile.name.split(".")[1];
      // upload to supabase
      const { data, error } = await client.storage
        .from("post_images")
        .upload(`/posts/${nanoid(6)}.${fileExt}`, dataFile);

      if (error) {
        alert("Upload fail");
        alert(error.message);
      } else {
        console.log(data);
        setIMGURL(`${BASE_IMG_URL}${data.fullPath}`);
      }
    }
  };
  return (
    <div className="p-8 bg-white max-w-3xl mx-auto rounded-xl">
      <h1 className="text-center text-4xl font-bold">
        Learn To Code and create a new post
      </h1>
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
            <div>
              <Tabs defaultValue="url">
                <TabsList>
                  <TabsTrigger value="url" onClick={() => setUploadType("url")}>
                    Paste URL
                  </TabsTrigger>
                  <TabsTrigger
                    value="upload"
                    onClick={() => setUploadType("upload")}
                  >
                    Upload Image
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="url">
                  <Field>
                    <FieldLabel>Image URL</FieldLabel>
                    <Input
                      type="text"
                      id="img"
                      placeholder="https://..."
                      value={postImg}
                      onChange={(e) => setPostImg(e.target.value)}
                    />
                    <FieldDescription>Allowed Types: images/*</FieldDescription>
                  </Field>
                </TabsContent>
                <TabsContent value="upload">
                  <Field>
                    <div className="flex gap-4">
                      <FieldLabel>Img Upload</FieldLabel>
                      <span className="text-red-400 text-xs">
                        {imgURL && "File Saved"}
                      </span>
                    </div>
                    <Input
                      onChange={(e) => onFileChange(e)}
                      type="file"
                      accept="image/*"
                      id="img"
                      placeholder="image URL"
                    />
                    <FieldDescription>Allowed Types: images/*</FieldDescription>
                  </Field>
                </TabsContent>
              </Tabs>
            </div>
            <div className="grid grid-cols-2 gap-4">
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
              <Input type="submit" value="Post" />
            </Field>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
};

export default Page;
