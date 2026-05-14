import React from 'react';
import YouTube from 'react-youtube';
import './trailerSection.css';

const TrailerSection = ({ trailer, onClose }) => {
  if (!trailer || !trailer.videoId) return null;

  const opts = {
    height: '540',
    width: '100%',
    playerVars: {
      autoplay: 1,
      controls: 1,
    },
  };

  return (
    <section className="trailer-section" id="trailer-section">
      <div className="trailer-section-inner">
        <div className="trailer-header">
          <div>
            <span className="trailer-badge">NOW PLAYING</span>
            <h2>{trailer.movie?.title || trailer.movie?.name || trailer.movie?.original_name}</h2>
            {trailer.movie?.overview && (
              <p className="trailer-description">{trailer.movie.overview}</p>
            )}
          </div>
          <button className="trailer-close" onClick={onClose}>
            Close Trailer
          </button>
        </div>
        <div className="trailer-player">
          <YouTube videoId={trailer.videoId} opts={opts} />
        </div>
      </div>
    </section>
  );
};

export default TrailerSection;
