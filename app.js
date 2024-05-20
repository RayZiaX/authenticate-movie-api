require('dotenv').config()
const { middlewares } = require('./PresentationLayer/Middleware/index')
const { routes } = require('./PresentationLayer/Routes/index')
const express = require('express')
const app = express()
const port = process.env.PORT || 5002
const baseRouteApi = "/api"
const contextInstance = require('./DataAccessLayer/Contexts/MovieAuthContextInstance')

app.use(express.json())
app.use(middlewares.injectRepositories)
app.use(baseRouteApi,routes.accountRoute)
app.use(baseRouteApi,routes.authRoutes)

contextInstance.sync()
.then(() => {
})
.catch(error => {
  console.error(`Une erreur s'est produite lors de la synchronisation des modèles: ${error}`);
});

app.listen(port, ()=>{
    console.log(`l'api est lancée sur le port ${port}, à l'adresse suivante: http://localhost:${port}`)
})