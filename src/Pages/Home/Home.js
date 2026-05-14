import React, { useEffect, useRef, useState } from 'react'
import Header from '../../Components/Header/Header';
import Banner from '../../Components/Banner/Banner';
import Footer from '../../Components/Footer/Footer';
import RowList from '../../Components/Rows/RowList/RowList';
import Search from '../../Components/Search/Search';
import TrailerSection from '../../Components/TrailerSection/TrailerSection';


const Home = () => {
  const [activeTrailer, setActiveTrailer] = useState(null);
  const trailerRef = useRef(null);

  const handleTrailerSelect = (trailer) => {
    setActiveTrailer(trailer);
  };

  const handleCloseTrailer = () => {
    setActiveTrailer(null);
  };

  useEffect(() => {
    if (activeTrailer && trailerRef.current) {
      trailerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [activeTrailer]);

  return (
    <>
        <Header/>
        <Search onTrailerSelect={handleTrailerSelect} />
        <Banner/>
        <RowList onTrailerSelect={handleTrailerSelect} />
        {activeTrailer && (
          <div ref={trailerRef}>
            <TrailerSection trailer={activeTrailer} onClose={handleCloseTrailer} />
          </div>
        )}
        <Footer/>
    </>
  )
}
export default Home;