import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './index.css'
import ExitPage from './pages/ExitPage.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App/>} />
        <Route path="/exit" element={<ExitPage/>} />
      </Routes>
    </Router>
  </React.StrictMode>,
)
