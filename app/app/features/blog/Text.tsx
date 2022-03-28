import { TextProps } from './types';
import useStyleAnnotations from './useStyleAnnotations';

export default function Text({ annotations, text: { content } }: TextProps) {
  const style = useStyleAnnotations(annotations);
  return <span style={style}>{content}</span>;
}
