import Countries from "../components/Countries";
import React from "react";

export const Campaigns = () => {
  const accountsData = ["Campaigns", "accountId", "date", "cost", "clicks"];
  return <Countries accountsData={accountsData} />;
};
