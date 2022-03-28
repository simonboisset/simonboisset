import HeadingLink from './HeadingLink';
import Text from './Text';
import { Heading1Block } from './types/blocks';
import useStyleColor from './useStyleColor';

export type H1Props = {
  id: string;
} & Heading1Block['heading_1'];

export default function H1({ id, color, rich_text }: H1Props) {
  const style = useStyleColor(color);
  return (
    <h2 id={`id-${id}`} className='text-3xl font-bold pt-2 pb-4 scroll-mt-16' style={style}>
      {rich_text.map((text, i) => (
        <Text key={i} {...text} />
      ))}
      <HeadingLink id={`id-${id}`} />
    </h2>
  );
}
