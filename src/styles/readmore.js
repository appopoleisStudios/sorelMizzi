import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Readmore = () => {
  const router = useRouter();
  const [blogDetails, setBlogDetails] = useState(null);

  useEffect(() => {
    // Ensure the router has query parameters before attempting to fetch:
    if (router.isReady) {
      const { id } = router.query;

      // Fetch blog details using the ID:
      fetch(`http://3.85.142.45:8000/api/blogs/${id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => setBlogDetails(data))
        .catch(error => {
          console.error('Error fetching blog details:', error);
          // Handle errors here, for example, by setting an error state.
        });
    }
  }, [router.isReady, router.query]); // Add router.query as a dependency.

  if (!blogDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Render blog details */}
      <h1>{blogDetails.title}</h1>
      {/* Add other blog details as needed */}
      {/* You will need to adjust below to match the structure of your blog details */}
      <p>{blogDetails.content}</p>
      {/* Include other details you want to render, such as author, date, etc. */}
    </div>
  );
};

export default Readmore;
