import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.post('/api/v1/user/signup', async (c) => {

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
