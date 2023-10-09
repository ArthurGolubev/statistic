import * as ReactDOM from "react-dom/client"
import * as React from 'react'
import { App } from './App'
import { HashRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { MathJaxContext } from 'better-react-mathjax'



const root = ReactDOM.createRoot(document.querySelector("#root"))


root.render(
    <HashRouter>
        <MathJaxContext>
            <App />
        </MathJaxContext>
    </HashRouter>
)

