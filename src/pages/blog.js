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
  const [searchQuery, setSearchQuery] = useState("");


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
  


  // serach query/////
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    // Fetch the blog that matches the title
    const matchingBlog = recentPosts.find((post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (matchingBlog) {
      router.push(`/blog/${matchingBlog.id}`);
    } else {
      // Handle no matching blog found
      console.log("No matching blog found.");
    }
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
      <NavBar />
      <div className="container bg-black text-yellow-500 mx-auto px-4">
        <h1 className="text-5xl  font-bold text-center my-10 ">
          Sorel Mizzi Blog
        </h1>
        <div className="flex flex-wrap -mx-4">
          <div className="w-3/4 px-2 lg:w-full">
            {blogs.map((blog) => (
              <article
                key={blog.id}
                className="mb-8  rounded-lg shadow overflow-hidden bg-black "
              >
                  <h2 className="text-2xl pl-6 p-4 font-bold mb-2">{blog.title}</h2>
                <div className="p-6 flex items-center justify-center bg-black  xl:block ">
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
                    className="rounded bg-black "
                  />
                  </div>
                  <div className="w-1/2 p-6 xl:w-full">
                  <div className="prose mb-4 bg-black ">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: `${blog.content.slice(0, 700)}...`,
                      }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-sm  mt-4  text-yellow-500 ">
                    <span className="flex items-center">
                      <span className=" font-medium ">
                        By {blog.author || "Sorel Mizzi"}
                      </span>
                      <span className="mx-2 ">|</span>
                      <span>{getFormattedDate(blog.createdAt)}</span>
                    </span>
                   
                    <Link
               href={`/blog/${blog.id}`}
              className="inline-block px-4 py-1  text-white rounded-full overflow-hidden relative group transition-all duration-500 ease-linear"
            >
              {/* Golden background that expands on hover */}
              <span className="absolute right-0 left-0 top-0 bottom-0 w-10 h-full bg-yellow-500 rounded-full group-hover:w-full transition-all duration-500 ease-linear"></span>

              <span className="relative flex items-center">
                {/* "See More" text with margin */}
                <span className="z-10 text-xl opacity-100 group-hover:text-black group-hover:font-bold group-hover:opacity-100 duration-300 ease-linear transition-opacity ml-8">
                  read more
                </span>

                {/* White Arrow Icon with adjusted margin */}
                <svg
                  className="w-4 h-4 text-black absolute"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="4"
                    d="M4 5l7 7-7 8"
                  />
                </svg>
              </span>
            </Link> 
                  </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="w-1/4  px-2 lg:pl-6 lg:w-full">
        
            <div className="mb-8 ">
              <h3 className="text-xl font-bold mb-4">Recent Posts</h3>
              <ul>
                {blogs.map((blog) => (
                  <li key={blog.id} className="mb-2">
                    <a
                      href={`/blog/${blog.id}`}
                      className="text-yellow-500 hover:underline  bg-black "
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
                  <Link href={`/archive/${date.replaceAll(" ", "-")}`} className="text-yellow-500 hover:underline">
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
                      className="text-yellow-500 hover:underline bg-black "
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
