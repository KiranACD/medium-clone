import { signupInput } from '@kiranacd/medium-common';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono';
import { sign, verify } from 'hono/jwt';
import { hashPassword } from '../util/hashPassword';

export const userRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string,
      SECRET: string,
    },
    Variables: {
        userId: string,
    }
}>();

userRouter.use("/me", async (c, next) => {

    const authHeader = c.req.header("authorization") || "";
    const user = await verify(authHeader, c.env.SECRET);
    if (user) {
        c.set("userId", user.id);
        await next();
    } else {
        c.status(403);
        return c.json({
            error: "You are not logged in!",
        })
    }
    
});

userRouter.post('/signup', async (c) => {

    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL
    }).$extends(withAccelerate());
  
    const body = await c.req.json();
  
    const {success} = signupInput.safeParse(body);
  
    if(!success) {
      c.status(411);
      return c.json({
        error: "Incorrect Inputs"
      })
    }
  
    const userPassword = body.password;
  
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
  })
  
userRouter.post('/signin', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const {success} = signupInput.safeParse(body);

    if(!success) {
        c.status(411);
        return c.json({
        error: "Incorrect Inputs"
        })
    }

    const userPassword = body.password;

    if (!userPassword) {
        return c.json({error: "Incorrect Inputs"}, 411);
    }

    const hash = await hashPassword(userPassword);

    try {
        const user = await prisma.user.findFirst({
        where: {
            email: body.email,
            password: hash,
        }
        })

        if (!user) {
        c.status(403);
        return c.json({
            error: "Unauthorised"
        });
        }
        const jwt = await sign({id: user.id}, c.env.SECRET);
        return c.json({jwt});

    } catch (err) {
        c.status(411);
        return c.json({
        error: "User does not exist",
        });
    }
})

userRouter.get("/me", async (c) => {

    const authorId = c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL
    }).$extends(withAccelerate());

    const user = await prisma.user.findFirst({
        where: {
            id: authorId,
        },
        select: {
            name: true,
            email: true,
        }
    });

    return c.json({
        user
    });
})

