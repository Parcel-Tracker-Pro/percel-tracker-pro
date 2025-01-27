// import React from 'react';
import { SocialIcon } from "react-social-icons";
import logo from "./../assets/image/logo.png";
import viber from "./../assets/image/about/viber.png";
import { Link } from "react-router-dom";

const Footer = ({ classData }) => {
  return (
    <footer
      className={`${classData} text-white pt-20 pb-8 px-5 md:px-10 lg:px-0 `}
    >
      <div className="mx-auto flex flex-col lg:flex-row lg:w-[1000px]">
        <div className="flex flex-col w-full lg:w-2/5">
          <img src={logo} alt="Logo" className="w-28" />
          <p className="mt-2 font-bold text-xl">
            Looking For Daycare Services? <br />
            Call us straight away!
          </p>
          <div className="mt-4 flex space-x-6">
            <SocialIcon
              url="https://www.facebook.com/caremel122023"
              target="_blank"
              network="facebook"
              style={{ height: 35, width: 35 }}
            />
            <SocialIcon
              network="linkedin"
              url="https://www.linkedin.com/company/care-mel-mm/"
              target="_blank"
              style={{ height: 35, width: 35 }}
            />
            {/* <a href="viber://add?number=959773703015" target="_blank">
              <img src={viber} alt="Viber" style={{ height: 35, width: 35 }} />
            </a> */}
          </div>
        </div>

        <div className="flex w-full lg:w-3/5  flex-col md:flex-row mt-10 lg:mt-0">
          <div className="flex flex-col w-full md:w-1/2">
            <h2 className="text-xl font-semibold text-primary">Services</h2>
            <ul className="mt-2 space-y-5 mt-5">
              <li className="">
                <Link
                  to="/service"
                  onClick={() => {
                    window.scrollTo(0, 0);
                  }}
                  className="hover:text-green-300"
                >
                  Child Care Service
                </Link>
              </li>
              <li className="">
                <Link
                  to="/service"
                  onClick={() => {
                    window.scrollTo(0, 0);
                  }}
                  className="hover:text-green-300"
                >
                  Newborn Care Service
                </Link>
              </li>
              <li className="">
                <Link
                  to="/service"
                  onClick={() => {
                    window.scrollTo(0, 0);
                  }}
                  className="hover:text-green-300"
                >
                  Hospital Companion Care Service
                </Link>
              </li>
              <li className="">
                <Link
                  to="/service"
                  onClick={() => {
                    window.scrollTo(0, 0);
                  }}
                  className="hover:text-green-300"
                >
                  Elder Care Service
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col w-full md:w-1/2 mt-10 md:mt-0">
            <h2 className="text-xl text-primary font-semibold">
              Contact With Us
            </h2>
            <p className="mt-5 text-lg font-semibold">
              09 - 773 709 015 <br />
              <span className="text-sm font-medium">(Office Hours 9 to 6)</span>
            </p>
            <p className="mt-5 font-semibold">
              <a
                href="mailto:carenekontact@mail.com"
                className="hover:text-green-300"
              >
                info@caremelmm.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
