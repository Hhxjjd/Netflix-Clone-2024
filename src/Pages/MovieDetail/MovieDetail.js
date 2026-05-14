import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './movieDetail.css';
import axios from '../../Utils/axios';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const MovieDetail = () => {
    const { id, type } = useParams();
    const navigate = useNavigate();
    const [content, setContent] = useState(null);
    const [trailerUrl, setTrailerUrl] = useState("");
    const [loading, setLoading] = useState(true);
    const base_url = "https://image.tmdb.org/t/p/original";

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const endpoint = type === 'tv' ? `/tv/${id}` : `/movie/${id}`;
                const response = await axios.get(endpoint);
                setContent(response.data);
                setLoading(false);
            } catch (error) {
                console.log("Error fetching details:", error);
                setLoading(false);
            }
        };

        fetchDetails();
    }, [id, type]);

    const handlePlayTrailer = () => {
        if (!trailerUrl) {
            movieTrailer(content?.title || content?.name || content?.original_name)
                .then((url) => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get('v'));
                })
                .catch((error) => console.log(error));
        } else {
            setTrailerUrl("");
        }
    };

    const opts = {
        height: '500',
        width: "100%",
        playerVars: {
            autoplay: 1,
            controls: 1,
        },
    };

    if (loading) {
        return (
            <div className="detail-loading">
                <div className="spinner"></div>
                <p>Loading...</p>
            </div>
        );
    }

    if (!content) {
        return (
            <div className="detail-error">
                <h2>Content not found</h2>
                <button onClick={() => navigate('/')}>Back to Home</button>
            </div>
        );
    }

    const releaseDate = content?.release_date || content?.first_air_date;
    const rating = Math.round(content?.vote_average * 10) / 10;
    const genres = content?.genres?.map(g => g.name).join(', ');
    const runtime = content?.runtime ? `${content.runtime} min` : `${content?.number_of_seasons} Season${content?.number_of_seasons > 1 ? 's' : ''}`;

    return (
        <div className="movie-detail">
            <button className="back-btn" onClick={() => navigate('/')}>
                ← Back
            </button>

            {/* Banner/Backdrop */}
            <div 
                className="detail-banner"
                style={{
                    backgroundImage: `url("${base_url}${content?.backdrop_path}")`
                }}
            >
                <div className="detail-banner-overlay"></div>
            </div>

            {/* Content Container */}
            <div className="detail-content">
                <div className="detail-poster">
                    <img 
                        src={`${base_url}${content?.poster_path}`}
                        alt={content?.title || content?.name}
                    />
                </div>

                <div className="detail-info">
                    <h1>{content?.title || content?.name || content?.original_name}</h1>

                    <div className="detail-meta">
                        <span className="rating">⭐ {rating}/10</span>
                        <span className="divider">•</span>
                        <span className="year">{releaseDate?.split('-')[0]}</span>
                        <span className="divider">•</span>
                        <span className="runtime">{runtime}</span>
                        <span className="divider">•</span>
                        <span className="type">{type === 'tv' ? 'TV Series' : 'Movie'}</span>
                    </div>

                    {genres && (
                        <div className="detail-genres">
                            <strong>Genres:</strong> {genres}
                        </div>
                    )}

                    {content?.tagline && (
                        <p className="detail-tagline">"{content.tagline}"</p>
                    )}

                    <div className="detail-overview">
                        <h3>Overview</h3>
                        <p>{content?.overview}</p>
                    </div>

                    {content?.production_companies && content.production_companies.length > 0 && (
                        <div className="detail-companies">
                            <h3>Production</h3>
                            <p>{content.production_companies.map(c => c.name).join(', ')}</p>
                        </div>
                    )}

                    {content?.networks && content.networks.length > 0 && (
                        <div className="detail-networks">
                            <h3>Networks</h3>
                            <p>{content.networks.map(n => n.name).join(', ')}</p>
                        </div>
                    )}

                    {content?.created_by && content.created_by.length > 0 && (
                        <div className="detail-creators">
                            <h3>Created By</h3>
                            <p>{content.created_by.map(c => c.name).join(', ')}</p>
                        </div>
                    )}

                    <div className="detail-buttons">
                        <button className="btn-primary" onClick={handlePlayTrailer}>
                            ▶ {trailerUrl ? 'Close Trailer' : 'Watch Trailer'}
                        </button>
                        <button className="btn-secondary">
                            ➕ Add to List
                        </button>
                        <button className="btn-like">
                            👍
                        </button>
                    </div>
                </div>
            </div>

            {/* Trailer Section */}
            {trailerUrl && (
                <div className="trailer-section">
                    <h2>Trailer</h2>
                    <div className="trailer-player">
                        <YouTube videoId={trailerUrl} opts={opts} />
                    </div>
                </div>
            )}

            {/* Additional Info */}
            {content?.spoken_languages && (
                <div className="additional-info">
                    <div className="info-card">
                        <h4>Languages</h4>
                        <p>{content.spoken_languages.map(l => l.name).join(', ')}</p>
                    </div>

                    <div className="info-card">
                        <h4>Status</h4>
                        <p>{content?.status}</p>
                    </div>

                    {content?.budget > 0 && (
                        <div className="info-card">
                            <h4>Budget</h4>
                            <p>${(content.budget / 1000000).toFixed(1)}M</p>
                        </div>
                    )}

                    {content?.revenue > 0 && (
                        <div className="info-card">
                            <h4>Revenue</h4>
                            <p>${(content.revenue / 1000000).toFixed(1)}M</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default MovieDetail;
