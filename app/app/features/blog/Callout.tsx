import Text from './Text';
import { CalloutBlock } from './types/blocks';
import useStyleColor from './useStyleColor';

export default function Callout({ color, rich_text, icon }: CalloutBlock['callout']) {
  const style = useStyleColor(color);
  return (
    <div className='py-2'>
      <p className='p-8 bg-blue-50 rounded-md flex flex-row items-center'>
        {icon?.type === 'emoji' && <span className='text-2xl mr-4'>{icon.emoji}</span>}
        <span className='text-justify' style={style}>
          {rich_text.map((text, i) => (
            <Text key={i} {...text} />
          ))}
        </span>
      </p>
    </div>
  );
}
