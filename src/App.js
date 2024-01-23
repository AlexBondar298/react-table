// import axios from "axios";
import React, { useEffect, useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";

import DataTable from "./DataTable.json";

import { Accounts } from "./pages/Accounts";
import { Profiles } from "./pages/Profiles";
import { Campaigns } from "./pages/Campaigns";

import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

function App() {
  const [data, setData] = useState(DataTable);
  const [isLoading, setIsLoading] = useState(false);
  
  const [arrayPagination, setArrayPagination] = useState(data);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [tableLengthPage, setTableLengthPage] = useState(20);

  const lastTablePage = currentPage * tableLengthPage;
  const firstTablePage = lastTablePage - tableLengthPage;
  const totalTableLength = arrayPagination.length;

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const navigate = useNavigate();

  const nextPage = (x, y) => {
    if (y === "Accounts") {
      setCurrentPage(1);
      setArrayPagination(x.profileId);
      navigate("/profiles_of_selected_account", { replace: true });
    }
    if (y === "Profiles") {
      setCurrentPage(1);
      setArrayPagination(x.campaignId);
      navigate("/campaigns_of_selected_profile", { replace: true });
    }
    if (y === "Campaigns") {
      setCurrentPage(1);
      setArrayPagination(data);
      navigate("/", { replace: true });
    }
  };
  
  // const [country, setCountry] = useState([]);
  // useEffect(() => {
  //   const fetch = async () => {
  //     setIsLoading(true);
  //     const country = await axios.get("https://restcountries.com/v3.1/all");
  //     setIsLoading(false);
  //     setCountry(country.data);
  //     console.log(country.data[0]);
  //   };
  //   fetch();
  // }, []);

  return (
    <div className="App">
      {isLoading ? (
        <h2> Loading ... </h2>
      ) : (
        <AppContext.Provider
          value={{
            data,
            nextPage,
            array: arrayPagination,
            tableLengthPage,
            totalTableLength,
            paginate,
            firstTablePage,
            lastTablePage,
          }}
        >
          <Routes>
            <Route path="/" element={<Accounts />}></Route>
            <Route path="/profiles_of_selected_account" element={<Profiles />}></Route>
            <Route path="/campaigns_of_selected_profile" element={<Campaigns />}></Route>
          </Routes>
        </AppContext.Provider>
      )}
    </div>
  );
}

export default App;
