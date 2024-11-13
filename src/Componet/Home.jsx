import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useStore from "../store/store";
import Hero from "./hero";
import Why from "./whyHome";
import About from "./Aboutus";
import Service from "./services";
import Program from "./Program";
import Events from "./Events";
import Staff from "./staff";
import Testimonial from "./testimonial";

const Home = () => {
  const {

    setAdmin
  } = useStore();

  useEffect(() => {
    setAdmin(false);
  }, []);



  return (
    <>
      <Hero isHome={true} />
        <Why isHome={true} />
        <About isHome={true} />
        <Service isHome={true} />
        <Program isHome={true} />
        <Events isHome={true} />
        <Staff isHome={true} />
        <Testimonial isHome={true} />
    </>
  );
};

export default Home;
