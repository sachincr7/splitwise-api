import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe, VersioningType } from '@nestjs/common';
import * as session from 'express-session';
import { RedisStore } from 'connect-redis';
import { createClient } from 'redis';
import { DataSource } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Create Redis client for session store
  const redisClient = createClient({
    url: process.env.REDIS_URL || `redis://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST || 'localhost'}:${process.env.REDIS_PORT || 6379}`,
  });
  await redisClient.connect();

  // Session configuration with Redis store
  app.use(session({
    store: new RedisStore({ client: redisClient, prefix: 'sess:' }),
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 600000, // 10 minutes
    },
  }));

  // CORS configuration
  app.enableCors({
    origin: process.env.FRONTEND_URL!,
    credentials: true,
  });

  // Global validation and serialization
  app.useGlobalPipes(new ValidationPipe());

  // Global serialization
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // API versioning
  app.enableVersioning({
    type: VersioningType.URI,
  });

  const port = process.env.PORT!;
  await app.listen(port);

  // Log connection status
  const dataSource = app.get(DataSource);
  const cacheManager = app.get<Cache>(CACHE_MANAGER);

  console.log(`\n🚀 API Server running on http://localhost:${port}`);
  console.log(`📊 Database: ${dataSource.isInitialized ? '✅ Connected' : '❌ Disconnected'}`);

  // Test Redis with a ping (with timeout)
  try {
    const timeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), 2000)
    );
    const pingTest = Promise.all([
      cacheManager.set('health-check', 'ok', 5000),
      cacheManager.get('health-check'),
    ]);
    const [, ping] = await Promise.race([pingTest, timeout]);
    console.log(`🔄 Redis Cache: ${ping === 'ok' ? '✅ Connected' : '⚠️ Unexpected response'}`);
  } catch (err) {
    console.log(`🔄 Redis Cache: ❌ ${err instanceof Error ? err.message : 'Failed'}`);
  }
}
bootstrap();
