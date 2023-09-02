"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Blog from "@/app/models/Blog";

// export async function generateStaticParams() {
//   const res = await fetch("http://localhost:4000/tickets");

//   const blogs: Blog[] = await res.json();

//   return blogs.map((blog) => ({
//     id: blog.id,
//   }));
// }

async function getBlog(id: number) {
  // imitate delay
  //await new Promise(resolve => setTimeout(resolve, 3000))

  const res = await fetch(`http://localhost:4000/blogs/${id}`, {
    next: {
      revalidate: 0,
    },
  });

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

export default function CreateForm({params} : {params: any}) {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [blog, setBlog] = useState<Blog>({
    id: 1,
    title: "",
    content: "",
    date: "", 
    authorId: "",
    authorImage: "", 
    authorName: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async() => {
    const fetchedBlog : Blog = await getBlog(params.id);
    setBlog(fetchedBlog);   
    setTitle(fetchedBlog.title);
    setContent(fetchedBlog.content);
    }

    fetchData();
    
  }, [])

  const handleSubmit = async (e : React.FormEvent) => {
    
    e.preventDefault();
    setIsLoading(true);

    const updatedBlog : Blog = {
      title,
      content,
      id: blog.id,
      date: blog.date,
      authorId: blog.authorId,
      authorImage: blog.authorImage,
      authorName: blog.authorName
    };
    console.log(updatedBlog);
    

    const res = await fetch("http://localhost:4000/blogs/" + params.id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedBlog),
    });

    if (res.status === 200) {
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
        className="h-48"
          required
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />
      </label>
      <button className="btn-primary" disabled={isLoading}>
        {isLoading && <span>Saving...</span>}
        {!isLoading && <span>Save</span>}
      </button>
    </form>
  );
}

