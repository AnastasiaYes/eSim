import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {App} from "./app/App.tsx"
import "@/app/styles/reset.css";
import "@/app/styles/main.css";
import {BrowserRouter} from "react-router-dom";


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </StrictMode>,
)
