import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe, VersioningType } from '@nestjs/common';
import * as session from 'express-session';
import { DataSource } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 600000, // 10 minutes
    },
  }));

  app.enableCors({
    origin: process.env.FRONTEND_URL!,
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

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
    console.log('ping', ping);
    console.log(`🔄 Redis Cache: ${ping === 'ok' ? '✅ Connected' : '⚠️ Unexpected response'}`);
  } catch (err) {
    console.log(`🔄 Redis Cache: ❌ ${err instanceof Error ? err.message : 'Failed'}`);
  }
}
bootstrap();
