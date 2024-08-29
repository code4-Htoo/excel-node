"use client";
import { useData } from "@/app/hooks/useData";

export default function Home() {
  const {
    filteredData,
    search,
    handleSearch,
    handleFileChange,
    handleFileUpload,
  } = useData();

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

      <table id="myTable">
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
