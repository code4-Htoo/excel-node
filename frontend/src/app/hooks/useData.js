import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchList, uploadFile } from "@/redux/slices/listSlice";

export const useData = () => {
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

  return {
    data,
    filteredData,
    search,
    handleSearch,
    handleFileChange,
    handleFileUpload,
  };
};
