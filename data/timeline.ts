export type Task = {
  id: string;
  title: string;
};

export type Category = {
  id: string;
  title: string;
  tasks: Task[];
};

export type Stage = {
  id: string;
  title: string;
  categories: Category[];
};

export const timeline: Stage[] = [
  {
    id: 'stage-1',
    title: 'Stage 1',
    categories: [
      {
        id: 'stage-1-category-1',
        title: 'Category 1.1',
        tasks: [
          { id: 's1-c1-t1', title: 'Task 1' },
          { id: 's1-c1-t2', title: 'Task 2' },
          { id: 's1-c1-t3', title: 'Task 3' },
          { id: 's1-c1-t4', title: 'Task 4' },
          { id: 's1-c1-t5', title: 'Task 5' },
        ],
      },
      {
        id: 'stage-1-category-2',
        title: 'Category 1.2',
        tasks: [
          { id: 's1-c2-t1', title: 'Task 1' },
          { id: 's1-c2-t2', title: 'Task 2' },
          { id: 's1-c2-t3', title: 'Task 3' },
          { id: 's1-c2-t4', title: 'Task 4' },
          { id: 's1-c2-t5', title: 'Task 5' },
        ],
      },
      {
        id: 'stage-1-category-3',
        title: 'Category 1.3',
        tasks: [
          { id: 's1-c3-t1', title: 'Task 1' },
          { id: 's1-c3-t2', title: 'Task 2' },
          { id: 's1-c3-t3', title: 'Task 3' },
          { id: 's1-c3-t4', title: 'Task 4' },
          { id: 's1-c3-t5', title: 'Task 5' },
        ],
      },
      {
        id: 'stage-1-category-4',
        title: 'Category 1.4',
        tasks: [
          { id: 's1-c4-t1', title: 'Task 1' },
          { id: 's1-c4-t2', title: 'Task 2' },
          { id: 's1-c4-t3', title: 'Task 3' },
          { id: 's1-c4-t4', title: 'Task 4' },
          { id: 's1-c4-t5', title: 'Task 5' },
        ],
      },
    ],
  },

  {
    id: 'stage-2',
    title: 'Stage 2',
    categories: [
      {
        id: 'stage-2-category-1',
        title: 'Category 2.1',
        tasks: [
          { id: 's2-c1-t1', title: 'Task 1' },
          { id: 's2-c1-t2', title: 'Task 2' },
          { id: 's2-c1-t3', title: 'Task 3' },
          { id: 's2-c1-t4', title: 'Task 4' },
          { id: 's2-c1-t5', title: 'Task 5' },
        ],
      },
      {
        id: 'stage-2-category-2',
        title: 'Category 2.2',
        tasks: [
          { id: 's2-c2-t1', title: 'Task 1' },
          { id: 's2-c2-t2', title: 'Task 2' },
          { id: 's2-c2-t3', title: 'Task 3' },
          { id: 's2-c2-t4', title: 'Task 4' },
          { id: 's2-c2-t5', title: 'Task 5' },
        ],
      },
      {
        id: 'stage-2-category-3',
        title: 'Category 2.3',
        tasks: [
          { id: 's2-c3-t1', title: 'Task 1' },
          { id: 's2-c3-t2', title: 'Task 2' },
          { id: 's2-c3-t3', title: 'Task 3' },
          { id: 's2-c3-t4', title: 'Task 4' },
          { id: 's2-c3-t5', title: 'Task 5' },
        ],
      },
      {
        id: 'stage-2-category-4',
        title: 'Category 2.4',
        tasks: [
          { id: 's2-c4-t1', title: 'Task 1' },
          { id: 's2-c4-t2', title: 'Task 2' },
          { id: 's2-c4-t3', title: 'Task 3' },
          { id: 's2-c4-t4', title: 'Task 4' },
          { id: 's2-c4-t5', title: 'Task 5' },
        ],
      },
    ],
  },

  {
    id: 'stage-3',
    title: 'Stage 3',
    categories: [
      {
        id: 'stage-3-category-1',
        title: 'Category 3.1',
        tasks: [
          { id: 's3-c1-t1', title: 'Task 1' },
          { id: 's3-c1-t2', title: 'Task 2' },
          { id: 's3-c1-t3', title: 'Task 3' },
          { id: 's3-c1-t4', title: 'Task 4' },
          { id: 's3-c1-t5', title: 'Task 5' },
        ],
      },
      {
        id: 'stage-3-category-2',
        title: 'Category 3.2',
        tasks: [
          { id: 's3-c2-t1', title: 'Task 1' },
          { id: 's3-c2-t2', title: 'Task 2' },
          { id: 's3-c2-t3', title: 'Task 3' },
          { id: 's3-c2-t4', title: 'Task 4' },
          { id: 's3-c2-t5', title: 'Task 5' },
        ],
      },
      {
        id: 'stage-3-category-3',
        title: 'Category 3.3',
        tasks: [
          { id: 's3-c3-t1', title: 'Task 1' },
          { id: 's3-c3-t2', title: 'Task 2' },
          { id: 's3-c3-t3', title: 'Task 3' },
          { id: 's3-c3-t4', title: 'Task 4' },
          { id: 's3-c3-t5', title: 'Task 5' },
        ],
      },
      {
        id: 'stage-3-category-4',
        title: 'Category 3.4',
        tasks: [
          { id: 's3-c4-t1', title: 'Task 1' },
          { id: 's3-c4-t2', title: 'Task 2' },
          { id: 's3-c4-t3', title: 'Task 3' },
          { id: 's3-c4-t4', title: 'Task 4' },
          { id: 's3-c4-t5', title: 'Task 5' },
        ],
      },
    ],
  },
];