import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { read, updateHotel } from "../actions/hotel";
import { useSelector } from "react-redux";
import HotelEditForm from "../Components/Forms/HotelEditForm";

const EditHotel = ({ match }) => {
  //redux
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
  //state
  const [values, setValues] = useState({
    title: "",
    content: "",
    location: "",

    price: "",
    from: "",
    to: "",
    bed: "",
  });
  function _suggestionSelect(result, lat, long, text) {
    setValues({ ...values, location: result });
  }
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState(
    "https://via.placeholder.com/100x100.png?text=PREVIEW"
  );
  //destructing vaiables from state

  const { title, content, location, price, from, to, bed } = values;

  useEffect(() => {
    loadSellerHotel();
  }, []);

  const loadSellerHotel = async () => {
    let res = await read(match.params.hotelId);
    // console.log(res)
    setValues({ ...values, ...res.data });
    setPreview(`${process.env.REACT_APP_API}/hotel/image/${res.data._id}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hotelData = new FormData();
    hotelData.append("title", title);
    hotelData.append("content", content);
    hotelData.append("location", location);
    image && hotelData.append("image", image);
    hotelData.append("price", price);
    hotelData.append("from", from);
    hotelData.append("to", to);
    hotelData.append("bed", bed);
    console.log([...hotelData]);
    try {
      let res = await updateHotel(token, hotelData, match.params.hotelId);
      console.log("HOTEL UPDATE RES", res);
      toast.success(`${res.data.title} is updated`);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.err);
    }
  };

  const handleImageChange = (e) => {
    //console.log(e.target.files[0])
    setPreview(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container-fluid bg-info p-4 text-center">
        <h2>Edit Hotel</h2>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <br />
            <HotelEditForm
              values={values}
              setValues={setValues}
              handleChange={handleChange}
              handleImageChange={handleImageChange}
              handleSubmit={handleSubmit}
              location={location}
              _suggestionSelect={_suggestionSelect}
            />
          </div>
          <div className="col-md-6">
            <img
              src={preview}
              alt="preview_image"
              className="img img-fluid m-2 "
            />
            {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
          </div>
        </div>
      </div>
    </>
  );
};
export default EditHotel;
