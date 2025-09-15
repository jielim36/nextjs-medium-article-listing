'use client';

import { useState, useEffect } from 'react';

interface Post {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet: string;
  creator: string;
  thumbnail?: string; 
}

interface ApiResponse {
  success: boolean;
  username?: string;
  feedCount?: number;
  posts?: Post[];
  error?: string;
}

export default function Home() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/rss');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error:', error);
      setData({ success: false, error: 'Failed to fetch posts' });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <main className="container">
        <div className="loading">Loading...</div>
      </main>
    );
  }

  if (!data?.success) {
    return (
      <main className="container">
        <h1>Medium RSS Reader</h1>
        <div className="error">
          Error: {data?.error || 'Unknown error'}
        </div>
        <button onClick={fetchPosts} className="retry-btn">
          Retry
        </button>
      </main>
    );
  }

  return (
    <main className="container">
      {/* <header className="header">
        <h1>Medium RSS Reader</h1>
        <p>Latest {data.feedCount} posts from @{data.username}</p>
        <button onClick={fetchPosts} className="refresh-btn">
          Refresh
        </button>
      </header> */}

      <div className="posts-container">
        {data.posts?.map((post, index) => (
          <article key={index} className="post-card">
            {post.thumbnail && (
              <div className="post-thumbnail">
                <img src={post.thumbnail} alt={post.title} />
              </div>
            )}
            <div className="post-details">
              <h2 className="post-title">
                <a href={post.link} target="_blank" rel="noopener noreferrer">
                  {post.title}
                </a>
              </h2>
              <div className="post-meta">
                <span className="post-date">{formatDate(post.pubDate)}</span>
                <span className="post-author">by {post.creator}</span>
              </div>
              <a href={post.link} target="_blank" rel="noopener noreferrer" className="read-more">
                Read more →
              </a>
            </div>
          </article>
        ))}
      </div>

      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #333;
        }

        .header {
          text-align: center;
          margin-bottom: 40px;
          padding-bottom: 20px;
          border-bottom: 2px solid #eee;
        }

        .header h1 {
          margin: 0 0 10px 0;
          font-size: 2.5rem;
          font-weight: 700;
          color: #1a1a1a;
        }

        .header p {
          margin: 0 0 20px 0;
          font-size: 1.1rem;
          color: #666;
        }

        .refresh-btn, .retry-btn {
          background: #0070f3;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: background 0.2s;
        }

        .refresh-btn:hover, .retry-btn:hover {
          background: #0051a5;
        }

        .posts-container {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        /* Update the .post-card style */
        .post-card {
          background: white;
          border: 1px solid #e1e5e9;
          border-radius: 8px;
          padding: 25px; /* Adjust padding as needed */
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s, box-shadow 0.2s;
          display: flex; /* Add flexbox to align items horizontally */
          gap: 20px; /* Space between thumbnail and text */
        }

        /* Add styles for the thumbnail container */
        .post-thumbnail {
          width: 200px; /* Set a fixed width for the thumbnail */
          height: 150px; /* Set a fixed height */
          flex-shrink: 0; /* Prevents the image from shrinking on smaller screens */
          overflow: hidden;
          border-radius: 6px;
        }

        /* Add styles for the image itself */
        .post-thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover; /* Ensures the image fills the container without distortion */
          transition: transform 0.3s ease;
        }

        /* Add a subtle hover effect for the image */
        .post-card:hover .post-thumbnail img {
          transform: scale(1.05);
        }

        /* Add a style for the text container */
        .post-details {
          flex-grow: 1; /* Allows the details section to take up the remaining space */
        }

        .post-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }

        .post-title {
          margin: 0 0 15px 0;
          font-size: 1.4rem;
          font-weight: 600;
          line-height: 1.3;
        }

        .post-title a {
          color: #1a1a1a;
          text-decoration: none;
        }

        .post-title a:hover {
          color: #0070f3;
        }

        .post-meta {
          display: flex;
          gap: 15px;
          margin-bottom: 15px;
          font-size: 0.9rem;
          color: #666;
        }

        .post-snippet {
          margin: 0 0 15px 0;
          color: #555;
          line-height: 1.6;
        }

        .read-more {
          color: #0070f3;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.9rem;
        }

        .read-more:hover {
          text-decoration: underline;
        }

        .loading, .error {
          text-align: center;
          padding: 40px;
          font-size: 1.1rem;
        }

        .error {
          color: #d93025;
          background: #fce8e6;
          border: 1px solid #d93025;
          border-radius: 5px;
          margin-bottom: 20px;
        }

        @media (max-width: 768px) {
          .container {
            padding: 15px;
          }
          
          .header h1 {
            font-size: 2rem;
          }
          
          .post-content {
            flex-direction: column;
          }
          
          .post-thumbnail {
            width: 100%;
            height: 200px;
          }
          
          .post-details {
            padding: 20px;
          }
          
          .post-meta {
            flex-direction: column;
            gap: 5px;
          }
        }
      `}</style>
    </main>
  );
}