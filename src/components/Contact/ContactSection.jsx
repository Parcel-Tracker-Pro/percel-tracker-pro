// import React from 'react';

const ContactSection = () => {
  return (
    <div className="pt-[64px] lg:w-[1000px] mx-auto flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-10 px-5 sm:px-20 md:px-6">
      {/* Hotline Contact Card */}
      <div className="bg-primary text-center px-6 text-white rounded-lg py-10 md:py-30 flex md:h-[350px] flex-col justify-between shadow-md w-full md:w-1/2">
        <div>
          <h3 className="header-text font-bold">Hotline Contact</h3>
          <p className="mt-2 body-text">
            Our office hours are Monday to Friday,
            <br />
            <span
              className="font-bold"
              style={{
                textShadow:
                  "-1px -1px 0 #808080, 1px -1px 0 #808080, -1px 1px 0 #3DBB47, 1px 1px 0 #808080",
              }}
            >
              9 AM to 6 PM{" "}
            </span>
            . We’re here to assist you with any questions or support you need.
          </p>
        </div>
        <a
          href="tel:09773703015"
          className="mt-4 bg-white font-bold text-primary w-64 mx-auto rounded-lg text-center py-4 hover:bg-gray-200"
        >
          Call Our Hotline
        </a>
      </div>

      {/* Social Contact Card */}
      <div className="text-center bg-primary text-white rounded-lg px-6 py-10 md:py-30 md:h-[350px]  flex flex-col justify-between shadow-md w-full md:w-1/2">
        <div>
          <h3 className="header-text font-bold">Social Contact</h3>
          <p className="mt-2 body-text">
            Need help? Reach out via Messenger for quick support. We’re here for
            you!
          </p>
        </div>
        <a
          href="https://m.me/197568866770556?source=qr_link_share"
          className="mt-4 mx-auto bg-white w-64 font-bold text-primary rounded-lg text-center py-4 hover:bg-gray-200"
        >
          Message Us on Messenger
        </a>
      </div>
    </div>
  );
};

export default ContactSection;
