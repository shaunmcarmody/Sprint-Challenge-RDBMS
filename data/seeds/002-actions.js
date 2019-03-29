exports.seed = knex => (
  knex('actions').insert([
    {
      description: 'Read the readme',
      notes: 'on github',
      completed: false,
      project_id: 1
    }
  ])
);