import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const Blog = () => {
  const apiUrl = "http://3.85.142.45:8000/api/blogs";
  const categoryUrl = "http://3.85.142.45:8000/api/blog-categories";
  const [blogs, setBlogs] = useState([]);
  const [category, setCategory] = useState([]);

  const getArchiveDates = (blogs) => {
    // This will create an object where each key is a month-year and each value is an array of days
    const archives = blogs.reduce((acc, blog) => {
      const date = new Date(blog.createdAt);
      const monthYear = `${date.toLocaleString("default", {
        month: "long",
      })} ${date.getFullYear()}`;
      const day = date.getDate();

      if (!acc[monthYear]) {
        acc[monthYear] = new Set(); // Use a Set to prevent duplicate days
      }

      acc[monthYear].add(day);

      return acc;
    }, {});
    console.log(blogs, "nscadncsanf");

    // This will convert the object into an array of strings: ['Day Month Year', ...]
    return Object.entries(archives).flatMap(([monthYear, days]) =>
      Array.from(days)
        .sort()
        .map((day) => `${day} ${monthYear}`)
    );
  };

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

    fetchCategory(); // Invoke the function to fetch categories
  }, []); // Empty dependency array to run only on component mount

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (response.ok) {
          const result = await response.json();
          setBlogs(result);
        } else {
          console.error("Error fetching data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getFormattedDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      month: "short",
      year: "numeric",
    });
  };

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
        <h1 className="text-5xl font-bold text-center my-10">
          Sorel Mizzi Blog
        </h1>
        <div className=" flex flex-wrap -mx-4 ">
          <div className="w-3/4 px-4 lg:w-full ">
            {blogs.map((blog) => (
              <article key={blog.id} className="mb-8 bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
                  <Image style={{height:"40rem",width:"100%"}}
                    src={blog.coverImage}
                    alt={`Cover for ${blog.title}`}
                    width={700}
                    height={400}
                    layout="fixed"
                    className="rounded"
                  />
                  <div className="prose mb-4" dangerouslySetInnerHTML={{ __html: blog.content }} />
                  <div className="flex justify-between items-center text-sm text-gray-600 mt-4">
                    <span className="flex items-center">
                      <span className="text-gray-700 font-medium">
                        By {blog.author || 'Sorel Mizzi'}
                      </span>
                      <span className="mx-2">|</span>
                      <span>{getFormattedDate(blog.createdAt)}</span>
                    </span>
                    <Link href={`/readmore/${blog.id}`} className="text-blue-600 hover:underline">
                      Read more
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="w-1/4 px-4 lg:pl-6">
            <div className="mb-8">
              <input
                type="text"
                placeholder="Search"
                className="w-full p-4 rounded"
              />
            </div>
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Recent Posts</h3>
              <ul>
                {blogs.map((blog) => (
                  <li key={blog.id} className="mb-2">
                    <a
                      href={`/blog/${blog.slug}`}
                      className="text-blue-600 hover:underline"
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
                {getArchiveDates(blogs).map((archiveDate, index) => (
                  <li key={index} className="mb-2">
                    <a
                      href={`/archive/${archiveDate.replace(/\s+/g, "-")}`}
                      className="text-blue-600 hover:underline"
                    >
                      {archiveDate}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Categories</h3>
              <ul>
                {category.map((cat, index) => (
                  <li key={index} className="mb-2">
                    <a
                      href={`/category/${encodeURIComponent(cat.name)}`}
                      className="text-blue-600 hover:underline"
                    >
                      {cat.name}
                    </a>
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
