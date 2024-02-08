import React from 'react'
import { BrowserRouter as Router } from "react-router-dom";

import Header from './components/Header';
import NavData from './NavData';
import NavBar from './components/NavBar';
import Content from './components/Content';
import Footer from './components/Footer';


function App() {
    return (
        <Router>
            <Header />
            <NavBar navData={NavData()} />
            <Content navData={NavData()} />
            <Footer />
        </Router>
    );
}

export default App;