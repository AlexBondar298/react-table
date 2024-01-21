import React from "react";
import style from "./Pagination.module.scss";

export const Pagination = ({ tableLengthPage, totalTableLength, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalTableLength / tableLengthPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className={style.container}>
      <ul className={style.pagination}>
        {pageNumbers.map((elem) => (
          <li key={elem} onClick={() => paginate(elem)}>
            <a href="#"> {elem}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};
