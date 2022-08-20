import ReactDOM from "react-dom/client"
import React from 'react'
import { HttpLink, ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { App } from './App'
import { HashRouter } from 'react-router-dom'
import * as bootstrap from 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { MathJaxContext } from 'better-react-mathjax'



const root = ReactDOM.createRoot(document.querySelector("#root"))

const createApolloClient = () => {
    const link = new HttpLink({
        uri: '/api/graphql'
    })

    return new ApolloClient({
        link,
        cache: new InMemoryCache()
    })
}



root.render(
    <ApolloProvider client={createApolloClient()}>
        <HashRouter>
            <MathJaxContext>
                <App />
            </MathJaxContext>
        </HashRouter>
    </ApolloProvider>
)

