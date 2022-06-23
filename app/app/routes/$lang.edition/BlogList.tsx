import { Link } from '@remix-run/react';

type BlogListProps = {
  pages: { id: string; name: string; title: string }[];
};

export const BlogList = ({ pages }: BlogListProps) => {
  return (
    <nav className='flex-1 w-full max-w-xs hidden sm:flex flex-col space-y-2 py-4 px-12 '>
      {pages.map((page) => (
        <Link to={page.name} key={page.id} className='text-sm hover:text-blue-400'>
          {page.title}
        </Link>
      ))}
      <Link to='/fr/edition/new'>Add</Link>
    </nav>
  );
};
