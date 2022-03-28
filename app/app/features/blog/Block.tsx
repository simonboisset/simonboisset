import Bookmark from './Bookmark';
import Callout from './Callout';
import Code from './Code';
import H1 from './H1';
import H2 from './H2';
import H3 from './H3';
import Paragraph from './Paragraph';
import Quote from './Quote';
import { BlockObjectResponse } from './types';

export default function Block({ id, ...props }: BlockObjectResponse) {
  switch (props.type) {
    case 'paragraph':
      return <Paragraph {...props.paragraph} />;
    case 'heading_1':
      return <H1 id={id} {...props.heading_1} />;
    case 'heading_2':
      return <H2 id={id} {...props.heading_2} />;
    case 'heading_3':
      return <H3 id={id} {...props.heading_3} />;
    case 'code':
      return <Code {...props.code} />;
    case 'quote':
      return <Quote {...props.quote} />;
    case 'bookmark':
      return <Bookmark {...props.bookmark} />;
    case 'callout':
      return <Callout {...props.callout} />;
  }
  return <div></div>;
}
