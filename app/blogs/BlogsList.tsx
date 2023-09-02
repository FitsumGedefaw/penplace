"use client";

import Link from "next/link";
import Blog from "../models/Blog";
import { useState, useEffect } from "react";

async function getBlogs(pageNum: number, keyword: string) {
  let url = `http://localhost:4000/blogs?_page=${pageNum.toString()}`;

  if (keyword) {
    url += `&q=${encodeURIComponent(keyword)}`;
  }

  const res = await fetch(url, {
    next: {
      revalidate: 0, // use 0 to opt out of using cache
    },
  });

  return res.json();
}

export default function BlogsList() {
  const [currPage, setCurrPage] = useState(1);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [keyword, setKeyword] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  console.log("pageNum: ", currPage, "keyWord: ", searchKeyword);

  useEffect(() => {
    const fetchBlogs = async () => {
      const fetchedBlogs = await getBlogs(currPage, searchKeyword);
      setBlogs(fetchedBlogs);
    };

    fetchBlogs();
  }, [currPage, searchKeyword]);

  const nextPage = () => {
    setCurrPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setCurrPage((prev) => prev - 1);
  };

  const handleSearch = () => {
    setCurrPage(1);
    setSearchKeyword(keyword);
  };

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  if (blogs.length > 0) {
    return (
      <>
        <div className="mb-8">
          <input
            className="bg-white border border-gray-300 rounded-lg py-2 px-4 mr-2 focus:outline-none focus:ring-2 focus:ring-primary"
            type="text"
            value={keyword}
            onChange={handleKeywordChange}
          />
          <button
            onClick={handleSearch}
            className="btn-primary inline py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            Search
          </button>
        </div>
        {blogs.map((blog) => {
          const formattedDate = new Date(blog.date).toLocaleDateString(
            "en-US",
            {
              year: "numeric",
              month: "long",
              day: "numeric",
            }
          );

          return (
            <div key={blog.id} className="card my-5">
              <Link href={`blogs/${blog.id}`}>
                <h3 className="mb-4">{blog.title}</h3>
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
                <p className="line-clamp-2">{blog.content}</p>
              </Link>
            </div>
          );
        })}
        <div className="flex justify-center gap-4 mb-8">
          <button
            className={currPage === 1 ? "bg-gray-300" : "btn-primary"}
            onClick={prevPage}
            disabled={currPage === 1}
          >
            Previous Page
          </button>
          <button className="btn-primary" onClick={nextPage}>
            Next Page
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <p className="text-center">There are no open blogs, yay!</p>
    </>
  );
}
