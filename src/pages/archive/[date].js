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
    // Fetch blogs based on the provided 'date' parameter
    const fetchBlogsForDate = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs?date=${date}`);
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
  }, [date]);
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

  

  const formattedDate = new Date(blogsForDate.createdAt).toLocaleDateString(
    "en-GB",
    {
      month: "short",
      year: "numeric",
    }
  );

  return (
    <>
      <Head>
        <title>{`Blogs from ${date}`} - Sorel Mizzi Blog</title>
        <meta name="description" content={blogsForDate.excerpt} />
      </Head>
      <NavBar />
      
      <div className="container flex mx-auto px-4 min-h-screen">

  <div className="h-auto w-full flex flex-wrap -mx-4">
    {blogsForDate.map((blog) => (
      <div key={blog.id} className="w-full px-4 lg:w-full mb-4">
        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 dark:bg-dark dark:text-light">
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
  <div className="w-1/4 px-4 dark:text-light lg:p-6">
      {/* Recent Posts */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Recent Posts</h3>
        <ul>
          {recentPosts.map((post) => (
            <li key={post.id} className="mb-2">
              <Link href={`/blog/${post.id}`} className="text-blue-600 hover:underline">
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
                className="text-blue-600 hover:underline"
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
                href={`/category/${encodeURIComponent(cat.name)}`}
                className="text-blue-600 hover:underline"
              >
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
</div>
    </>
  );
};

export default DateArchive;

// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import NavBar from '@/components/NavBars';
// import Head from 'next/head';
// import Image from 'next/image';
// import Link from 'next/link';

// const BlogPage = () => {
//   const router = useRouter();
//   const { id, date } = router.query;

//   const [blogDetails, setBlogDetails] = useState(null);
//   const [recentPosts, setRecentPosts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [archives, setArchives] = useState([]);
//   const [blogsForDate, setBlogsForDate] = useState(null);

//   useEffect(() => {
//     if (id) {
//       // Fetch the specific blog details
//       fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/${id}`)
//         .then((response) => response.json())
//         .then((data) => setBlogDetails(data))
//         .catch((error) => console.error('Error fetching blog details:', error));
//     }

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
//         const archiveDates = getArchiveDates(blogsData);
//         setArchives(archiveDates);
//       })
//       .catch((error) => console.error('Error fetching archive dates:', error));

//     // Fetch blogs based on the provided 'date' parameter
//     if (date) {
//       fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs?date=${date}`)
//         .then((response) => response.json())
//         .then((data) => setBlogsForDate(data))
//         .catch((error) => console.error('Error fetching blogs for the date:', error));
//     }
//   }, [id, date]);

//   const handleDateClick = (clickedDate) => {
//     router.push(`/archive/${encodeURIComponent(clickedDate)}`);
//   };

//   const getArchiveDates = (blogs) => {
//     const archiveMap = {};

//     blogs.forEach((blog) => {
//       const date = new Date(blog.createdAt);
//       const monthYear = `${date.toLocaleString("default", {
//         month: "long",
//       })} ${date.getFullYear()}`;

//       if (!archiveMap[monthYear]) {
//         archiveMap[monthYear] = [];
//       }

//       archiveMap[monthYear].push(blog.id); // Store blog IDs for linking to individual posts
//     });

//     return Object.keys(archiveMap).map((monthYear) => ({
//       monthYear,
//       blogIds: archiveMap[monthYear],
//     }));
//   };

//   if (id && !blogDetails) {
//     return <div>Loading...</div>;
//   }

//   const formattedDate = blogDetails
//     ? new Date(blogDetails.createdAt).toLocaleDateString('en-GB', {
//         month: 'short',
//         year: 'numeric',
//       })
//     : null;

//   return (
//     <>
//       <Head>
//         <title>{blogDetails ? `${blogDetails.title} - Sorel Mizzi Blog` : `Blogs from ${date}`} </title>
//         <meta name="description" content={blogDetails ? blogDetails.excerpt : ''} />
//       </Head>
//       <NavBar />
//       <div className="container mx-auto px-4 min-h-screen">
//         {blogsForDate && (
//   <div className="h-auto flex flex-wrap -mx-4">
//     {blogsForDate.length > 0 ? (
//       <>
//         {blogsForDate.map((blog) => (
//           <div key={blog.id} className="w-1/3 px-4 mb-8">
//             <div className="border p-4 rounded">
//               <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
//               <p className="text-gray-600">{blog.createdAt}</p>
//               {/* Render other necessary blog information */}
//               {/* Add styling or structure based on your design */}
//             </div>
//           </div>
//         ))}
//         {/* Add additional content */}
//         <div className="container mx-auto px-4 min-h-screen">
//           <h1 className="text-5xl font-bold text-center my-10 dark:text-light">
//             {blogDetails.title}
//           </h1>
//           <div className="h-auto flex flex-wrap -mx-4 ">
//             <div className="w-3/4 px-4 lg:w-full ">
//               <article className="mb-8 bg-white rounded-lg shadow-md overflow-hidden ">
//                 <div className="p-6  dark:bg-dark dark:text-light">
//                   <Image
//                     style={{ height: "40rem", width: "100%" }}
//                     src={blogDetails.coverImage}
//                     alt={`Cover for ${blogDetails.title}`}
//                     width={700}
//                     height={400}
//                     layout="fixed"
//                     className="w-full rounded"
//                   />
//                   <p className="text-3xl font-bold  my-10 dark:text-light">
//                     {blogDetails.title}
//                   </p>
//                   <div
//                     className="blog-post-content"
//                     dangerouslySetInnerHTML={{ __html: blogDetails.content }}
//                   />
//                   <p className="text-sm text-gray-600 dark:text-light">
//                     Published on {formattedDate}
//                   </p>
//                 </div>
//               </article>
//             </div>
//             <div className="w-1/4 px-4  dark:text-light lg:p-6">
//               {/* Render Recent Posts, Archives, and Categories */}
//             </div>
//           </div>
//         </div>
//       </>
//     ) : (
//       <div>No blogs found for this date.</div>
//     )}
//   </div>
// )}

//         {blogsForDate && (
//   <div className="h-auto flex flex-wrap -mx-4">
//     {blogsForDate.length > 0 ? (
//       <>
//         {blogsForDate.map((blog) => (
//           <div key={blog.id} className="w-1/3 px-4 mb-8">
//             <div className="border p-4 rounded">
//               <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
//               <p className="text-gray-600">{blog.createdAt}</p>
//               {/* Render other necessary blog information */}
//               {/* Add styling or structure based on your design */}
//             </div>
//           </div>
//         ))}
//         {/* Add additional content */}
//         <div className="container mx-auto px-4 min-h-screen">
//           <h1 className="text-5xl font-bold text-center my-10 dark:text-light">
//             {blogDetails.title}
//           </h1>
//           <div className="h-auto flex flex-wrap -mx-4 ">
//             <div className="w-3/4 px-4 lg:w-full ">
//               <article className="mb-8 bg-white rounded-lg shadow-md overflow-hidden ">
//                 <div className="p-6  dark:bg-dark dark:text-light">
//                   <Image
//                     style={{ height: "40rem", width: "100%" }}
//                     src={blogDetails.coverImage}
//                     alt={`Cover for ${blogDetails.title}`}
//                     width={700}
//                     height={400}
//                     layout="fixed"
//                     className="w-full rounded"
//                   />
//                   <p className="text-3xl font-bold  my-10 dark:text-light">
//                     {blogDetails.title}
//                   </p>
//                   <div
//                     className="blog-post-content"
//                     dangerouslySetInnerHTML={{ __html: blogDetails.content }}
//                   />
//                   <p className="text-sm text-gray-600 dark:text-light">
//                     Published on {formattedDate}
//                   </p>
//                 </div>
//               </article>
//             </div>
//             <div className="w-1/4 px-4  dark:text-light lg:p-6">
//               {/* Render Recent Posts, Archives, and Categories */}
//             </div>
//           </div>
//         </div>
//       </>
//     ) : (
//       <div>No blogs found for this date.</div>
//     )}
//   </div>
// )}

//       </div>
//     </>
//   );
// };

// export default BlogPage;

