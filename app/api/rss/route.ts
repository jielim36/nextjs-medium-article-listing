import Parser from 'rss-parser';
import { NextResponse } from 'next/server';

const parser = new Parser();

export async function GET() {
  try {
    const username = process.env.MEDIUM_USERNAME;
    const feedCount = parseInt(process.env.FEED_COUNT || '5');
    
    const rssUrl = `https://medium.com/feed/@${username}`;
    const feed = await parser.parseURL(rssUrl);
    
    // Debug: Log first item structure (only in development)
    if (process.env.NODE_ENV === 'development' && feed.items.length > 0) {
      console.log('RSS Item structure:', {
        keys: Object.keys(feed.items[0]),
        content: feed.items[0].content ? 'has content' : 'no content',
        'content:encoded': feed.items[0]['content:encoded'] ? 'has content:encoded' : 'no content:encoded',
        description: feed.items[0].description ? 'has description' : 'no description'
      });
    }
    
    const posts = feed.items.slice(0, feedCount).map(item => {
  // Extract image from content:encoded
  let thumbnail = null;
  // Use 'content:encoded' as 'content' is often empty
  const contentToSearch = item['content:encoded'] || item.content;

  if (contentToSearch) {
    // Regex to find the first image URL in the content
    const imgMatch = contentToSearch.match(/<img[^>]+src="([^">]+)"/);
    if (imgMatch) {
      thumbnail = imgMatch[1];
    }
  }

  // Fallback to enclosure for image (if it exists)
  if (!thumbnail && item.enclosure && item.enclosure.url) {
    thumbnail = item.enclosure.url;
  }

  return {
    title: item.title,
    link: item.link,
    pubDate: item.pubDate,
    contentSnippet: item.contentSnippet?.substring(0, 150) + '...',
    creator: item.creator,
    thumbnail: thumbnail
  };
});

    return NextResponse.json({
      success: true,
      username,
      feedCount,
      posts
    });
  } catch (error) {
    console.error('Error fetching RSS:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch RSS feed'
    }, { status: 500 });
  }
}