import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import NavBar from "@/components/NavBars";

const Blog = () => {
  const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs`;
  const categoryUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog-categories`;
  const [blogs, setBlogs] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogsResponse = await fetch(apiUrl);
        const categoriesResponse = await fetch(categoryUrl);

        if (blogsResponse.ok && categoriesResponse.ok) {
          const blogsData = await blogsResponse.json();
          const categoriesData = await categoriesResponse.json();
          setBlogs(blogsData);
          setCategory(categoriesData);
        } else {
          console.error(
            "Error fetching data:",
            blogsResponse.status,
            categoriesResponse.status
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(categoryUrl);
        if (response.ok) {
          const result = await response.json();
          setCategory(result);
        } else {
          console.error("Error fetching data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCategory();
  }, []);

  const getFormattedDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      month: "long",
      year: "numeric",
    });
  };

  const getArchiveDates = (blogs) => {
    const dateSet = new Set(
      blogs.map((blog) => getFormattedDate(blog.createdAt))
    );
    return Array.from(dateSet).sort((a, b) => new Date(b) - new Date(a));
  };
  console.log(blogs.id, "dadasaasd");
  const archiveDates = getArchiveDates(blogs);
  return (
    <>
      <Head>
        <title>Sorel Mizzi Blog</title>
        <meta
          name="description"
          content="Sorel Mizzi writes about his experiences in his personal life as well as his professional poker career."
        />
      </Head>
      <NavBar />
      <div className="container mx-auto px-4 dark:text-light">
        <h1 className="text-5xl font-bold text-center my-10 ">
          Sorel Mizzi Blog
        </h1>
        <div className="flex flex-wrap -mx-4">
          <div className="w-3/4 px-2 lg:w-full">
            {blogs.map((blog) => (
              <article
                key={blog.id}
                className="mb-8 bg-white rounded-lg shadow overflow-hidden dark:bg-dark dark:text-light"
              >
                  <h2 className="text-2xl pl-6 p-4 font-bold mb-2">{blog.title}</h2>
                <div className="p-6 flex items-center justify-center dark:bg-dark dark:text-light xl:block ">
                  <div className="w-1/2 xl:w-full">
                  <Image
                    style={{
                      height: "auto",
                      maxHeight: "60vh",
                      width: "100%",
                      objectFit: "fill",
                      
                    }}
                    src={blog.coverImage}
                    alt={`Cover for ${blog.title}`}
                    width={700}
                    height={400}
                    layout="fixed"
                    className="rounded dark:bg-dark dark:text-light"
                  />
                  </div>
                  <div className="w-1/2 p-6 xl:w-full">
                  <div className="prose mb-4 dark:bg-dark dark:text-light">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: `${blog.content.slice(0, 700)}...`,
                      }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600 mt-4 dark:bg-dark dark:text-light">
                    <span className="flex items-center">
                      <span className="text-gray-700 font-medium dark:bg-dark dark:text-light">
                        By {blog.author || "Sorel Mizzi"}
                      </span>
                      <span className="mx-2">|</span>
                      <span>{getFormattedDate(blog.createdAt)}</span>
                    </span>
                    <Link
                      href={`/blog/${blog.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Read more
                    </Link>
                  </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="w-1/4 px-2 lg:pl-6 lg:w-full">
            <div className="mb-8">
              <input
                type="text"
                placeholder="Search"
                className="w-full p-4 rounded"
              />
            </div>
            <div className="mb-8 ">
              <h3 className="text-xl font-bold mb-4">Recent Posts</h3>
              <ul>
                {blogs.map((blog) => (
                  <li key={blog.id} className="mb-2">
                    <a
                      href={`/blog/${blog.id}`}
                      className="text-blue-600 hover:underline  dark:bg-dark dark:text-light"
                    >
                      {blog.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Archives</h3>
              <ul>
                {archiveDates.map((date, index) => (
                  <li key={index} className="mb-2">
                  <Link href={`/archive/${date.replaceAll(" ", "-")}`} className="text-blue-600 hover:underline">
  {date}
</Link>

                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Categories</h3>
              <ul>
                {category.map((cat, index) => (
                  <li key={index} className="mb-2">
                    <Link
                      href={`/category/${encodeURIComponent(cat.id)}`}
                      className="text-blue-600 hover:underline dark:bg-dark dark:text-light"
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
