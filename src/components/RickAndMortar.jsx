import React, { useEffect, useState } from "react";

// Card component to display each item
const Card = ({ item, dataType }) => {
  return (
    <div className="card">
      <h3>{item.name}</h3>
      {item.image && (
        <img src={item.image} alt={item.name} className="card-image" />
      )}
      <p>
        <strong>ID:</strong> {item.id}
      </p>
      <p>
        <strong>Type:</strong> {dataType}
      </p>
    </div>
  );
};

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
  }, [dataType]);

  // Handle dataType change from dropdown
  const handleChange = (event) => {
    setDataType(event.target.value);
  };
  return (
    <div className="container-fluid rick-and-mortar-container">
      <h2>RICK AND MORTY DATA</h2>
      {/* Dropdown to select data type */}
      <select onChange={handleChange} value={dataType}>
        <option value="">Choose</option>
        <option value="character">Character</option>
        <option value="episode">Episode</option>
        <option value="location">Location</option>
      </select>
      {/* Display Fetched data in cards */}
      <div className="cards-container">
        {items.length > 0 ? (
          items.map((item) => (
            <Card key={item.id} item={item} dataType={dataType} />
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
};

export default RickAndMortar;
