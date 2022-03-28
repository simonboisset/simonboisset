import { ComponentMeta, ComponentStory } from '@storybook/react';
import { FC } from 'react';
import * as icons from '.';

const Story: ComponentMeta<null> = {
  title: 'Icon',
};

export default Story;

export const Template: ComponentStory<null> = () => {
  return (
    <div className='flex flex-row space-x-2 flex-wrap'>
      {Object.values(icons).map((Icon: FC) => (
        <div className='w-8'>
          <Icon />
        </div>
      ))}
    </div>
  );
};
