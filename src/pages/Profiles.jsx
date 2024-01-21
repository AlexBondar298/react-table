import Countries from "../components/Countries";
import React from "react";

export const Profiles = () => {
  const accountsData = ["Profiles", "accountId", "country", "marketplace"];
  return <Countries accountsData={accountsData} />;
};
