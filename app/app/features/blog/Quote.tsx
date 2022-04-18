import Text from './Text';
import { QuoteBlock } from './types/blocks';
import useStyleColor from './useStyleColor';

export default function Quote({ color, rich_text }: QuoteBlock['quote']) {
  const style = useStyleColor(color);
  return (
    <div className='py-2'>
      <p className='border-l-4 border-blue-500 p-2 text-justify text-blue-500 italic' style={style}>
        {rich_text.map((text, i) => (
          <Text key={i} {...text} />
        ))}
      </p>
    </div>
  );
}
