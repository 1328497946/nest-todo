import { DataSource, DataSourceOptions } from 'typeorm';

/**
 * ormConfig去dist文件夹下查找entity，因为nestjs最终运行的是打包好的entity.js文件
 * ormConfigForCli则可以直接运行编写好的文件，因此会在源代码中查找entity.ts文件
 */

// 基础配置
const baseConfig: DataSourceOptions = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: 'Ywc1989@@',
  database: 'nest-todo',
  synchronize: false,
};

// 该对象用于 nestjs typeorm 初始化
export const ormConfig: DataSourceOptions = {
  ...baseConfig,
  entities: ['dist/**/entities/*.entity{.js,.ts}'],
  migrations: ['dist/src/migrations/*{.js,.ts}'],
  subscribers: ['dist/src/subscribers/*{.js,.ts}'],
};

// 该对象 typeorm cli 迁移时使用
const ormConfigForCli: DataSourceOptions = {
  ...baseConfig,
  entities: ['src/**/entities/*.entity{.js,.ts}'],
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
