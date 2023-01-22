import { DataSource, DataSourceOptions } from 'typeorm';

export const connectionOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '',
  database: 'simple_budget',
};

export const AppDataSource = new DataSource({
  ...connectionOptions,
  migrations: ['./src/migrations/*'],
});
