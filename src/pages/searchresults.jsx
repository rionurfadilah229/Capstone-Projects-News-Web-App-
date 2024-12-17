import React from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addSavedStory } from '../store/savedsclice';
import 'bootstrap/dist/css/bootstrap.min.css';

const SearchResults = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const { results, query } = location.state || { results: [], query: '' };

    const handleSaveStory = (story) => {
        dispatch(addSavedStory(story));
    };

    if (results.length === 0) {
        return (
            <div className="container text-center p-4">
                <div className="alert alert-info">
                    Tidak ada hasil yang ditemukan untuk "{query}"
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-1">
            <h2 className="text-center mb-2 fw-bold">{query} News</h2>
            <hr className="border-dark border-2 mb-4" />

            <div className="row">
                {results.map((story, index) => (
                    <div key={`story_${index}`} className="col-md-4 mb-4">
                        <div className="card h-100">
                            {story.multimedia && story.multimedia.length > 0 ? (
                                <img
                                    src={story.multimedia[0].url}
                                    alt={story.title}
                                    className="card-img-top"
                                    style={{ height: '200px', objectFit: 'cover' }}
                                />
                            ) : (
                                <div
                                    className="card-img-top bg-secondary text-white d-flex align-items-center justify-content-center"
                                    style={{ height: '200px' }}
                                >
                                    Tidak Ada Gambar
                                </div>
                            )}
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{story.title}</h5>
                                <p className="card-text text-truncate flex-grow-1">
                                    {story.abstract || 'Tidak ada deskripsi'}
                                </p>
                                <div className="d-flex justify-content-between align-items-center mt-auto">
                                    <small className="text-muted">
                                        {new Date(story.publishDate).toLocaleDateString()}
                                    </small>
                                    <div className="btn-group">
                                        <button
                                            className="btn btn-secondary btn-sm"
                                            onClick={() => handleSaveStory(story)}
                                        >
                                            Save
                                        </button>
                                        <a
                                            href={story.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-primary btn-sm"
                                        >
                                            Read More
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchResults;