import React, { useEffect, useState } from "react";

const RickAndMortar = () => {
  // State variables for dataType and items
  const [dataType, setDataType] = useState("");
  const [items, setItems] = useState([]);
  // Use effect for Fetch data based on the datatype
  useEffect(() => {
    // Fetch Data from the API
    fetch(`https://rickandmortyapi.com/api/${dataType}`)
      .then((response) => response.json())
      .then((data) => setItems(data.results || data))
      .catch((error) => console.log("Error Fetching Data", error));
  },[dataType]);

  // Handle dataType change from dropdown
  const handleChange = (event) => {
    setDataType(event.target.value);
  };
  return (
    <div>
      <h2>RICK AND MORTY DATA</h2>
      {/* Dropdown to select data type */}
      <select onChange={handleChange} value={dataType}>
        <option value="">Choose</option>
        <option value="character">Character</option>
        <option value="episode">Episode</option>
        <option value="location">Location</option>
      </select>
      {/* Display Fetched data */}
      <ul>
        {items.length > 0 ? (
          items.map((item) => (
            <li key={item.id}>
              {/* Conditionally render based on dataType */}
              {dataType === "character" &&
                item.name &&
                ` (ID: ${item.id}) => ${item.name}`}
              {dataType === "episode" &&
                item.name &&
                ` (ID: ${item.id}) => ${item.name}`}
              {dataType === "location" &&
                item.name &&
                `(ID: ${item.id}) => ${item.name} `}
            </li>
          ))
        ) : (
          <li>No data available</li>
        )}
      </ul>
    </div>
  );
};

export default RickAndMortar;
