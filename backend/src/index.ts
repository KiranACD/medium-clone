import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono'
import { hashPassword } from './util/hashPassword';
import { sign } from 'hono/jwt';
import { signupInput } from '@kiranacd/medium-common';
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    SECRET: string,
  }
}>();

app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);


app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app;
