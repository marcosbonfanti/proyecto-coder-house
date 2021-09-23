import knex from 'knex';

export const mySQLDB = knex({
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: 'mypass',
      database: 'productos',
    },
    pool: { min: 0, max: 7 },
  });


