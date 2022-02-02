import { useState } from "react";
import { toast } from "react-toastify";

import { createHotel } from "../actions/hotel";
import { useSelector } from "react-redux";
import HotelCreateForm from "../Components/Forms/HotelCreateForm";

const NewHotel = () => {
  //redux
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;

  //state
  const [values, setValues] = useState({
    title: "",
    content: "",
    location: "",
    image: "",
    price: "",
    from: "",
    to: "",
    bed: "",
  });
  function _suggestionSelect(result, lat, long, text) {
    setValues({ ...values, location: result });
  }
  const [preview, setPreview] = useState(
    "https://via.placeholder.com/100x100.png?text=PREVIEW"
  );
  //destructing vaiables from state

  const { title, content, location, image, price, from, to, bed } = values;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.table(values);

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
      let res = await createHotel(token, hotelData);
      console.log("HOTEL CREATE RES", res);
      toast.success("NEW HOTEL IS POSTED", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
    }
  };
  const handleImageChange = (e) => {
    //console.log(e.target.files[0])
    setPreview(URL.createObjectURL(e.target.files[0]));
    setValues({ ...values, image: e.target.files[0] });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container-fluid bg-info p-4 text-center">
        <h2>Add Hotel</h2>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <br />
            <HotelCreateForm
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
            />{" "}
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </div>
        </div>
      </div>
    </>
  );
};
export default NewHotel;
