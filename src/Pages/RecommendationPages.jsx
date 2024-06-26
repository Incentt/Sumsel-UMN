import React, { useState, useEffect } from 'react';
import RecommendationItems from '../Components/RecommendationItems';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import loadingGif from '../img/Loading.gif'
const RecommendationPages = ({ language }) => {
    const Judul = language === 'EN' ? 'Explore Sumatra Selatan' : 'Jelajahi Sumatra Selatan';

    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);

    const [activeButton, setActiveButton] = useState('wisata');
    const [filter, setFilter] = useState('wisata');
    const [inputValue, setInputValue] = useState('');
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const kota = ["Palembang", "Pagar Alam", "Lubuk Linggau", "Prabumulih", "Muara Enim", "Banyuasin", "Lahat", "Musi Rawas", "Musi Banyuasin", "Ogan Komering Ilir", "Ogan Komering Ulu", "Ogan Ilir", "Empat Lawang", "Penukal Abab Lematang Ilir"];
    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };
    const [selectedCity, setSelectedCity] = useState(null);
    const [search, setSearch] = useState('');

    const handleCityChange = (city) => {
        setSelectedCity(city);
        toggleDropdown(!isDropdownOpen);
    };
    const handleFilterChange = (filterType) => {
        setActiveButton(filterType);
        setFilter(filterType);
        {/**console.log('Filter:', filterType); */ }
    };
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };
    const handleFormSubmit = (event) => {
        event.preventDefault();
        setSearch(inputValue);
    };

    const APIKEY = process.env.REACT_APP_TRIP_API_KEY; //API KEY
    {
        // Fetching 
        useEffect(() => {
            const fetchPlaces = async () => {
                const payload = {
                    textQuery: filter + " " + search + " " + (selectedCity ? selectedCity + " Sumatra Selatan" : "Sumatra Selatan"),

                };
                console.log(payload)
                try {
                    setLoading(true);
                    const response = await axios.post(
                        'https://places.googleapis.com/v1/places:searchText',
                        payload,
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'X-Goog-Api-Key': APIKEY,
                                'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.websiteUri,places.rating,places.id,places.googleMapsUri'
                            }
                        }
                    );
                    setPlaces(response.data.places || []);
                    console.log(response.data.places)
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching places:', error);
                }
            };
            fetchPlaces();
        }, [APIKEY, search, filter, selectedCity]);
    }



    return (
        <div className="mt-5 p-5 d-flex flex-column align-items-center justify-content-center">
            <h1 className="mb-3">{Judul}</h1>
            <div className="container mt-5">
                <form className="form-inline my-2 my-lg-0 d-flex justify-content-center" onSubmit={handleFormSubmit}>
                    <input
                        className="form-control mr-sm-2"
                        type="search"
                        placeholder={language === 'EN' ? "Search" : "Cari"}
                        aria-label="Search"
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                    <button

                        className="btn text-white my-2 my-sm-0 ms-2"
                        type="submit">

                        {language === 'EN' ? "Search" : "Cari"}
                    </button>
                    <div className="dropdown">
                        <button onClick={toggleDropdown} className="btn text-white my-2 my-sm-0 ms-2 dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {selectedCity ? selectedCity : (language === 'EN' ? "City" : "Kota")}
                        </button>
                        <div>
                            {/* Dropdown menu */}
                            {isDropdownOpen && (
                                <div className='dropdown-menu d-flex flex-column' aria-labelledby="dropdownMenuButton">
                                    <a className="dropdown-item" href="#" onClick={() => handleCityChange("")}>{language === "EN" ? "All City" : "Semua Kota"}</a>
                                    <a className="dropdown-item" href="#" onClick={() => handleCityChange("Palembang")}>Palembang</a>
                                    <a className="dropdown-item" href="#" onClick={() => handleCityChange("Prabumulih")}>Prabumulih</a>
                                    <a className="dropdown-item" href="#" onClick={() => handleCityChange("Lubuklinggau")}>Lubuklinggau</a>
                                    <a className="dropdown-item" href="#" onClick={() => handleCityChange("Baturaja")}>Baturaja</a>
                                    <a className="dropdown-item" href="#" onClick={() => handleCityChange("Lahat")}>Lahat</a>
                                    <a className="dropdown-item" href="#" onClick={() => handleCityChange("Pagar Alam")}>Pagar Alam</a>
                                    <a className="dropdown-item" href="#" onClick={() => handleCityChange("Martapura")}>Martapura</a>
                                    <a className="dropdown-item" href="#" onClick={() => handleCityChange("Muara Enim")}>Muara Enim</a>
                                    <a className="dropdown-item" href="#" onClick={() => handleCityChange("Indralaya")}>Indralaya</a>
                                    <a className="dropdown-item" href="#" onClick={() => handleCityChange("Kayu Agung")}>Kayu Agung</a>
                                </div>
                            )}
                        </div>
                    </div>
                </form>
                 {/* Filter wisata hotel restoran */}
                <div className="btn-group d-flex justify-content-center mt-3 mb-5" role="group" aria-label="Filter buttons">
                    {['wisata', 'hotel', 'restoran'].map((filterType) => (
                        <button
                            type="button"
                            className={`btn ${activeButton === filterType ? ' text-white' : 'bg-white border-black'}`}
                            onClick={() => handleFilterChange(filterType)}
                        >
                            {language === 'ID' ?
                                filterType.charAt(0).toUpperCase() + filterType.slice(1).toLowerCase() :
                                filterType === 'wisata' ? "Attractions" :
                                    filterType === 'hotel' ? "Hotels" :
                                        filterType === 'restoran' ? "Restaurants" : null
                            }
                        </button>
                    ))}


                </div>
            </div>
            {loading ? ( //Loading Screen
                <div className='mt-5 mb-5'>
                    <div className='mt-5 mb-5'></div>
                    <img src={loadingGif} />
                    <div className='mt-5 mb-5 min-vh-45'></div>
                </div>
            ) : (
                //Jika tidak loading render Card Rekomendasi
                <div className="container">
                    <div className="cardBox row gx-5">
                        {places && places.length > 0 ? (
                            places.slice(0, 18).map((place, index) => (
                                place ? (
                                    <RecommendationItems key={place.displayName.text} place={place} language={language} />
                                ) : null
                            ))
                        ) : (
                            //Error Handling apabila API max request
                            <p>Too many requests</p>
                            
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default RecommendationPages;
