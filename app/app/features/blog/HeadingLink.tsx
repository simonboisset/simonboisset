import { Link } from 'remix';

export type HeadingLinkProps = {
  id: string;
};

export default function HeadingLink({ id }: HeadingLinkProps) {
  return (
    <Link className='ml-2 opacity-0 hover:opacity-100 hover:text-blue-500 hover:underline' to={`#${id}`}>
      #
    </Link>
  );
}
