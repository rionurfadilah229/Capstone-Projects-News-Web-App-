import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addSavedStory } from '../store/savedsclice';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState('');

    const API_KEY = 'vxZ0by7mnD926o5GsLUCZsAPBXXflAHJ';
    const API_URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';

    const handleSearch = async (e) => {
        e.preventDefault();
        
        if (!searchQuery.trim()) return;

        try {
            const response = await fetch(
                `${API_URL}?q=${encodeURIComponent(searchQuery)}&api-key=${API_KEY}`
            );
            const data = await response.json();
            
            const transformedResults = data.response.docs.map(article => ({
                id: article._id, 
                title: article.headline.main,
                abstract: article.abstract || article.snippet || 'No description available',
                url: article.web_url,
                publishDate: article.pub_date,
                multimedia: article.multimedia.length > 0 
                    ? [{ url: `https://www.nytimes.com/${article.multimedia[0].url}` }] 
                    : []
            }));

            
            if (transformedResults.length > 0) {
                dispatch(addSavedStory(transformedResults[0]));
            }

            navigate('/search', { 
                state: { 
                    results: transformedResults, 
                    query: searchQuery 
                } 
            });
        } catch (error) {
            console.error('Error searching articles:', error);
        }
    };

    return (
        <header className="bg-danger shadow-sm py-2 position-sticky top-0 z-3">
            <div className="container-fluid px-4">
                <div className="row align-items-center">
                    <div className="col-12 col-md-4 text-center mb-2 mb-md-0">
                        <div 
                            className="d-inline-block hover-scale" 
                            style={{ cursor: 'pointer', transition: 'transform 0.3s ease' }} 
                            onClick={() => navigate('/')}
                        >
                            <h1 className="m-0 fw-bold fs-4 text-white">Rio News</h1>
                            <p className="text-white-50 small m-0">Connecting You to the World</p>
                        </div>
                    </div>

                    <div className="col-12 col-md-8 d-flex justify-content-center justify-content-md-end">
                        <form onSubmit={handleSearch} className="w-100" style={{ maxWidth: '400px' }}>
                            <div className="input-group">
                                <input 
                                    type="search" 
                                    className="form-control" 
                                    placeholder="Search news, topics..." 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button 
                                    className="btn btn-outline-light d-flex align-items-center justify-content-center" 
                                    type="submit"
                                >
                                    <i className="bi bi-search"></i>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
