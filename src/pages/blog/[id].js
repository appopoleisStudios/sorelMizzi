import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import NavBar from "@/components/NavBars";
import Background from "../backround";

const DetailedBlog = () => {
  const router = useRouter();
  const [blogDetails, setBlogDetails] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [archives, setArchives] = useState([]);
  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query;
  
      const fetchData = async () => {
        try {
          const response1 = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/${id}`);
          const response2 = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs?recent=true`);
          const response3 = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog-categories`);
          const response4 = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs`);
  
          if (response1.ok && response2.ok && response3.ok && response4.ok) {
            const data1 = await response1.json();
            const data2 = await response2.json();
            const data3 = await response3.json();
            const blogsData = await response4.json();
  
            setBlogDetails(data1);
            setRecentPosts(data2);
            setCategories(data3);
  
            const archiveDates = getArchiveDates(blogsData);
            setArchives(archiveDates);
          } else {
            console.error(
              "Error fetching data:",
              response1.status,
              response2.status,
              response3.status,
              response4.status
            );
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }
  }, [router.isReady, router.query.id]);


  const getArchiveDates = (blogs) => {
    const archiveMap = {};
  
    blogs.forEach((blog) => {
      const date = new Date(blog.createdAt);
      const monthYear = `${date.toLocaleString("default", {
        month: "long",
      })} ${date.getFullYear()}`;
  
      if (!archiveMap[monthYear]) {
        archiveMap[monthYear] = `${date.toLocaleString("default", {
          month: "long",
        })}-${date.getFullYear()}`; // Change here to format as Month-Year
      }
    });
  
    return Object.keys(archiveMap).map((monthYear) => ({
      monthYear: archiveMap[monthYear], // Return formatted Month-Year
    }));
  };

  if (!blogDetails) {
    return <div className="min-h-screen bg-black text-light text-4xl text-center w-full  ml-auto mr-auto pt-44 mb-20">Loading...</div>;
  }

  const formattedDate = new Date(blogDetails.createdAt).toLocaleDateString(
    "en-GB",
    {
      month: "short",
      year: "numeric",
    }
  );

  const backgroundImage = "/sorel-mizc/backgroundmain.jpg";
  return (
    <>
      <Head>
        <title>{blogDetails.title} - Sorel Mizzi Blog</title>
        <meta name="description" content={blogDetails.excerpt} />
      </Head>
      <NavBar />
      <Background backgroundImage={backgroundImage}>
      <div className="container mx-auto px-4 min-h-screen ">
        <h1 className="text-5xl font-bold text-center  text-gold">
          {blogDetails.title}
        </h1>
        <div className="h-auto flex flex-wrap -mx-4 ">
          <div className="w-3/4 px-4 lg:w-full ">
            <article className="mb-8  rounded-lg shadow-md overflow-hidden ">
              <div className="p-6 text-yellow-500">
                <Image
                  style={{ height: "40rem", width: "100%" }}
                  src={blogDetails.coverImage}
                  alt={`Cover for ${blogDetails.title}`}
                  width={700}
                  height={400}
                  layout="fixed"
                  className="w-full rounded"
                />
                <p className="text-3xl font-bold  my-10 text-gold">
                  {blogDetails.title}
                </p>
                <div 
                  className="blog-post-content text-light"
                  dangerouslySetInnerHTML={{ __html: blogDetails.content }}
                />
                <p className="text-sm text-gold ">
                  Published on {formattedDate}
                </p>
              </div>
            </article>
          </div>
          <div className="w-1/4 px-4 lg:w-full pt-8  text-gold lg:p-6">
            
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Recent Posts</h3>
              <ul>
                {recentPosts.map((post) => (
                  <li key={post.id} className="mb-2">
                    <Link
                      href={`/blog/${post.id}`}
                      className="text-gold hover:underline  "
                    >
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Archives</h3>
              <ul>
    {archives.map((archive, index) => (
      <li key={index} className="mb-2">
        <Link
          href={`/archive/${encodeURIComponent(archive.monthYear)}`}
          className="text-gold hover:underline  "
        >
          {/* Rendering the archive object directly, causing the error */}
          {archive.monthYear}
        </Link>
      </li>
    ))}
  </ul>
            </div>
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Categories</h3>
              <ul>
                {categories.map((cat) => (
                  <li key={cat.id} className="mb-2">
                    <Link
                      href={`/category/${encodeURIComponent(cat.id)}`}
                      className="text-gold hover:underline  "
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
      </Background>
    </>
  );
};

export default DetailedBlog;
