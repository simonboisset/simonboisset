import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../button';
import { Body } from '../layout';
import { Item } from '../list';
import { Dialog } from './Dialog';

const Story: ComponentMeta<typeof Dialog> = {
  title: 'Modal/Dialog',
  component: Dialog,
};

export default Story;

const Template: ComponentStory<typeof Dialog> = ({}) => {
  const [open, setOpen] = useState(false);
  return (
    <Body>
      <div>
        <Button onClick={() => setOpen(true)}>Open</Button>
        <Dialog open={open} onClose={() => setOpen(false)} className='max-w-md w-full'>
          <Item onClick={() => setOpen(false)}>Close</Item>
          <Item>Item 1</Item>
          <Item>Item 2</Item>
        </Dialog>
      </div>
    </Body>
  );
};

export const DialogExemple = Template.bind({});
