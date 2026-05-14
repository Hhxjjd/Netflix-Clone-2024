import React from 'react'
import Row from '../Row/Row'
import requests from '../../../Utils/requests'

const RowList = ({ onTrailerSelect }) => {
    return (
        <>
            <Row 
                title="NETFLIX ORIGINALS"
                fetchUrl={requests.fetchNetflixOriginals}
                isLargeRow={true}
                onTrailerSelect={onTrailerSelect}
            />
            <Row title="Trending Now" fetchUrl={requests.fetchTrending} onTrailerSelect={onTrailerSelect} />

            <Row title="Top Rated" fetchUrl={requests.fetchTopRated} onTrailerSelect={onTrailerSelect} />
            <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} onTrailerSelect={onTrailerSelect} />
             <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} onTrailerSelect={onTrailerSelect} />
              <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} onTrailerSelect={onTrailerSelect} />
               <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} onTrailerSelect={onTrailerSelect} />
                <Row title="Tv Shows" fetchUrl={requests.fetchTvShow} onTrailerSelect={onTrailerSelect} />
                 <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} onTrailerSelect={onTrailerSelect} />
        </>
    )
}

export default RowList