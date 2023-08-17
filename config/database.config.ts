import { DataSource, DataSourceOptions } from 'typeorm';

// 基础配置
const baseConfig: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3308,
  username: 'root',
  password: 'Ywc1989@@',
  database: 'nest-todo',
  synchronize: false,
};

// 该对象用于 nestjs typeorm 初始化
export const ormConfig: DataSourceOptions = {
  ...baseConfig,
  entities: ['dist/**/entity/*.entity{.js,.ts}'],
  migrations: ['dist/src/migrations/*{.js,.ts}'],
  subscribers: ['dist/src/subscribers/*{.js,.ts}'],
};

// 该对象 typeorm cli 迁移时使用
const ormConfigForCli: DataSourceOptions = {
  ...baseConfig,
  entities: ['src/**/entity/*.entity{.js,.ts}'],
  // migration:run时查找的文件夹
  migrations: ['src/migrations/*{.js,.ts}'],
  subscribers: ['src/subscribers/*{.js,.ts}'],
  // logger: 'file',
  // logging: true,
};

// 实例化dataSource，用以之后cli使用
const dataSource = new DataSource(ormConfigForCli);

// 此处的dataSource需要 export default才可以使用
export default dataSource;
