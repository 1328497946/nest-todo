import { ormConfig } from './database.config';

export default () => ({
  port: 3000,
  environment: 'development',
  saltOrRounds: 10,
  database: ormConfig,
  accessTokenSecret:
    '0Wq/u0btfyE2joYV87PBDgNOalcZwsh9ysyEIDh2AsQVC1vact5e7Dmuqx3OxQVBZKcdi08f04S17T9XPG0GHjgvkwkJJ6D32hOUl6dwQQz0vP9d6EoFlMxmZusWkmqXPVd41/kY57mEYlJpn3QIlmb95Ela0eW6hlYb3Pt95o8ZfZHx4+fyVSaJDPXc4kuflPEJKex0pt1Fej91IAo13LRdrC+ic56JrKmttH7qpUEwHiek4XCo2U0qEZGBMyekZjv0gmifP0I4byc3xjXfgITlZwpOk6raYoy/eIrdYDycV4doGyrnUJs8Hm2LR43ORWTg7UNFvBX5E57M2XtV8g==',
  accessTokenExpired: '15m',
  refreshTokenSecret:
    'eJzpCxo+P5Rl4EyB33SLcNr0z6KmzxPAqE982s2qW+av4XscJKmWEkpdDmND67914/aZ6t3d3OwjaWS3exQkvGDQ6xLSP2uIk65bu1VgrUfJiOxIuWliNtGEaGPn6sJubK2Pk7iLt0E9Qrho5JEhh7eeKUU03RjKpfGJJ4NRmqS6vV5ouDUuCsbNFRYHgWYrAZsBSj8HfFqBuaW/b4Xkkj1DJjgovmKzReq1RVWmgMna0ATYQtnHAWFQ02qVEa/FR9W1v9KgtBQmZv3QjEG9Bcl1Xa1MC8f6y+tKV2s27/4atuBDWq1J8PsU18PyfOwRjjGZ07Y1JSofQlFHt6y1Lw==',
  refreshTokenExpired: '1y',
  redis_port: 6379,
  redis_addr: 'localhost',
});
