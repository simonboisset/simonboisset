import HeadingLink from './HeadingLink';
import Text from './Text';
import { Heading3Block } from './types/blocks';
import useStyleColor from './useStyleColor';

export type H3Props = {
  id: string;
} & Heading3Block['heading_3'];

export default function H3({ id, color, rich_text }: H3Props) {
  const style = useStyleColor(color);
  return (
    <h4 id={`id-${id}`} className='text-xl font-semibold pt-1 pb-2 scroll-mt-16' style={style}>
      {rich_text.map((text, i) => (
        <Text key={i} {...text} />
      ))}
      <HeadingLink id={`id-${id}`} />
    </h4>
  );
}
