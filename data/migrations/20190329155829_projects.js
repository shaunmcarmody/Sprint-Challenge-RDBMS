
exports.up = knex => (
  knex.schema
    .createTable('projects', tbl => {
      tbl.increments();

      tbl
        .string('name', 128)
        .notNullable()
        .unique();

      tbl
        .string('description')

      tbl
        .boolean('completed')
        .notNullable();
    })
)

exports.down = knex => knex.schema.dropTableIfExists('projects');
