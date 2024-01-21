import Countries from "../components/Countries";
import React from "react";

export const Accounts = () => {
  const accountsData = ["Accounts", "accountId", "email", "authToken", "creationDate"];
  return <Countries accountsData={accountsData} />;
};
