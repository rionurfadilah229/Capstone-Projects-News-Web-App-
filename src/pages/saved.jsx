import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeSavedStory } from '../store/savedsclice';
import 'bootstrap/dist/css/bootstrap.min.css';

const Saved = () => {
    const savedStories = useSelector((state) => state.saved.stories);
    const dispatch = useDispatch();

    const handleRemoveStory = (story) => {
        dispatch(removeSavedStory(story.id)); 
    };

    if (savedStories.length === 0) {
        return (
            <div className="container text-center p-4">
                <div className="alert alert-info">
                    No saved news.
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-0 pt-0">
            <h2 className="text-center mb-2 fw-bold">Your Saved News</h2>
            <hr className="border-dark border-2 mb-4" />
            <div className="row">
                {savedStories.map((story, index) => (
                    <div key={`saved_story_${index}`} className="col-md-4 mb-4">
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
                                    No Image
                                </div>
                            )}
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{story.title}</h5>
                                <p className="card-text text-truncate flex-grow-1">
                                    {story.abstract || 'No description available'}
                                </p>
                                <div className="d-flex justify-content-between align-items-center mt-auto">
                                    <small className="text-muted">
                                        {new Date(story.publishDate).toLocaleDateString()}
                                    </small>
                                    <div className="btn-group">
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleRemoveStory(story)} 
                                        >
                                            Remove
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

export default Saved;
