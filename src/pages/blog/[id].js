import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import NavBar from "@/components/NavBars";

const DetailedBlog = () => {
  const router = useRouter();
  const [blogDetails, setBlogDetails] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [archives, setArchives] = useState([]);
  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query;

      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/${id}`)
        .then((response) => response.json())
        .then((data) => setBlogDetails(data))
        .catch((error) => console.error("Error fetching blog details:", error));

      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs?recent=true`)
        .then((response) => response.json())
        .then((data) => setRecentPosts(data))
        .catch((error) => console.error("Error fetching recent posts:", error));

      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog-categories`)
        .then((response) => response.json())
        .then((data) => setCategories(data))
        .catch((error) => console.error("Error fetching categories:", error));

      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs`)
        .then((response) => response.json())
        .then((blogsData) => {
          const archiveDates = getArchiveDates(blogsData);
          setArchives(archiveDates);
        })
        .catch((error) =>
          console.error("Error fetching archive dates:", error)
        );
    }
  }, [router.isReady, router.query.id]);
  // useEffect(() => {
  //   if (router.isReady) {
  //     const { id } = router.query;

  //     // Fetch the specific blog details
  //     fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/api/blogs/${id}`)
  //       .then((response) => response.json())
  //       .then((data) => setBlogDetails(data))
  //       .catch((error) => console.error('Error fetching blog details:', error));

  //     // Fetch recent posts
  //     fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs?recent=true`)
  //       .then((response) => response.json())
  //       .then((data) => setRecentPosts(data))
  //       .catch((error) => console.error('Error fetching recent posts:', error));

  //     // Fetch categories
  //     fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog-categories`)
  //       .then((response) => response.json())
  //       .then((data) => setCategories(data))
  //       .catch((error) => console.error('Error fetching categories:', error));

  //     // Fetch all blogs to process archive dates
  //     fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs`)
  //       .then((response) => response.json())
  //       .then((blogsData) => {
  //         // Process the blogsData to get archives
  //         const archiveDates = getArchiveDates(blogsData);
  //         setArchives(archiveDates);
  //       })
  //       .catch((error) => console.error('Error fetching archive dates:', error));
  //   }
  // }, [router.isReady, router.query.id]); // Add router.query.id as a dependency

  // useEffect(() => {

  //     const { id } = router.query;

  //     // Fetch the specific blog details
  //     fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/${id}`)
  //       .then(response => response.json())
  //       .then(data => setBlogDetails(data));

  //     // Fetch recent posts
  //     fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs?recent=true`)
  //       .then(response => response.json())
  //       .then(data => setRecentPosts(data));

  //     // Fetch categories
  //     fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog-categories`)
  //       .then(response => response.json())
  //       .then(data => setCategories(data));

  //     // Fetch all blogs to process archive dates
  //     fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs`)
  //       .then(response => response.json())
  //       .then(blogsData => {
  //         // Process the blogsData to get archives
  //         const archiveDates = getArchiveDates(blogsData);
  //         setArchives(archiveDates);
  //       });

  // }, []);

  const getArchiveDates = (blogs) => {
    const archiveMap = {};

    blogs.forEach((blog) => {
      const date = new Date(blog.createdAt);
      const monthYear = `${date.toLocaleString("default", {
        month: "long",
      })} ${date.getFullYear()}`;

      if (!archiveMap[monthYear]) {
        archiveMap[monthYear] = [];
      }

      archiveMap[monthYear].push(blog.id); // Store blog IDs for linking to individual posts
    });

    return Object.keys(archiveMap).map((monthYear) => ({
      monthYear,
      blogIds: archiveMap[monthYear],
    }));
  };

  if (!blogDetails) {
    return <div>Loading...</div>;
  }

  const formattedDate = new Date(blogDetails.createdAt).toLocaleDateString(
    "en-GB",
    {
      month: "short",
      year: "numeric",
    }
  );

  return (
    <>
      <Head>
        <title>{blogDetails.title} - Sorel Mizzi Blog</title>
        <meta name="description" content={blogDetails.excerpt} />
      </Head>
      <NavBar />
      <div className="container mx-auto px-4 min-h-screen">
        <h1 className="text-5xl font-bold text-center my-10 dark:text-light">
          {blogDetails.title}
        </h1>
        <div className="h-auto flex flex-wrap -mx-4 ">
          <div className="w-3/4 px-4 lg:w-full ">
            <article className="mb-8 bg-white rounded-lg shadow-md overflow-hidden ">
              <div className="p-6  dark:bg-dark dark:text-light">
                <Image
                  style={{ height: "40rem", width: "100%" }}
                  src={blogDetails.coverImage}
                  alt={`Cover for ${blogDetails.title}`}
                  width={700}
                  height={400}
                  layout="fixed"
                  className="w-full rounded"
                />
                <p className="text-3xl font-bold  my-10 dark:text-light">
                  {blogDetails.title}
                </p>
                <div
                  className="blog-post-content"
                  dangerouslySetInnerHTML={{ __html: blogDetails.content }}
                />
                <p className="text-sm text-gray-600 dark:text-light">
                  Published on {formattedDate}
                </p>
              </div>
            </article>
          </div>
          <div className="w-1/4 px-4  dark:text-light lg:p-6">
            <div className="mb-8">
              <input
                type="text"
                placeholder="Search"
                className="w-full p-4 rounded dark:text-dark"
              />
            </div>
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Recent Posts</h3>
              <ul>
                {recentPosts.map((post) => (
                  <li key={post.id} className="mb-2">
                    <Link
                      href={`/blog/${post.id}`}
                      className="text-blue-600 hover:underline  dark:text-light"
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
                      className="text-blue-600 hover:underline  dark:text-light"
                    >
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
                      href={`/category/${encodeURIComponent(cat.name)}`}
                      className="text-blue-600 hover:underline  dark:text-light"
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

export default DetailedBlog;
