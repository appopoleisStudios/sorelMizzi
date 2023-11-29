import React from "react";
import Head from "next/head";
import { useState, useEffect } from "react";
import Image from "next/image";

const Blog = () => {
  const apiUrl = "http://3.85.142.45:8000/api/blogs";
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const result = await response.json();
        setBlogs(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  console.log(blogs, "vneainnfd");

  return (
    <>
      <Head>
        <title>Sorel Mizzi Blog</title>
        <meta
          name="description"
          content="Sorel Mizzi writes about his experiences in his personal life as well as his professional poker career."
        />
      </Head>
      <div className="container mx-auto px-4">
        {/* Page Title */}
        <h1 className="text-5xl font-bold text-center my-10">
          Sorel Mizzi Blog
        </h1>

        {/* Main Content and Sidebar */}
        <div className="flex flex-wrap -mx-4">
          {/* Main content */}
          <div className="w-3/4 lg:w-3/4 px-4">
            {blogs.map((blog) => (
              <article
                key={blog.id}
                className="mb-8 bg-white rounded-lg shadow-md"
              >
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
                  <img
                    src={blog.coverImage}
                    alt={`Cover for ${blog.title}`}
                    className="w-full h-96 rounded-t-lg"
                  />
                  <p className="mb-4">{blog.excerpt}</p>
                  <div className="flex justify-between items-center">
                    {/* Format the date to display as 'Nov 2023' */}
                    <span className="text-sm text-gray-600">
                      Published on{" "}
                      {new Date(blog.createdAt).toLocaleDateString("en-GB", {
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <a
                      href={`/blog/${blog.slug}`}
                      className="text-blue-600 hover:underline"
                    >
                      Read more
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {/* Sidebar */}
          <div className="w-1/4 lg:w-1/4 px-4">
            {/* Search */}
            <div className="mb-8">
              <input
                type="text"
                placeholder="Search"
                className="w-full p-4 rounded"
              />
            </div>

            {/* Recent Posts */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Recent Posts</h3>
              <ul>
                {/* Replace with actual data */}
                <li className="mb-2">
                  <a href="#" className="text-blue-600 hover:underline">
                    Barack H. Obama
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-blue-600 hover:underline">
                    The Power Of Why
                  </a>
                </li>
                {/* ... more posts */}
              </ul>
            </div>

            {/* Archives */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Archives</h3>
              <ul>
                {/* Replace with actual data */}
                <li className="mb-2">
                  <a href="#" className="text-blue-600 hover:underline">
                    November 2016
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-blue-600 hover:underline">
                    February 2016
                  </a>
                </li>
                {/* ... more archives */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
