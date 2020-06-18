const express = require("express")
const server = require("./api/server.js")
const accountsRouter = require("./api/accounts/accounts-router")

const PORT = process.env.PORT || 5000
//express
server.use(express.json())
//route
server.use("/api/accounts", accountsRouter)
//error handling
server.use((err, req, res, next) => {
  console.log(err)
  res.status(500).json({
    message: "Something went wrong, please try again later",
  })
})

server.listen(PORT, () => {
  console.log(`\n== API running on port ${PORT} ==\n`)
})
