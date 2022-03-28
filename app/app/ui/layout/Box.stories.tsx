import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Button, Card, Link } from '../button';
import { Checkbox, Input, Option, Radio, Select, Slider } from '../form';
import { ArrowDown, Box } from '../index';
import { Item, List } from '../list';
import { Menu } from '../modal';
import { Body } from './Body';
import { Footer } from './Footer';
import { Header } from './Header';
import { Main } from './Main';
import { Nav } from './Nav';

const Story: ComponentMeta<typeof Box> = {
  title: 'Layout/Box',
  component: Box,
};

export default Story;

const Template: ComponentStory<typeof Box> = (args) => {
  return (
    <Body>
      <Header>
        <h3 className='pl-40 text-lg flex-1'>Dinery</h3>
        <Menu direction='left' trigger='hover' Label={<Button iconLeft={<ArrowDown />}>Login</Button>}>
          <Item>item 1</Item>
          <Item>item 2</Item>
        </Menu>
        <Link href='/test'>Login</Link>
      </Header>
      <Main className='flex justify-between'>
        <Nav>
          <List>
            <Card
              Icon={<ArrowDown />}
              title='Suivez vos cuisinier préférés'
              subtitle='Trouvez les recettes du jour de vos idoles et refaites chez vous les menu de la semaine de vos restaurant preférés'
            />
            <Item>item 2</Item>
            <Item active>item 3</Item>
            <Item>item 4</Item>
            <Item>item 5</Item>
          </List>
        </Nav>
        <section className='p-4 max-w-2xl bg-blue-300 flex-1 flex flex-col'>
          <Input />
          <Select>
            <Option>Hello</Option>
            <Option>Hello 1</Option>
            <Option>Hello 2</Option>
          </Select>

          <Slider />
          <Radio name='hello'>Hello</Radio>
          <Radio name='hello'>Hello</Radio>
          <Checkbox>Hello</Checkbox>
          <Checkbox>Hello</Checkbox>
          <Checkbox>Hello</Checkbox>
          {/* <Switch /> */}
        </section>
        <Nav>
          <Input />
        </Nav>
      </Main>
      <Footer>
        <div>Hello</div>
        <div>Hello</div>
      </Footer>
    </Body>
  );
};

export const blue = Template.bind({});
