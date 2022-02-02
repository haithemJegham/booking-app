import { useState, useEffect } from "react";
import queryString from "query-string";
import { Link } from "react-router-dom";
import Search from "../Components/Forms/Search";
import { searchListings } from "../actions/hotel";
import SmallCard from "../Components/cards/SmallCard";
const SearchResult = () => {
  // state
  const [searchLocation, setSearchLocation] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchBed, setSearchBed] = useState("");
  const [hotels, setHotels] = useState([]);
  // when component mounts, get search params from url and use to send search query to backend
  useEffect(() => {
    const { location, date, bed } = queryString.parse(window.location.search);
    console.table({ location, date, bed });
    searchListings({ location, date, bed }).then((res) => {
      console.log("search result====>", res.data);
      setHotels(res.data);
    });
  }, [window.location.search]);
  return (
    <>
      <div className="col">
      <br />
        <Search />
        <br />
      </div>
      <div className="container">
        <div className="row">
          {/* {JSON.stringify(hotels, null, 4)} */}
          {hotels.map((h) => (
            <SmallCard key={h._id} h={h} />
          ))}
        </div>
      </div>
    </>
  );
};
export default SearchResult;
