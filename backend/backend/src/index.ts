import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono'
import { hashPassword } from './util/hashPassword';
import { sign } from 'hono/jwt';

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    SECRET: string,
  }
}>();


app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.post('/api/v1/user/signup', async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const userPassword = body.password;

  if (!userPassword) {
    return c.json({error: "Incorrect Inputs"}, 400);
  }

  const hash = await hashPassword(userPassword);

  const tag = body.tagline || "A hero was born";

  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: hash,
        name: body.name,
      }
    });

    const jwt = await sign({id: user.id}, c.env.SECRET);
    return c.json({jwt});

  } catch (err) {
    return c.json({error:"Incomplete Registration"}, 400);
  }
  return c.text('signup route');
})

app.post('/api/v1/user/signin', async (c) => {

  return c.text('signin route');
})

app.get('/api/v1/user/me', async (c) => {

  return c.text('user details route');
})

app.post('/api/v1/blog', async (c) => {
  
  return c.text('post blog route');
})

app.put('/api/v1/blog', async (c) => {

  return c.text('update blog route');
})

app.get('/api/v1/blog/bulk', async (c) => {

  return c.text("get all blogs");
})

app.get('./api/v1/blog/:id', async (c) => {

  const id = c.req.param('id');
  return c.text('get specific blog');
})

export default app
