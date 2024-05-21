import { createBlogInput, updateBlogInput } from "@kiranacd/medium-common";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";


export const blogRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string,
      SECRET: string,
    },
    Variables: {
        userId: string,
    }
}>();

blogRouter.use("/*", async (c, next) => {
    
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
    
})

blogRouter.post('/', async (c) => {

    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL
      }).$extends(withAccelerate());

    const {success} = createBlogInput.safeParse(body);

    if (!success) {
        c.status(411);
        return c.json({
            error: "Incorrect inputs",
        });
    }
    
    const authorId = c.get("userId");
    const blog = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: authorId,
            publishedOn: new Date(),
        }
    })

    return c.json({
        id: blog.id,
    });
})

blogRouter.put("/", async (c) => {

    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL
      }).$extends(withAccelerate());
    
    const {success} = updateBlogInput.safeParse(body);

    if (!success) {
        c.status(411);
        return c.json({
            error: "Incorrect inputs",
        });
    }
    
    const blog = await prisma.post.update({
        where: {
            id: body.id,
        },
        data: {
            title: body.title,
            content: body.content,
        }
    })

    return c.text("Hello hono!");
})

blogRouter.get("/bulk", async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL
    }).$extends(withAccelerate());

    try {
        const blogs = await prisma.post.findMany({
            select: {
                content: true,
                title: true,
                id: true,
                publishedOn: true,
                author: {
                    select: {
                        name: true,
                        tagline: true,
                    }
                }
            }
        });

        return c.json({
            blogs
        });
    } catch (err) {
        c.status(404);
        return c.json({
            error: "Blogs not found",
        })
    }
})

blogRouter.get("/:id", async (c) => {

    const id = c.req.param('id');
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL
    }).$extends(withAccelerate());

    try {
        const blog = await prisma.post.findFirst({
            where: {
                id: id,
            },
            select: {
                id: true,
                title: true,
                content: true,
                publishedOn: true,
                author: {
                    select: {
                        name: true,
                    }
                }
            }
        });

        return c.json({
            blog
        });
    } catch (err) {
        c.status(411);
        return c.json({
            message: "Error fetching post",
        })
    }
})



