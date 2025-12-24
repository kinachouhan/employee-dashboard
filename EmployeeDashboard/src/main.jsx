import {BrowserRouter , Route , Routes} from "react-router-dom"
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { HighlightPage } from "./pages/HighlightPage.jsx"


createRoot(document.getElementById('root')).render(
   <Provider store={store}>
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<App />} />
            <Route path="/highlight" element={<HighlightPage />} />
         </Routes>
      </BrowserRouter>
   </Provider>

)
