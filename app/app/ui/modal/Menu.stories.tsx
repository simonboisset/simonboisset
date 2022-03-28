import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../button';
import { IconButton } from '../button/IconButton';
import { ArrowDown } from '../icon';
import { Item } from '../list';
import { Menu } from './Menu';

const Story: ComponentMeta<typeof Menu> = {
  title: 'Modal/Menu',
  component: Menu,
};

export default Story;

const Template: ComponentStory<typeof Menu> = ({ direction, position, trigger }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className='h-screen flex flex-col justify-center w-screen items-center'>
      <Menu
        popperClassName='w-60'
        Label={<Button onClick={() => setOpen(true)}>Option</Button>}
        open={open}
        onClose={() => setOpen(false)}
        position={position}
        direction={direction}
        trigger={trigger}>
        <Item onClick={() => setOpen(false)}>Account settings</Item>
        <Item>Support</Item>
        <Item>License</Item>
      </Menu>
    </div>
  );
};

export const Hover = Template.bind({});
Hover.args = { position: 'bottom', direction: 'left', trigger: 'hover' };
export const LeftTop = Template.bind({});
LeftTop.args = { position: 'left', direction: 'top' };
export const LeftBottom = Template.bind({});
LeftBottom.args = { position: 'left', direction: 'bottom' };
export const RightTop = Template.bind({});
RightTop.args = { position: 'right', direction: 'top' };
export const RightBottom = Template.bind({});
RightBottom.args = { position: 'right', direction: 'bottom' };
export const TopLeft = Template.bind({});
TopLeft.args = { position: 'top', direction: 'left' };
export const TopRight = Template.bind({});
TopRight.args = { position: 'top', direction: 'right' };
export const BottomLeft = Template.bind({});
BottomLeft.args = { position: 'bottom', direction: 'left' };
export const BottomRight = Template.bind({});
BottomRight.args = { position: 'bottom', direction: 'right' };

// export const BottomCenter = Template.bind({});
// BottomCenter.args = { position: 'bottom', direction: 'center' };
// export const TopCenter = Template.bind({});
// TopCenter.args = { position: 'top', direction: 'center' };
// export const LeftCenter = Template.bind({});
// LeftCenter.args = { position: 'left', direction: 'center' };
// export const RightCenter = Template.bind({});
// RightCenter.args = { position: 'right', direction: 'center' };

const TemplateIcon: ComponentStory<typeof Menu> = ({ direction, position, trigger }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className='h-screen flex flex-col justify-center w-screen items-center'>
      <Menu
        Label={
          <IconButton onClick={() => setOpen(true)}>
            <ArrowDown />
          </IconButton>
        }
        open={open}
        onClose={() => setOpen(false)}
        position={position}
        direction={direction}
        trigger={trigger}>
        <Item onClick={() => setOpen(false)}>Account settings</Item>
        <Item>Support</Item>
        <Item>License</Item>
      </Menu>
    </div>
  );
};

export const Icon = TemplateIcon.bind({});
Icon.args = { position: 'bottom', direction: 'left', trigger: 'hover' };
export const IconClick = TemplateIcon.bind({});
IconClick.args = { position: 'bottom', direction: 'left', trigger: 'click' };
