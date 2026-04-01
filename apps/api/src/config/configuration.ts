export default () => ({
  port: parseInt(process.env.PORT!, 10) || 3000,
  frontendUrl: process.env.FRONTEND_URL!,
  database: {
    host: process.env.DATABASE_HOST!,
    port: parseInt(process.env.DATABASE_PORT!, 10) || 5432,
    password: process.env.DATABASE_PASSWORD!,
    user: process.env.DATABASE_USER!,
    name: process.env.DATABASE_NAME!,
  },
  redis: {
    url: process.env.REDIS_URL,
    host: process.env.REDIS_HOST ?? 'localhost',
    port: parseInt(process.env.REDIS_PORT ?? '6379', 10),
    password: process.env.REDIS_PASSWORD,
  },
});
