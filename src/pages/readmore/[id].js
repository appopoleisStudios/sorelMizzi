import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const Readmore = () => {
  const router = useRouter();
  const [blogDetails, setBlogDetails] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query;
      fetch(`http://3.85.142.45:8000/api/blogs/${id}`)
        .then(response => response.json())
        .then(data => setBlogDetails(data));

      // Fetch recent posts
      fetch('http://3.85.142.45:8000/api/blogs?recent=true')
        .then(response => response.json())
        .then(data => setRecentPosts(data));

      // Fetch categories
      fetch('http://3.85.142.45:8000/api/blog-categories')
        .then(response => response.json())
        .then(data => setCategories(data));
    }
  }, [router.isReady]);

  if (!blogDetails) {
    return <div>Loading...</div>;
  }

  // Format the date
  const formattedDate = new Date(blogDetails.createdAt).toLocaleDateString('en-GB', {
    month: 'short',
    year: 'numeric',
  });

  return (
    <>
      <Head>
        <title>{blogDetails.title} - Sorel Mizzi Blog</title>
        <meta name="description" content={blogDetails.excerpt} />
      </Head>
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-center my-10">{blogDetails.title}</h1>
        <div className="flex flex-wrap -mx-4">
          <div className="w-3/4 px-4">
            <article className="mb-8 bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <Image
                  src={blogDetails.coverImage}
                  alt={`Cover for ${blogDetails.title}`}
                  width={700} // Adjust size accordingly
                  height={400} // Adjust size accordingly
                  layout="responsive"
                  className="w-full rounded" // Ensure this class does not enforce any conflicting styles
                />
                <div
                  className="blog-post-content"
                  dangerouslySetInnerHTML={{ __html: blogDetails.content }}
                />
                <p className="text-sm text-gray-600">
                  Published on {formattedDate}
                </p>
              </div>
            </article>
          </div>
          <div className="w-1/4 px-4">
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
                {recentPosts.map((post) => (
                  <li key={post.id} className="mb-2">
                    <Link href={`/readmore/${post.id}`} className="text-blue-600 hover:underline">
                      {post.title}
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
                    <Link href={`/category/${encodeURIComponent(cat.name)}`} className="text-blue-600 hover:underline">
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

export default Readmore;
