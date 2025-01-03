import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: ['src/entities/**/*.ts'],
  logging: false,
  synchronize: true,
  migrations: []
};

export const PostgresDataSource = new DataSource(options);
