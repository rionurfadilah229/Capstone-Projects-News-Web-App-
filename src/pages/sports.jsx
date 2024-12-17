import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addSavedStory } from '../store/savedsclice';
import 'bootstrap/dist/css/bootstrap.min.css';

const Sports = () => {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    const API_KEY = 'vxZ0by7mnD926o5GsLUCZsAPBXXflAHJ';
    const API_URL = `https://api.nytimes.com/svc/topstories/v2/sports.json?api-key=${API_KEY}`;

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                const transformedStories = data.results.map((story, index) => ({
                    id: `story_${index}`,
                    title: story.title,
                    abstract: story.abstract || 'No description available',
                    url: story.url,
                    publishDate: story.published_date,
                    multimedia: story.multimedia || [],
                }));

                setStories(transformedStories);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching top stories:', error);
                setLoading(false);
            }
        };

        fetchStories();
    }, []);

    const handleSaveStory = (story) => {
        dispatch(addSavedStory(story));
    };

    if (loading) {
        return (
            <div className="container text-center p-4">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-0 pt-0">
            <h2 className="text-center mb-2 fw-bold">Sports News</h2>
            <hr className="border-dark border-2 mb-4" />

            <div className="row">
                {stories.map((story) => (
                    <div key={story.id} className="col-md-4 mb-4">
                        <div className="card h-100">
                            {story.multimedia.length > 0 ? (
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
                                <p className="card-text text-truncate flex-grow-1">{story.abstract}</p>
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

export default Sports;
