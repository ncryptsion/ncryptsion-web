"use strict";

// Dependencies
const fastify = require("fastify")({ logger: false })
const fastifyStatic = require("@fastify/static")
const compress = require("@fastify/compress")
const helmet = require("@fastify/helmet")
const path = require("path")

// Variables
const port = process.env.PORT || 8080

// Configurations
//* Fastify
fastify.register(compress, { global: false, level: 1 })
fastify.register(helmet, { contentSecurityPolicy: false })

// Main
fastify.register(fastifyStatic, {
    root: path.join(__dirname, "public"),
    prefix: "/",
    decorateReply: false,
    extensions: ["html"]
})
fastify.setNotFoundHandler((req, res)=>{res.redirect("/")})
fastify.listen({ port: port }, ()=>console.log(`Server is running. Port: ${port}`))