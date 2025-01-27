// import React from "react";

import AboutUs from "../components/Home/AboutUs";
import Testmonial from "../components/Home/testmonial/Testmonial";
import ServiceBanner from "../components/Service/ServiceBanner";
import Services from "../components/Service/Services";
import Footer from "./../components/Footer";

function ServicePage() {
  return (
    <div>
      <ServiceBanner />
      <div className="hidden md:block">
        <Services />
      </div>
      <div className="md:hidden mb-10">
        <AboutUs classData={"hidden"} />
      </div>
      <Testmonial />
      {/* <Footer classData={"bg-footer"} /> */}
    </div>
  );
}

export default ServicePage;
