"use client";

import Blog from "@/app/models/Blog";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import NotFound from "./not-found";

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

export default async function BlogDetails({ params }: { params: any }) {
  // const id = params.id
  const router = useRouter();
  const blog: Blog = await getBlog(params.id);

  const deleteHandler = () => {
    fetch("http://localhost:4000/blogs/" + params.id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          router.refresh();
          router.push("/blogs");
        } else {
          notFound();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const formattedDate = new Date(blog.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      <h2 className="mb-8">{blog.title}</h2>
      <div className="flex items-center">
        <img
          src={blog.authorImage}
          alt="Author avatar"
          className="rounded-full w-12 h-12 object-cover mr-2"
        />
        <div>
          <span className="block font-medium">{blog.authorName}</span>
          <small className="text-gray-500">{formattedDate}</small>
        </div>
      </div>
      <div className="card">
        <p>{blog.content}</p>
        <div className="flex justify-center gap-4 my-8">
          <Link href={`/blogs/edit/${params.id}`}>
            <button className="btn-primary">Edit</button>
          </Link>
          <button onClick={deleteHandler} className="bg-red-600 text-white">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
