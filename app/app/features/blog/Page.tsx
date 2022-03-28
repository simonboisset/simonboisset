import dayjs from 'dayjs';
import Block from './Block';
import { BlockObjectResponse } from './types';

type PageProps = {
  title: string;
  createdAt: string;
  blocks: BlockObjectResponse[];
};

export default function Page({ blocks, createdAt, title }: PageProps) {
  const formatedCreatedAt = dayjs(createdAt).format('DD-MM-YYYY');
  return (
    <div className='py-12 flex flex-col space-y-0'>
      <h1 className='text-4xl font-bold pb-6'>{title}</h1>
      <p className='text-slate-500 text-sm pb-8'>{formatedCreatedAt}</p>
      {blocks.map((props) => (
        <Block key={props.id} {...props} />
      ))}
    </div>
  );
}
