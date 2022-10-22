import React from 'react';
import FooterPayment from '../../assets/images/Footer_Payment.png';

const array = [1, 2, 3, 4];

const Footer = () => {
  return (
    <>
      <div className="grid justify-center gap-10 py-10 border border-gray-300">
        <div className="container grid max-w-3xl p-5 mx-auto">
          <h1 className="text-3xl font-medium text-center">
            Join Our Newsletter
          </h1>
          <p className="text-lg text-center">
            Signup to be the first to hear about exclusive deals, special offers
            and upcoming collections
          </p>
          <form className="grid mt-5 xl:grid-cols-4 lg:grid-cols-4 sm:grid-cols-3 gap-7 md:grid-cols-4">
            <input
              type="email"
              placeholder="Enter email for weekly newsletter."
              className="border border-[#161619] indent-5 col-span-3 h-14"
              name=""
              id=""
            />
            <button
              type="submit"
              className="bg-[#040405] text-white font-medium text-base leading-6 cols-span-1 h-14 sm:col-start-2 md:col-start-4 xl:col-start-4 lg:col-start-4"
            >
              Subscribe
            </button>
          </form>
        </div>
        <div className="container grid justify-between w-full gap-10 p-5 mx-auto xl:grid-cols-6 lg:grid-cols-3 md:grid-cols-2 md:max-w-4xl lg:max-w-6xl xl:max-w-7xl sm:max-w-md sm:grid-cols-1 ">
          <div className="grid gap-y-3 xl:col-span-2 lg:col-span-2 md:col-span-2 sm:col-span-1">
            <img
              src="https://sieuthilamdep.com/images/feature_variant/14/image-skincare.jpg"
              alt=""
              className="w-[270px] h-[40px]"
            />
            <p className="text-base">
              Ký túc xá Khu B Đại học Quốc gia TP.HCM, Đông Hoà, Dĩ An, Bình
              Dương
            </p>
            <div className="grid">
              <a href="mailto:nntam17052001@gmail.com">
                nntam17052001@gmail.com
              </a>
              <a href="tel:+84 334 193 816">+84 334 193 816</a>
            </div>
            <div className="grid grid-cols-4 w-[210px] gap-10">
              <a href="#" className="col-span-1 ">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z" />
                </svg>
              </a>
              <a href="#" className="col-span-1 ">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M256.55 8C116.52 8 8 110.34 8 248.57c0 72.3 29.71 134.78 78.07 177.94 8.35 7.51 6.63 11.86 8.05 58.23A19.92 19.92 0 0 0 122 502.31c52.91-23.3 53.59-25.14 62.56-22.7C337.85 521.8 504 423.7 504 248.57 504 110.34 396.59 8 256.55 8zm149.24 185.13l-73 115.57a37.37 37.37 0 0 1-53.91 9.93l-58.08-43.47a15 15 0 0 0-18 0l-78.37 59.44c-10.46 7.93-24.16-4.6-17.11-15.67l73-115.57a37.36 37.36 0 0 1 53.91-9.93l58.06 43.46a15 15 0 0 0 18 0l78.41-59.38c10.44-7.98 24.14 4.54 17.09 15.62z" />
                </svg>
              </a>
              <a href="#" className="col-span-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                </svg>
              </a>
              <a href="#" className="col-span-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
                </svg>
              </a>
            </div>
          </div>
          {array.map((item) => (
            <div key={item} className="grid col-span-1 ">
              <h4 className="text-xl font-medium">Explore</h4>
              <ul className="space-y-2 ">
                <li className="hover:translate-x-[20px] transition-all duration-500">
                  <a href="#" className="text-base hover:text-orange-600">
                    About us
                  </a>
                </li>
                <li className="hover:translate-x-[20px] transition-all duration-500">
                  <a href="#" className="text-base hover:text-orange-600">
                    About us
                  </a>
                </li>
                <li className="hover:translate-x-[20px] transition-all duration-500">
                  <a href="#" className="text-base hover:text-orange-600">
                    About us
                  </a>
                </li>
                <li className="hover:translate-x-[20px] transition-all duration-500">
                  <a href="#" className="text-base hover:text-orange-600">
                    About us
                  </a>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-b border-gray-300 border-x">
        <div className="container grid justify-between w-full p-5 mx-auto xl:grid-cols-9 lg:grid-cols-9 md:grid-cols-3 md:max-w-2xl lg:max-w-6xl xl:max-w-7xl sm:max-w-md sm:grid-cols-3 gap-x-10 gap-y-5">
          <p className="flex items-center justify-center col-span-3 text-base">
            © {new Date().getFullYear()} Nhat Tam - Thanh Van. All rights
            reserved
          </p>
          <img
            src={FooterPayment}
            alt="Payment Method"
            className="w-full col-span-3"
          />
          <div className="col-span-3 grid grid-cols-3 gap-5 h-[45px]">
            <div className="col-span-2 p-2 border border-gray-200">
              <select className="w-full" name="" id="">
                <option value="eng">English (United States)</option>
                <option value="deu">Deutsch</option>
                <option value="fra">Français</option>
                <option value="esp">Español</option>
              </select>
            </div>
            <div className="col-span-1 p-2 border border-gray-200">
              <select className="w-full" name="" id="">
                <option value="usd">$ USD</option>
                <option value="eur">€ EUR</option>+84 334 193 816
                <option value="tl">₺ TL</option>
                <option value="rub">₽ RUB</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
