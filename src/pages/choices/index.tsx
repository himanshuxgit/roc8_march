// "use client";

import Choice from "~/components/Choice";
import Navbar from "~/components/Navbar";
import isAuth from "~/components/isAuth";

const Choices = () => {

  return (
    <>
    <Navbar />
    <Choice />
    </>
  );
};

export default isAuth(Choices);

