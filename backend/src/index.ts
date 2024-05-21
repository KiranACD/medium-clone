import { Hono } from 'hono'
import { cors } from 'hono/cors';
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    SECRET: string,
  }
}>();

app.use('/api/*', cors());

app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);


app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app;
