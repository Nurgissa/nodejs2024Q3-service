import * as process from 'node:process';

export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'BjsBeL3KNN0aWyhaqgWwkk7ggpwRZ4n4zL1KNNpN',
  refreshSecret:
    process.env.JWT_REFRESH_SECRET ||
    'XwFeLtQbu6hzZePLDeozB3s7Uq0Hy3TJ26UBQ66T',
  tokenExpireTime: process.env.JWT_REFRESH_TOKEN_EXPIRE || '1h',
  refreshTokenExpireTime: process.env.JWT_REFRESH_TOKEN_EXPIRE || '24h',
  cryptSalt: process.env.CRYPT_SALT || '10',
};
