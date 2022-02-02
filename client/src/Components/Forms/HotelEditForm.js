import MapboxAutocomplete from "react-mapbox-autocomplete";
import { DatePicker, Select } from "antd";
import moment from "moment";

const { Option } = Select;
const config = {
  token: process.env.REACT_APP_MAPBOX_API_TOKEN,
};

const HotelEditForm = ({
  values,
  setValues,
  location,
  handleChange,
  handleImageChange,
  handleSubmit,
  _suggestionSelect,
}) => {
  const { title, content, price, bed, form, to } = values;
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="btn btn-outline-secondary btn-block m-2 text-left">
          Image
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            hidden
          />
        </label>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="Title"
          className="form-control m-2"
          value={title}
        />
        <textarea
          name="content"
          onChange={handleChange}
          placeholder="Content"
          className="form-control m-2"
          value={content}
        />

        {location && location.length && (
          <MapboxAutocomplete
            name="location"
            placeholder="Location"
            defaultValue={location}
            publicKey={config.token}
            inputClass="form-control m-2 "
            onSuggestionSelect={_suggestionSelect}
            country="tn"
            resetSearch={false}
            style={{ height: "50px" }}
          />
        )}
        <input
          type="number"
          name="price"
          onChange={handleChange}
          placeholder="Price"
          className="form-control m-2"
          value={price}
        />

        <Select
          onChange={(value) => setValues({ ...values, bed: value })}
          className="w-100 m-2"
          size="large"
          placeholder="Number of Beds"
          value={bed}
        >
          <Option key={1}>{1}</Option>
          <Option key={2}>{2}</Option>
          <Option key={3}>{3}</Option>
          <Option key={4}>{4}</Option>
        </Select>
      </div>

      {to && (
        <DatePicker
          defaultValue={moment(to, "YYYY-MM-DD")}
          placeholder="From date"
          className="form-control m-2"
          onChange={(date, dateString) =>
            setValues({ ...values, from: dateString })
          }
          disabledDate={(current) =>
            current && current.valueOf() < moment().subtract(1, "days")
          }
        />
      )}
      {to && (
        <DatePicker
          defaultValue={moment(to, "YYYY-MM-DD")}
          placeholder="To date"
          className="form-control m-2"
          onChange={(date, dateString) =>
            setValues({ ...values, to: dateString })
          }
          disabledDate={(current) =>
            current && current.valueOf() < moment().subtract(1, "days")
          }
        />
      )}

      <button className="btn btn-outline-primary m-2">Save</button>
    </form>
  );
};
export default HotelEditForm;
