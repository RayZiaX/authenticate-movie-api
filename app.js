require('dotenv').config()
const { middlewares } = require('./PresentationLayer/Middleware/index')
const { routes } = require('./PresentationLayer/Routes/index')
const app = require('express')()
const port = process.env.PORT || 5002
const baseRouteApi = "/api"

app.use(middlewares.injectRepositories)
app.use(baseRouteApi,routes.userRoutes)

app.listen(port, ()=>{
    console.log(`l'api est lancée sur le port ${port}, à l'adresse suivante: http://localhost:${port}`)
})