# Medium RSS Reader

A lightweight Next.js project that fetches the latest articles from a Medium user's RSS feed.

## Features

  - 🚀 **Extremely Lightweight:** Depends only on essential packages.
  - 📱 **Responsive Design:** Optimized for both desktop and mobile devices.
  - 🔄 **Real-time Refresh:** Includes a real-time refresh function.
  - 🌐 **One-Click Vercel Deployment:** Easily deploy with Vercel.
  - ⚙️ **Environment Variable Configuration:** Flexible setup using environment variables.

-----

## Environment Variables

Configure the following environment variables in your Vercel project settings or in a local `.env.local` file.

```bash
MEDIUM_USERNAME=jielim36     # Your Medium username (without the @ symbol)
FEED_COUNT=5                 # The number of articles to fetch
```

-----

## Local Development

1.  **Install dependencies:**

    ```bash
    npm install
    ```

2.  **Create a `.env.local` file** and add your environment variables:

    ```bash
    MEDIUM_USERNAME=jielim36
    FEED_COUNT=5
    ```

3.  **Start the development server:**

    ```bash
    npm run dev
    ```

4.  Open your browser and visit `http://localhost:3000`.

-----

## Vercel Deployment

1.  Push your code to a GitHub repository.
2.  Import the project into Vercel.
3.  In the project settings, navigate to **Environment Variables** and set:
      - `MEDIUM_USERNAME`: Your Medium username (e.g., `jielim36`).
      - `FEED_COUNT`: The number of articles (e.g., `5`).
4.  Click **Deploy**.

-----

## RSS Feed

The project uses Medium's official RSS feed format: `https://medium.com/feed/@{username}`.
