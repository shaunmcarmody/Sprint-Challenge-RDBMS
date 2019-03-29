
exports.up = knex => (
  knex.schema
    .createTable('actions', tbl => {
      tbl.increments();

      tbl
        .string('description')
        .notNullable()

      tbl
        .string('notes')

      tbl
        .boolean('completed')
        .notNullable()

      tbl
        .integer('project_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('projects')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
)

exports.down = knex => knex.schema.dropTableIfExists('actions');
