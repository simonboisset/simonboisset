import HeadingLink from './HeadingLink';
import Text from './Text';
import { Heading2Block } from './types/blocks';
import useStyleColor from './useStyleColor';

export type H2Props = {
  id: string;
} & Heading2Block['heading_2'];

export default function H2({ id, color, rich_text }: H2Props) {
  const style = useStyleColor(color);
  return (
    <h3 id={`id-${id}`} className='text-2xl font-bold pt-2 pb-4 scroll-mt-16' style={style}>
      {rich_text.map((text, i) => (
        <Text key={i} {...text} />
      ))}
      <HeadingLink id={`id-${id}`} />
    </h3>
  );
}
