"use strict"

import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { dbConnection } from "./mongo.js"
import authRoutes from "../src/auth/auth.routes.js"
import userRoutes from "../src/user/user.routes.js"
import categoryRoutes from "../src/category/category.routes.js"
import publicationRoutes from "../src/publication/publication.routes.js"
import commentRoutes from "../src/comment/comment.routes.js"
import apiLimiter from "../src/middlewares/rate-limit-validator.js"
import createAdminUser from "../src/auth/auth.controller.js"

const middlewares = (app) => {
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    app.use(cors())
    app.use(helmet())
    app.use(morgan("dev"))
    app.use(apiLimiter)
}

const routes = (app) =>{
    app.use("/opinionSystem/v1/auth", authRoutes)
    app.use("/opinionSystem/v1/user", userRoutes)
    app.use("/opinionSystem/v1/category", categoryRoutes)
    app.use("/opinionSystem/v1/publication", publicationRoutes)
    app.use("/opinionSystem/v1/comment", commentRoutes)
}


const conectarDB = async () => {
    try{
        await dbConnection()
    }catch(err){
        console.log(`Database connection failed: ${err}`)
    }
}

export const initServer = () => {
    const app = express()
    try{
        createAdminUser()
        middlewares(app)
        conectarDB()
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running on port ${process.env.PORT}`)
    }catch(err){
        console.log(`Server init failed: ${err}`)
    }
}