import express, { Application } from "express"
import "./core/configEnv"
import http from "node:http"
import logger from "./core/logger"
import router from "./routers"
import ENV from "./core/ENV"
import dbConnect from "./utils/dbConnect"
import bodyParser from "body-parser"

;(async function () {
  const startTime = Date.now() // return milliseconds
  const app: Application = express()
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }))
  app.use(express.json({ limit: "50mb" }))
  router(app)
  await Promise.all([dbConnect()])

  http.createServer(app).listen(ENV.PORT, () => {
    logger("INFO", `Server running on port ${ENV.PORT}. http://127.0.0.1:${ENV.PORT}/`)
    logger("INFO", ENV.VERSION)

    const totalTime = Date.now() - startTime
    logger("SUCCESS", `Server starts up in ${totalTime}ms`)
  })
})()
