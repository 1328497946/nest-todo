import { ormConfig } from './database.config';

export default () => ({
  port: 3000,
  environment: 'development',
  database: ormConfig,
});
