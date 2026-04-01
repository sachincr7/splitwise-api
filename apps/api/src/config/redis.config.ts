import { ConfigService } from '@nestjs/config';
import { CacheModuleOptions } from '@nestjs/cache-manager';
import KeyvRedis from '@keyv/redis';

export const redisConfig = (
  configService: ConfigService,
): CacheModuleOptions => {
  const redisUrl = configService.get<string>('redis.url');

  if (redisUrl) {
    return {
      stores: [new KeyvRedis(redisUrl)],
    };
  }

  const host = configService.get<string>('redis.host') ?? 'localhost';
  const port = configService.get<number>('redis.port') ?? 6379;
  const password = configService.get<string>('redis.password');

  return {
    stores: [new KeyvRedis(`redis://:${password}@${host}:${port}`)],
  };
};
