"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Blog from "../../models/Blog";

export default function CreateForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e : React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const newBlog: Blog = {
      id : Date.now(),
      title,
      content,
      date: new Date().toLocaleString(),
      authorId: Date.now().toString(),
      authorName: "Fitsum Gedefaw",
      authorImage:
        "https://robohash.org/velitinciduntvel.png?size=50x50&set=set1",
    };

    const res = await fetch("http://localhost:4000/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBlog),
    });

    if (res.status === 201) {
      router.refresh();
      router.push("/blogs");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-1/2">
      <label>
        <span>Title:</span>
        <input
          required
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </label>
      <label>
        <span>Content:</span>
        <textarea
          required
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />
      </label>
      <button className="btn-primary" disabled={isLoading}>
        {isLoading && <span>Creating...</span>}
        {!isLoading && <span>Create blog</span>}
      </button>
    </form>
  );
}
