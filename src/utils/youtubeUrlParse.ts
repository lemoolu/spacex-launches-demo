/**
 * parse url to youtube can play
 * @param url string
 * @returns string
 */
export default function (url?: string) {
  if (!url) {
    return null;
  }
  if (url.includes('youtu.be')) {
    return url.replace('https://youtu.be/', 'https://www.youtube.com/embed/');
  }
  if (url.includes('www.youtube.com')) {
    return url.replace(
      'https://www.youtube.com/watch?v=',
      'https://www.youtube.com/embed/',
    );
  }
}
