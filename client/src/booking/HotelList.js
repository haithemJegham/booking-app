import { useState, useEffect } from "react";
import SmallCard from "../Components/cards/SmallCard";
import { allHotels } from "../actions/hotel";
import Search from "../Components/Forms/Search";
const Home = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    loadAllhotels();
  }, []);

  const loadAllhotels = async () => {
    let res = await allHotels();
    setHotels(res.data);
  };

  return (
    <>
   
      <div className="container-fluid bg-info p-4 text-center">
        <h1>All Hotels</h1>
       
       
      </div>

      <div className="container-fluid  p-5 text-left ">
      <Search />
        <br />
        {/* <pre>{JSON.stringify(hotels, null, 4)}</pre> */}
        {hotels.map((h) => (
          <SmallCard key={h._id} h={h} />
        ))}
      </div>
    </>
  );
};

export default Home;
