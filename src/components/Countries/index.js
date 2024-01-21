import React, { useState, useContext } from "react";
import style from "./Countries.module.scss";

import { Pagination } from "../Pagination";

import { AppContext } from "../../App";

const Countries = ({accountsData}) => {
  const { country, array = [], nextPage, tableLengthPage, totalTableLength, paginate, firstTablePage, lastTablePage } = useContext(AppContext)
  
  const [countriesData, setCountriesData] = useState(country);
  const [sortData, setSortData] = useState(true);
  const [search, setSearch] = useState("");


  const sortirovka = (x) => {
    /* функция из=за того что данные содержат null */
    function alphabetically(ascending) {
      return function (a, b) {
        if (a[x] === b[x]) {
          return 0;
        }
        if (a[x] === null) {
          return 1;
        }
        if (b[x] === null) {
          return -1;
        }
        if (ascending) {
          return typeof a[x] === "string" ? (a[x].toLowerCase() > b[x].toLowerCase() ? -1 : 1) : a[x] > b[x] ? -1 : 1;
        }
        return typeof a[x] === "string" ? (a[x].toLowerCase() > b[x].toLowerCase() ? 1 : -1) : a[x] > b[x] ? 1 : -1;
      };
    }
    /*------------------------------------------------------------------------------------------------------------------ */
    const sorted = [...countriesData].sort(alphabetically(sortData));
    setCountriesData(sorted);

    setSortData((prev) => !prev);
  };

  return (
    <div className={style.wrapper}>
      <header>
        <h1>{accountsData[0]}</h1>
        <div className={style.search}>
          <img src="img/search.svg" onClick={(event) => sortirovka(event.target.parentElement.textContent)} alt="sort" />
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={accountsData[2]} />
        </div>
      </header>
      <div className={style.table}>
        <table>
          <thead>
            <tr>
              <th>
                {accountsData[1]}
                <img src="img/sort_icon.svg" onClick={(event) => sortirovka(event.target.parentElement.textContent)} alt="sort" />
              </th>
              <th>
                {accountsData[2]}
                <img src="img/sort_icon.svg" onClick={(event) => sortirovka(event.target.parentElement.textContent)} alt="sort" />
              </th>
              <th>
                {accountsData[3]}
                <img src="img/sort_icon.svg" onClick={(event) => sortirovka(event.target.parentElement.textContent)} alt="sort" />
              </th>
              {accountsData[4] ? (
                <th>
                  {accountsData[4]}
                  <img src="img/sort_icon.svg" onClick={(event) => sortirovka(event.target.parentElement.textContent)} alt="sort" />
                </th>
              ) : null}
            </tr>
          </thead>

          <tbody>
            {countriesData
              .filter((elem) => (accountsData[0] !== "Accounts" ? array.includes(elem.accountId) : elem))
              .filter((elem) => elem[accountsData[2]].toLowerCase().includes(search.toLowerCase()))
              .slice(firstTablePage, lastTablePage)
              .map((elem) => (
                <tr key={elem.accountId} onClick={() => nextPage(elem, accountsData[0])} style={{ textDecorationLine: "none" }}>
                  <td>{elem[accountsData[1]]} </td>
                  <td>{elem[accountsData[2]]} </td>
                  <td>{elem[accountsData[3]]}</td>
                  {accountsData[4] ? <td>{elem[accountsData[4]]}</td> : null}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Pagination tableLengthPage={tableLengthPage} totalTableLength={totalTableLength} paginate={paginate} />
    </div>
  );
};

export default Countries;
