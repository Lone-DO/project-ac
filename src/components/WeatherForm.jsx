import React from "react";

const WeatherForm = ({ props, handleChange, loadWeather }) => {
  return (
    <form id="weatherForm" onSubmit={event => loadWeather(event, "search")}>
      <input
        type="text"
        name="location"
        onChange={handleChange}
        value={props.location}
        placeholder="Location"
        required
      />
      <button className="btn">Check Weather</button>
    </form>
  );
};

export default WeatherForm;
