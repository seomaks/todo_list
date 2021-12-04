import React, {useState} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task} from "../Task";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'TODOLISTS/Task',
  component: Task,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
args: {
  // changeTaskStatus: action('changeTaskStatus'),
  // changeTaskTitle: action('changeTaskTitle'),
  // removeTask: action('removeTask'),
}
} as ComponentMeta<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = () => {
  const [task, setTask] = useState({id: '122', isDone: true, title: 'JS'})
    const changeTaskStatus = () => setTask({id: '122', isDone: !task.isDone, title: 'JS'})

 return <Task
   changeTaskStatus = {changeTaskStatus}
   changeTaskTitle = {action('changeTaskTitle')}
   removeTask = {action('removeTask')}
   task={task}
   todolistId='1'
 />;
}

export const TaskIsDoneStory = Template.bind({});
TaskIsDoneStory.args = {}


