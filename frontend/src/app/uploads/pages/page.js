"use client";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchList, uploadFile } from "@/redux/slices/listSlice";

export default function Home() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    loadData();
  }, [dispatch]);

  const loadData = async () => {
    try {
      const fetchedData = await dispatch(fetchList()).unwrap();
      setData(fetchedData);
      setFilteredData(fetchedData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearch(searchTerm);
    filterData(searchTerm);
  };

  const filterData = (searchTerm) => {
    const filtered = data.filter((item) =>
      item.FirstName.toLowerCase().includes(searchTerm)
    );
    setFilteredData(filtered);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      console.error("No file selected for upload");
      return;
    }

    try {
      await dispatch(uploadFile(file)).unwrap();
      await loadData();
    } catch (error) {
      console.error("Failed to upload file:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload File</button>
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search"
        style={{ color: "red" }}
      />

      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>Country</th>
            <th>Age</th>
            <th>Date</th>
            <th>Id</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id} style={{ color: "rgb(36, 36, 36)" }}>
              <td>{item.FirstName}</td>
              <td>{item.LastName}</td>
              <td>{item.Gender}</td>
              <td>{item.Country}</td>
              <td>{item.Age}</td>
              <td>{item.Date}</td>
              <td>{item.Id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
