/* eslint-disable jsx-a11y/iframe-has-title */
import React from 'react';
import { SiFacebook, SiInstagram, SiMessenger, SiTiktok } from 'react-icons/si';

const ContactUsPage = () => {
  return (
    <>
      <div className="pt-12 pb-2 text-xl">
        <h3 className="mb-6 text-4xl text-center font-semibold">About Us</h3>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.071524132874!2d106.77996497426122!3d10.882164589273058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d89aad780e49%3A0x54542761d4c22175!2zS8O9IHTDumMgeMOhIEtodSBCIMSQ4bqhaSBo4buNYyBRdeG7kWMgZ2lhIFRQLkhDTQ!5e0!3m2!1svi!2s!4v1684508755186!5m2!1svi!2s"
          className="w-full h-[500px]"
        ></iframe>
        <div className="max-w-5xl px-20 py-10 mx-auto -translate-y-16 bg-white flex flex-col gap-10">
          <span className="text-2xl font-semibold">Contact Information</span>
          <span className="text-lg font-semibold italic">
            We will answer any questions you may have about our online sales,
            rights or partnership service right here.
          </span>
          <div className="grid grid-cols-2 gap-8">
            <div className="col-span-1 flex flex-col gap-2">
              <span className="font-semibold">UTE</span>
              <span className="text-lg">
                01 Đ. Võ Văn Ngân, Linh Chiểu, Thủ Đức, Thành phố Hồ Chí Minh
              </span>
              <span className="text-lg mt-2">nntam17052001@gmail.com</span>
              <span className="text-lg">0334193816</span>
            </div>
            <div className="col-span-1 flex flex-col gap-2">
              <span className="font-semibold">UTE</span>
              <span className="text-lg">
                01 Đ. Võ Văn Ngân, Linh Chiểu, Thủ Đức, Thành phố Hồ Chí Minh
              </span>
              <span className="text-lg mt-2">nntam17052001@gmail.com</span>
              <span className="text-lg">0334193816</span>
            </div>
            <div className="col-span-2 flex flex-col gap-3">
              <span className="font-semibold">Social Media</span>
              <div className="grid grid-cols-4 w-[210px] gap-10">
                <a href="#" className="col-span-1 ">
                  <SiFacebook className="w-full h-full"></SiFacebook>
                </a>
                <a href="#" className="col-span-1 ">
                  <SiMessenger className="w-full h-full"></SiMessenger>
                </a>
                <a href="#" className="col-span-1">
                  <SiInstagram className="w-full h-full"></SiInstagram>
                </a>
                <a href="#" className="col-span-1">
                  <SiTiktok className="w-full h-full"></SiTiktok>
                </a>
              </div>
            </div>
          </div>
          <span className="text-2xl font-semibold">Get In Touch</span>
          <div className="grid grid-cols-2 text-lg gap-4">
            <div className="col-span-1 flex flex-col gap-1">
              <label htmlFor="name">Name</label>
              <input
                className="border border-gray-500 p-2"
                name="name"
                id="name"
                type="text"
              />
            </div>
            <div className="col-span-1 flex flex-col gap-1">
              <label htmlFor="email">Email</label>
              <input
                className="border border-gray-500 p-2"
                name="email"
                id="email"
                type="email"
              />
            </div>
            <div className="col-span-2 flex flex-col gap-1">
              <label htmlFor="subject">Subject</label>
              <input
                className="border border-gray-500 p-2"
                name="subject"
                id="subject"
                type="text"
              />
            </div>
            <div className="col-span-2 flex flex-col gap-1">
              <label htmlFor="feedback">
                Details please! Your review helps other shoppers.
              </label>
              <textarea
                className="border border-gray-500 p-2"
                name="feedback"
                id="feedback"
                rows={5}
                placeholder="What this you like or dislike? What should other shoppers know before buying?"
                type="text"
              />
            </div>
          </div>
          <div className="col-span-2">
            <button className="py-5 px-12 bg-black text-white">
              Submit Message
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUsPage;
