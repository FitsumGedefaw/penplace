import { Suspense } from "react";
import BlogsList from "./BlogsList";
import Loading from "../loading";
import Link from "next/link";
import { IoAddCircleOutline } from "react-icons/io5";

export default function Blogs() {
  return (
    <main>
      <nav>
        <div className="w-full flex justify-between items-center">
          <div>
            <Link href='/blogs'><h2>Blogs</h2></Link>
            <p>
              <small>Latest blogs</small>
            </p>
          </div>
          <div className="flex justify-center my-8 mr-32">
            <Link href="/blogs/create">
              <button title="Create blog" className="btn-primary">
                <IoAddCircleOutline className="text-xl font-bold" />
              </button>
            </Link>
          </div>
        </div>
      </nav>
      <Suspense fallback={<Loading />}>
        <BlogsList />
      </Suspense>
    </main>
  );
}
