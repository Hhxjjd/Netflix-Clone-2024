import React, { useEffect, useRef, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import Search from '../../Components/Search/Search';
import Footer from '../../Components/Footer/Footer';
import Row from '../../Components/Rows/Row/Row';
import TrailerSection from '../../Components/TrailerSection/TrailerSection';
import requests from '../../Utils/requests';
import './categoryPage.css';

const CategoryPage = () => {
    const { categoryName } = useParams();
    const category = categoryName?.toLowerCase();
    const [activeTrailer, setActiveTrailer] = useState(null);
    const trailerRef = useRef(null);

    let title = '';
    let rows = [];

    useEffect(() => {
        if (activeTrailer && trailerRef.current) {
            trailerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [activeTrailer]);

    const handleTrailerSelect = (trailer) => {
        setActiveTrailer(trailer);
    };

    const handleCloseTrailer = () => {
        setActiveTrailer(null);
    };

    switch (category) {
        case 'tvshows':
            title = 'TV Shows';
            rows = [
                { title: 'Netflix Originals', fetchUrl: requests.fetchNetflixOriginals, isLargeRow: true },
                { title: 'Trending TV', fetchUrl: requests.fetchTrendingTv },
                { title: 'Popular TV Shows', fetchUrl: requests.fetchTvShow },
            ];
            break;
        case 'movies':
            title = 'Movies';
            rows = [
                { title: 'Top Rated Movies', fetchUrl: requests.fetchTopRated },
                { title: 'Popular Movies', fetchUrl: requests.fetchPopularMovies },
                { title: 'Action Movies', fetchUrl: requests.fetchActionMovies },
                { title: 'Comedy Movies', fetchUrl: requests.fetchComedyMovies },
                { title: 'Horror Movies', fetchUrl: requests.fetchHorrorMovies },
                { title: 'Romance Movies', fetchUrl: requests.fetchRomanceMovies },
                { title: 'Documentaries', fetchUrl: requests.fetchDocumentaries },
            ];
            break;
        default:
            return <Navigate to="/" replace />;
    }

    return (
        <>
            <Header />
            <Search onTrailerSelect={handleTrailerSelect} />
            <main className="category-page">
                <section className="category-hero">
                    <div className="category-hero-content">
                        <h1>{title}</h1>
                        <p>Browse the best {title.toLowerCase()} curated by category.</p>
                    </div>
                </section>
                <section className="category-rows">
                    {rows.map((row, index) => (
                        <Row key={index} title={row.title} fetchUrl={row.fetchUrl} isLargeRow={row.isLargeRow} onTrailerSelect={handleTrailerSelect} />
                    ))}
                </section>
                {activeTrailer && (
                  <div ref={trailerRef}>
                    <TrailerSection trailer={activeTrailer} onClose={handleCloseTrailer} />
                  </div>
                )}
            </main>
            <Footer />
        </>
    );
};

export default CategoryPage;
