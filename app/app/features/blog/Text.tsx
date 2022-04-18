import { RichTextItemResponse } from './types';
import useStyleAnnotations from './useStyleAnnotations';

export default function Text({ annotations, plain_text }: RichTextItemResponse) {
  const style = useStyleAnnotations(annotations);
  return <span style={style}>{plain_text}</span>;
}
