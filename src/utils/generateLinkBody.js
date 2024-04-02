export default function generateLinkBody(post) {
  if (post.is_self) {
    return post.selftext;
  }

  // Remove the domain extension from the URL
  const newsOutlet = post.domain.split('.')[0];
  newsOutlet.length < 4 ? newsOutlet.toUpperCase() : newsOutlet;
  return `${post.title} - ${newsOutlet}`;
}
