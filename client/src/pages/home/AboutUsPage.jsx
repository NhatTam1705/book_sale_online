import React from 'react';
import About_us from '../../assets/images/about_us.jpg';
import Fast_delivery from '../../assets/images/fast-delivery.png';
import Shield from '../../assets/images/shield.png';
import Guaranteed from '../../assets/images/guaranteed.png';
import Technical_support from '../../assets/images/technical-support.png';
import Doremi from '../../assets/images/doremi.png';
import Doraemon from '../../assets/images/doraemon.png';
import Xizuka from '../../assets/images/xizuka.png';

const AboutUsPage = () => {
  return (
    <>
      <div className="py-12 text-xl">
        <h3 className="mb-6 text-4xl text-center font-semibold">About Us</h3>
        <img src={About_us} alt="About us" />
        <div className="max-w-5xl px-20 py-10 mx-auto -translate-y-16 bg-white flex flex-col gap-10">
          <span className="text-2xl font-semibold">
            Welcome to MeoMeo Store
          </span>
          <span className="text-lg font-semibold italic">
            “ Many desktop publishing packages and web page editors now use
            Lorem Ipsum as their default model search for eolved over sometimes
            by accident, sometimes on purpose ”
          </span>
          <span className="font-semibold">What we really do?</span>
          <span className="text-lg -mt-2">
            Mauris tempus erat laoreet turpis lobortis, eu tincidunt erat
            fermentum. Aliquam non tincidunt urna. Integer tincidunt nec nisl
            vitae ullamcorper. Proin sed ultrices erat. Praesent varius ultrices
            massa at faucibus. Aenean dignissim, orci sed faucibus pharetra, dui
            mi dignissim tortor, sit amet condimentum mi ligula sit amet augue.
            Pellentesque vitae eros eget enim mollis placerat. Aliquam non
            tincidunt urna. Integer tincidunt nec nisl vitae ullamcorper. Proin
            sed ultrices erat. Praesent varius ultrices massa at faucibus.
            Aenean dignissim, orci sed faucibus pharetra, dui mi dignissim
            tortor, sit amet condimentum mi ligula sit amet augue. Pellentesque
            vitae eros eget enim mollis placerat.
          </span>
          <div className="grid grid-cols-2 gap-8">
            <div className="col-span-1 flex flex-col gap-2">
              <span className="font-semibold">Our Vision</span>
              <span className="text-lg">
                Pellentesque sodales augue eget ultricies ultricies. Cum sociis
                natoque penatibus et magnis dis parturient montes, nascetur
                ridiculus mus. Curabitur sagittis ultrices condimentum.
              </span>
            </div>
            <div className="col-span-1 flex flex-col gap-2">
              <span className="font-semibold">Our Vision</span>
              <span className="text-lg">
                Pellentesque sodales augue eget ultricies ultricies. Cum sociis
                natoque penatibus et magnis dis parturient montes, nascetur
                ridiculus mus. Curabitur sagittis ultrices condimentum.
              </span>
            </div>
          </div>
        </div>
        <div className="px-24 grid grid-cols-4">
          <div className="col-span-1 flex flex-col justify-center items-center">
            <span className="text-5xl font-semibold">45M</span>
            <span>Active Readers</span>
          </div>
          <div className="col-span-1 flex flex-col justify-center items-center">
            <span className="text-5xl font-semibold">+6k</span>
            <span>Total Pages</span>
          </div>
          <div className="col-span-1 flex flex-col justify-center items-center">
            <span className="text-5xl font-semibold">30.6M</span>
            <span>Buyers Activie</span>
          </div>
          <div className="col-span-1 flex flex-col justify-center items-center">
            <span className="text-5xl font-semibold">283</span>
            <span>Cup Of Coffe</span>
          </div>
        </div>
        <div className="px-12 grid grid-cols-4">
          <span className="text-3xl font-semibold col-span-4 py-10">
            Why We
          </span>
          <div className="col-span-1 flex flex-col justify-start items-start gap-1">
            <img src={Fast_delivery} className="w-16" alt="Free Delivery" />
            <span className="font-semibold">Free Delivery</span>
            <span className="text-lg">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu.
            </span>
          </div>
          <div className="col-span-1 flex flex-col justify-start items-start gap-1">
            <img src={Shield} className="w-16" alt="Free Delivery" />
            <span className="font-semibold">Secure Payment</span>
            <span className="text-lg">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu.
            </span>
          </div>
          <div className="col-span-1 flex flex-col justify-start items-start gap-1">
            <img src={Guaranteed} className="w-16" alt="Free Delivery" />
            <span className="font-semibold">Money Back Guarantee</span>
            <span className="text-lg">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu.
            </span>
          </div>
          <div className="col-span-1 flex flex-col justify-start items-start gap-1">
            <img src={Technical_support} className="w-16" alt="Free Delivery" />
            <span className="font-semibold">24/7 Support</span>
            <span className="text-lg">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu.
            </span>
          </div>
        </div>
        <div className="px-12 text-3xl font-semibold col-span-3 py-10">
          Our team
        </div>
        <div className="max-w-3xl mx-auto grid grid-cols-3">
          <div className="col-span-1 flex flex-col justify-center items-center gap-1">
            <img src={Doremi} alt="Đoàn Vân" />
            <span>Đoàn Vân</span>
            <span>19110313</span>
          </div>
          <div className="col-span-1 flex flex-col justify-center items-center gap-1">
            <img src={Doraemon} alt="Nhật Tâm" />
            <span>Nhật Tâm</span>
            <span>19110283</span>
          </div>
          <div className="col-span-1 flex flex-col justify-center items-center gap-1">
            <img src={Xizuka} alt="Xuân Thanh" />
            <span>Xuân Thanh</span>
            <span>19110285</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUsPage;
