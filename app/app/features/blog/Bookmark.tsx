import { BookmarkBlock } from './types/blocks';

export default function Bookmark({ url }: BookmarkBlock['bookmark']) {
  return (
    <a className='text-blue-500 pb-4' href={url}>
      {url}
    </a>
  );
}
