import Text from './Text';
import { ParagraphBlock } from './types/blocks';
import useStyleColor from './useStyleColor';

export default function Paragraph({ color, rich_text }: ParagraphBlock['paragraph']) {
  const style = useStyleColor(color);
  return (
    <p className='pb-2 text-justify' style={style}>
      {rich_text.map((text, i) => (
        <Text key={i} {...text} />
      ))}
    </p>
  );
}
