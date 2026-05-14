import React, { useState } from 'react';
import './movieCard.css';
import axios from '../../Utils/axios';
import movieTrailer from 'movie-trailer';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie, isLargeRow, onTrailerSelect }) => {
    const [showInfo, setShowInfo] = useState(false);
    const [trailerError, setTrailerError] = useState("");
    const navigate = useNavigate();
    const base_url = "https://image.tmdb.org/t/p/original";

    const getTrailerFromTMDB = async () => {
        const apiKey = process.env.REACT_APP_API_KEY;
        if (!apiKey) {
            return null;
        }

        const mediaType = movie?.media_type || (movie?.title ? 'movie' : 'tv');
        const endpoint = mediaType === 'movie' ? `/movie/${movie.id}/videos` : `/tv/${movie.id}/videos`;

        try {
            const response = await axios.get(`${endpoint}?api_key=${apiKey}&language=en-US`);
            const videos = response.data.results || [];
            const trailer = videos.find(v => v.type === 'Trailer' && v.site === 'YouTube');
            if (trailer) {
                return trailer.key;
            }

            const teaser = videos.find(v => v.type === 'Teaser' && v.site === 'YouTube');
            if (teaser) {
                return teaser.key;
            }

            return null;
        } catch (error) {
            console.log('TMDB video fetch error:', error);
            return null;
        }
    };

    const handlePlayTrailer = async (e) => {
        e.stopPropagation();
        setShowInfo(false);
        setTrailerError("");

        const tmdbTrailerKey = await getTrailerFromTMDB();
        if (tmdbTrailerKey) {
            onTrailerSelect?.({ videoId: tmdbTrailerKey, movie });
            setShowInfo(true);
            return;
        }

        const queryTitle = movie?.title || movie?.name || movie?.original_name || movie?.original_title || movie?.original_name;
        movieTrailer(queryTitle, { id: true })
            .then((result) => {
                if (!result) {
                    throw new Error('Trailer not found');
                }

                const trailerId = result.includes('youtube.com') || result.includes('youtu.be')
                    ? new URL(result).searchParams.get('v') || result.split('/').pop()
                    : result;

                onTrailerSelect?.({ videoId: trailerId, movie });
                setShowInfo(true);
            })
            .catch((error) => {
                console.log(error);
                setTrailerError('Trailer not found');
            });
    }

    const handleViewDetails = (e) => {
        e.stopPropagation();
        const mediaType = movie?.media_type || (movie?.title ? 'movie' : 'tv');
        navigate(`/movie/${movie?.id}/${mediaType}`);
    }

    const releaseYear = (movie?.release_date || movie?.first_air_date)?.split('-')[0];
    const rating = Math.round(movie?.vote_average * 10) / 10;

    return (
        <div className="movie-card-container">
            <img
                src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                alt={movie?.title || movie?.name}
                className="movie-card-image"
                title={movie?.title || movie?.name || movie?.original_name}
                onClick={handlePlayTrailer}
                style={{ cursor: 'pointer' }}
            />

            {trailerError && (
                <div className="trailer-error">{trailerError}</div>
            )}

            {showInfo && (
                <div className="movie-card-meta">
                    <h3>{movie?.title || movie?.name || movie?.original_name}</h3>

                    <div className="movie-card-info-below">
                        <div className="info-row">
                            <span className="label">Rating:</span>
                            <span className="rating">⭐ {rating}/10</span>
                        </div>
                        <div className="info-row">
                            <span className="label">Year:</span>
                            <span>{releaseYear}</span>
                        </div>
                    </div>

                    <p className="movie-card-overview">
                        {movie?.overview ? `${movie.overview.substring(0, 120)}...` : 'No description available.'}
                    </p>

                    <div className="movie-card-buttons">
                        <button className="btn-add" onClick={handleViewDetails}>
                            📄 Details
                        </button>
                        <button className="btn-like">
                            👍
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MovieCard;
