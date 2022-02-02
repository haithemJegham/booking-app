import React, { useState } from "react";
import { DatePicker, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import MapboxAutocomplete from "react-mapbox-autocomplete";
import moment from "moment";
import { useHistory } from "react-router-dom";

//destructure values from ant components
const { RangePicker } = DatePicker;
const { Option } = Select; // to select beds

const config = {
  token: process.env.REACT_APP_MAPBOX_API_TOKEN,
};

const Search = (result) => {
  const [location, setLocation] = useState("");
  const _suggestionSelect = (result) => {
    setLocation({ result });
  };

  // state

  const [date, setDate] = useState("");
  const [bed, setBed] = useState("");

  //route
  const history = useHistory();

  const handleSubmit = () => {
    history.push(
      `/search-result?location=${JSON.parse(
        JSON.stringify(location.result)
      )}&date=${date}&bed=${bed}`
    );
  };
  return (
    <div className="d-flex justify-content-center col-9  ">
      <div className="w-100">
        {/* <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}

        /> */}
        <MapboxAutocomplete
          name="location"
          placeholder="Location"
          value={location}
          publicKey={config.token}
          inputClass="form-control m-0 "
          onSuggestionSelect={_suggestionSelect}
          country="tn"
          resetSearch={false}
        />
      </div>
      <RangePicker
        onChange={(value, dateString) => setDate(dateString)}
        disabledDate={(current) =>
          current && current.valueOf() < moment().subtract(1, "days")
        }
        className="w-70"
        style={{ height: "50px" }}
      />

      <Select
        onChange={(value) => setBed(value)}
        className="w-30"
        size="large"
        style={{ height: "50px" }}
        placeholder="Number of beds"
      >
        <Option key={1}>{1}</Option>
        <Option key={2}>{2}</Option>
        <Option key={3}>{3}</Option>
        <Option key={4}>{4}</Option>
      </Select>

      <SearchOutlined
        onClick={handleSubmit}
        className="btn btn-primary p-3 btn-square"
      />
    </div>
  );
};

export default Search;
