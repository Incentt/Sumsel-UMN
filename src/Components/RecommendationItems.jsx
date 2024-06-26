import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import nofound from '../img/notfound.png';

//Recomendation Cards Components
//CARD RECOMENDATION
const RecommendationItems = ({ place, language }) => {
    const [image, setImage] = useState('');
    const placeId = place.id;
    const [photoUrl, setPhotoUrl] = useState(nofound);
    const rating = parseInt(place.rating);
    const APIKEY = process.env.REACT_APP_TRIP_API_KEY;

    
    const renderRating = () => { //MEMUNCULKAN Bintang sesuai rating
        const start = [];
        for (let i = 0; i < 5; i++) {

            if (i < rating) {
                start.push(<FontAwesomeIcon key={i} icon={faStar} style={{ color: 'gold', marginRight: '5px' }} />);
            } else {
                start.push(<FontAwesomeIcon key={i} icon={faStar} style={{ color: 'lightgray', marginRight: '5px' }} />);
            }
        }
        return start;
    }
    useEffect(() => {
        const url = `https://places.googleapis.com/v1/${place.photos[0].name}/media?maxHeightPx=400&maxWidthPx=400&key=${APIKEY}`
        setPhotoUrl(url); // SET foto berdasarkan URL
    }, [APIKEY, place.photos[0].name]);


    return (
        <div className="col-md-4 mb-5" key={place.id}>
            <div className="card h-100 d-flex flex-column">
                <div className="image-container">
                    {photoUrl ? ( // Jika foto Null maka set foto ke noFound
                        <img src={photoUrl} alt="User" className="imagekotak" />
                    ) : (
                        <img src={nofound} alt="User" className="imagekotak" />
                    )}

                </div>
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{place.displayName.text}</h5>
                    <div className="mb-2 d-flex">
                        <p className='m-0 me-2'>
                            {place.rating && place.rating} {/* Rating Place */}
                        </p>
                        <div className="d-flex align-items-center justify-content-center">
                            {place.rating && renderRating()}
                        </div>

                    </div>
                    {/* Alamat Place */}
                    {place.formattedAddress && ( 
                        <p className="card-text">{place.formattedAddress}</p>
                    )}
                    <div className="mt-auto">
                        <div className="buttonGroup d-flex">
                            {/*Link */}
                            {place.googleMapsUri && (
                                <a href={place.googleMapsUri} target="_blank" rel="noopener noreferrer" className="btn me-2 text-white">
                                    {language === 'EN' ? 'View on Google Maps' : 'Lihat Peta Google'}
                                </a>
                            )}
                            
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
}

export default RecommendationItems;
