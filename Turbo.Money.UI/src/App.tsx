import React from 'react'
import { BrowserRouter as Router } from "react-router-dom";

import Header from './components/Header';
import NavBar from './components/NavBar';
import Content from './components/Content';
import Footer from './components/Footer';


function App() {
    return (
        <Router>
            <Header />
            <NavBar />
            <Content />
            <Footer />
        </Router>
    );
}

export default App;