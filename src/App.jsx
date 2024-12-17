import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Navbar from './components/navbar';
import Home from './pages/home';
import Saved from './pages/saved';
import Sports from './pages/sports';
import Indonesia from './pages/indonesia';
import Programming from './pages/programming';
import SearchResults from './pages/searchresults';

const App = () => {
    return (
        <Router>
            <Header />
            <Navbar />
            <hr className="my-3 border-0 shadow-sm" />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/saved" element={<Saved />} />
                <Route path="/sports" element={<Sports />} />
                <Route path="/indonesia" element={<Indonesia />} />
                <Route path="/programming" element={<Programming />} />
                <Route path="/search" element={<SearchResults />} />
            </Routes>
        </Router>
    );
};

export default App;