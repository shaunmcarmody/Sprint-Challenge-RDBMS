exports.seed = knex => (
  knex('projects').insert([
    {
      name: 'Complete sprint challenge',
      description: 'Lambda School on Friday',
      completed: 0
    },
    {
      name: 'Study algorithms',
      description: 'For computer science',
      completed: 0
    },
    {
      name: 'Do careers homework',
      description: 'Due Friday',
      completed: 0
    },
  ])
);