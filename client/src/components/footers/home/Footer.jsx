import { SiFacebook, SiInstagram, SiMessenger, SiTiktok } from 'react-icons/si';
import FooterPayment from '../../../assets/images/Footer_Payment.png';
import Button from '../../buttons/Button';

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
            <Button className=" text-white col-span-1 h-14 sm:col-start-2 md:col-start-4 xl:col-start-4 lg:col-start-4">
              Subscribe
            </Button>
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
