# Neptune

Neptune is a React-based PWA created for a class project which utilizes Reddit's read-only JSON endpoints to display a generic post feed (r/popular), allow browsing of specific subreddits, interact with an individual post to view the attached media and comments, and query for posts by keyword.

## Features

- Browse posts from any subreddit
- View detailed post content, including media, self-text, links to external content (including galleries), and comments with visually nested replies
- Enter a subreddit name to browse the hot posts from that subreddit
- Search for posts or subreddits by keyword
- Media queries for a (mostly) responsive design to smaller viewports
- Client-side only upvote/downvote svgs that fill on click - the numbers are fuzzed anyway
- Custom service worker logic to cache pages and static assets

## Technologies Used

- React 18
- Redux Toolkit + RTK Query
- React Router v6
- Date-FNS for date formatting
- React Markdown for parsing markdown content
- React Player for embedding external videos (i.e. youtube)
- Cypress for end-to-end/integration testing
- Hosted on Netlify with CI/CD from the repo

## Obstacles

This is the first time I have created more than a SPA with React and my first time using Redux Toolkit + Query. There are many pieces that could still use polish which I may do in the future. 

The hardest part of development was knowing exactly what to test, when, and how. This is the first time I have implemented tests in a larger project, and I found that my tests would be based around something that would not stay consistent through continued development - it became difficult to decipher results as coming from the application itself. Considering the API logic with RTKQ becomes an implementation detail and every feature and component in some way has to do with these api interactions, I was not sure where/how to implement unit/component level tests in these situations. I ended up going with a fairly basic high-level test suite with Cypress, to ensure the overall features still work as expected through future development.

## Possible Future Additions

- Hamburger menu containing nav bar for smaller viewports
- Update the actual client side score for posts to gaslight users
- Comment form to add a comment only on client-side to a post, possibly integrate AI-generated haters?
- Infinite scrolling for posts and ability to load more replies for comments
- Features using OAuth

## Deployments

Deployed on Netlify with CI/CD integrated to the github repo main branch