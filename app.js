require('dotenv').config()

const {ApolloServer} = require('apollo-server-express')
const express = require ('express')
const {typeDefs} = require('./typeDefs')
const {resolvers} = require('./resolvers')
const {connectDB} = require('./db')


const app = express()
connectDB()

app.get('/', (req,res) => res.send('Welcome to my API'))




require('./typeDefs')

module.exports = app 

async function start (){

    const apolloServer =  new ApolloServer({
        typeDefs,
        resolvers
    })

    await apolloServer.start()

    apolloServer.applyMiddleware({app})

    app.use('*', (req, res) => res.status(404).send('NOT FOUND'))


    app.listen(process.env.PORT, () => {
        console.log('server on port :',process.env.PORT)
    })
}

start()