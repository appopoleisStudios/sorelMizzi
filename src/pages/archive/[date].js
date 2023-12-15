// ... (imports and other code remain unchanged)
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import NavBar from '@/components/NavBars';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
const DateArchive = () => {
  const router = useRouter();
  const { date } = router.query;

  // Fetch blog posts for the specified date
  const [blogsForDate, setBlogsForDate] = useState([]);

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
  
  useEffect(() => {
    if (date) {

      const fetchBlogsForDate = async () => {
        try {
          console.log(date,"date for BLOG")
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/archives/${date}`);
          console.log(response,"created aat")
          if (response.ok) {
            const data = await response.json();
            setBlogsForDate(data);
          } else {
            console.error('Error fetching blogs for the date:', response.status);
          }
        } catch (error) {
          console.error('Error fetching blogs for the date:', error);
        }
      };

      fetchBlogsForDate();
    }
  }, [date]);

  // Navigate to the blog page when blogs for the date are fetched
 

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

  return (
    <>
      <Head>
        <title>{`Blogs from ${date}`} - Sorel Mizzi Blog</title>
        <meta name="description" content={blogsForDate.excerpt} />
      </Head>
      <NavBar />
      
      <div className="w-full  flex mx-auto px-4 min-h-screen">
      <div className="h-auto flex flex-wrap -mx-4 ">
  <div className="h-auto w-3/4 lg:w-full flex flex-wrap -mx-4 bg-black">
    {blogsForDate.map((blog) => (
      <div key={blog.id} className="w-full px-4 lg:w-full mb-4">
        <article className="bg-black rounded-lg shadow-md overflow-hidden">
          <div className="p-4 bg-black text-yellow-500">
            <h1 className="text-5xl font-bold my-6">{blog.title}</h1>
            <img
              src={blog.coverImage}
              alt={`Cover for ${blog.title}`}
              className="w-full rounded"
            />
            
            <p className="text-3xl font-bold  my-6 dark:text-light">
                  {blog.title}
                </p>
            <div
              className="blog-post-content"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>
        </article>
      </div>
    ))}

    
  </div>
  <div className="w-1/4 px-4 lg:w-full bg-black text-yellow-500 lg:p-6">
      {/* Recent Posts */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Recent Posts</h3>
        <ul>
          {recentPosts.map((post) => (
            <li key={post.id} className="mb-2">
              <Link href={`/blog/${post.id}`} className="text-yellow-500 hover:underline">
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Archives */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Archives</h3>
        <ul>
          {archives.map((archive, index) => (
            <li key={index} className="mb-2">
              <Link
                href={`/archive/${encodeURIComponent(archive.monthYear)}`}
                className="text-yellow-500 hover:underline"
              >
                {archive.monthYear}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Categories</h3>
        <ul>
          {categories.map((cat) => (
            <li key={cat.id} className="mb-2">
              <Link
                href={`/category/${encodeURIComponent(cat.id)}`}
                className="text-yellow-500 hover:underline"
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

export default DateArchive;


