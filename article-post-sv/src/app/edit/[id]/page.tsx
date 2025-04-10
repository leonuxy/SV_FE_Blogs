"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios from "axios";

type Posts = {
  id: number;
  title: string;
  content: string;
  category: string;
  status: string;
};

export default function EditPostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const router = useRouter();
  const { id } = useParams(); // <- get the dynamic [id] from URL

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await axios.get<Posts>(`http://localhost:8080/article/${id}`);
      const post = response.data;
      setTitle(post.title);
      setContent(post.content);
      setCategory(post.category);
    } catch (error) {
      console.error("Failed to fetch post:", error);
    }
  };

  const handleUpdate = (type: "publish" | "draft") => async () => {
    try {
      const updatedPost = {
        title,
        content,
        category,
        status: type,
      };

      await axios.put(`http://localhost:8080/article/${id}`, updatedPost);
      router.push("../");
    } catch (error) {
      console.error("Failed to update post:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 items-center justify-items-center max-w-[1080px] sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h2 className="text-2xl font-semibold">Edit Post</h2>

      <Input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <Input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <div className="flex gap-4 mt-4">
        <Button variant="default" onClick={handleUpdate("publish")} type="button">
          Publish
        </Button>
        <Button variant="secondary" onClick={handleUpdate("draft")} type="button">
          Save as Draft
        </Button>
      </div>
    </div>
  );
}
