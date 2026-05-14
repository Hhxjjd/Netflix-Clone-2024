import React, { useEffect, useState } from 'react';
import "./row.css";
import axios from "../../../Utils/axios";
import MovieCard from "../../MovieCard/MovieCard";

const Row = ({ title, fetchUrl, isLargeRow, onTrailerSelect }) => {
    const [movies, setMovie] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const request = await axios.get(fetchUrl);
                setMovie(request.data.results);
            } catch (error) {
                console.log("error", error);
            }
        })();
    }, [fetchUrl]);

    return (
        <div className="row">
            <h1>{title}</h1>
            <div className="row_posters">
                {movies?.map((movie, index) => (
                    <div
                        key={index}
                        style={{
                            position: 'relative',
                            display: 'flex',
                            flexShrink: 0,
                            width: isLargeRow ? '180px' : '120px',
                            height: isLargeRow ? '270px' : '150px',
                        }}
                    >
                        <MovieCard movie={movie} isLargeRow={isLargeRow} onTrailerSelect={onTrailerSelect} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Row;