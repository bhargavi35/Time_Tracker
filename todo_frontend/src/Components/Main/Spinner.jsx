import React from "react";
import { Dna } from "react-loader-spinner";

const Spinner = ({ load }) => {
  return (
    <Dna
      visible={load}
      height="80"
      width="80"
      ariaLabel="dna-loading"
      wrapperStyle={{}}
      wrapperClass="dna-wrapper"
    />
  );
};

export default Spinner;
