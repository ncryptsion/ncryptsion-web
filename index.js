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

fastify.get("/api/reviews", (req, res) => {
    const reviews = require("./reviews.json")
    res.send(reviews)
})

fastify.get("/api/projects", (req, res) => {
    const projects = require("./projects.json")
    res.send(projects)
})

fastify.get("/api/experience/:slug", (req, res) => {
    // Variables
    const fs = require("fs")
    const slug = req.params.slug.replace(/[^a-z0-9\-_]/gi, "")
    const filePath = path.join(__dirname, "database", "experiences", `${slug}.md`)
    const content = fs.readFileSync(filePath, "utf8")
    
    // Core
    res.header("Content-Type", "text/plain; charset=utf-8")
    res.send(content)
})

fastify.setNotFoundHandler((req, res) => { res.redirect("/") })
fastify.listen({ port: port }, () => console.log(`Server is running. Port: ${port}`))