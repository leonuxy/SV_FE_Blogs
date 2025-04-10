"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import axios from "axios"

import { useRouter } from "next/navigation";

export default  function  Home() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")

  const router = useRouter();
  const handleButton = (type: "publish" | "draft") => async () => {
    try {
      const postData = {
        title,
        content,
        category,
        status: type 
      }

      await axios.post("http://localhost:8080/article", postData)
      router.push("../")
    } catch (error) {
      console.error("Failed to post article:", error)
    }
  }

  return (
    <div className="grid grid-cols-1 gap-4 items-center justify-items-center max-w-[1080px] sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h2 className="text-2xl font-semibold">Create New Posts</h2>

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
        <Button variant="default" onClick={handleButton("publish")} type="button">
          Publish
        </Button>
        <Button variant="secondary" onClick={handleButton("draft")} type="button">
          Save as Draft
        </Button>
      </div>
    </div>
  )
}
