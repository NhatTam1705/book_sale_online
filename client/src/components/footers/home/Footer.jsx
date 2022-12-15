import emailjs from '@emailjs/browser';
import { useSnackbar } from 'notistack';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { SiFacebook, SiInstagram, SiMessenger, SiTiktok } from 'react-icons/si';
import Logo from '../.../../../../assets/images/logo.png';
import FooterPayment from '../../../assets/images/payment.png';
import i18n from '../../../i18n';
import Button from '../../buttons/Button';

const footerData = [
  {
    title: 'Explore',
    subTitle: [
      {
        title: 'Home',
        link: '/home',
      },
      {
        title: 'Shop',
        link: '/shop',
      },
      {
        title: 'Author',
        link: '/author',
      },
      {
        title: 'Blog',
        link: '/blog',
      },
    ],
  },
  {
    title: 'Customer Service',
    subTitle: [
      {
        title: 'Help Center',
        link: '/help_center',
      },
      {
        title: 'Returns',
        link: '/returns',
      },
      {
        title: 'About Us',
        link: '/about_us',
      },
      {
        title: 'Contact_us',
        link: '/contact_us',
      },
    ],
  },
  {
    title: 'Policy',
    subTitle: [
      {
        title: 'Return Policy',
        link: '/return_policy',
      },
      {
        title: 'Terms Of Use',
        link: '/terms_of_use',
      },
      {
        title: 'Security',
        link: '/security',
      },
      {
        title: 'Privacy',
        link: '/privacy',
      },
    ],
  },
  {
    title: 'Categories',
    subTitle: [
      {
        title: 'New Book',
        link: '/new_book',
      },
      {
        title: 'On Sale',
        link: '/on_sale',
      },
      {
        title: 'Most Reviewed',
        link: '/most_reviewed',
      },
      {
        title: 'Featured',
        link: '/featured',
      },
    ],
  },
];

const Footer = () => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_nr38kcl',
        'template_rh2qb8n',
        form.current,
        '6vOEUlMILzRBORbKi'
      )
      .then(
        (result) => {
          enqueueSnackbar('Sent a message to MeoMeo - Store', {
            variant: 'success',
          });
        },
        (error) => {
          console.log(error);
          enqueueSnackbar(error, { variant: 'error' });
        }
      );
  };
  return (
    <>
      <div className="px-12 py-12 text-lg border border-gray-300">
        <div className="container grid max-w-3xl py-5 mx-auto">
          <h1 className="text-3xl font-medium text-center">Feedback</h1>
          <p className="text-lg text-center">
            Give suggestions to improve the website
          </p>
          <form
            ref={form}
            onSubmit={sendEmail}
            autoComplete="off"
            className="grid mt-5 xl:grid-cols-4 lg:grid-cols-4 sm:grid-cols-3 gap-7 md:grid-cols-4"
          >
            <input
              placeholder="Enter your message."
              className="border border-[#161619] indent-5 col-span-3 h-14"
              name="message"
              id=""
            />
            <Button
              type="submit"
              className={`col-span-1 text-white h-14 sm:col-start-2 md:col-start-4 xl:col-start-4 lg:col-start-4 cursor-pointer `}
            >
              Subscribe
            </Button>
          </form>
        </div>
        <div className="grid justify-between w-full grid-cols-2 gap-10 py-5 mx-auto xl:grid-cols-6 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 ">
          <div className="grid col-span-2 gap-y-3">
            <img src={Logo} alt="Logo" className="" />
            <p className="">
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
          {t('footer.contactFooter', { returnObjects: true }).map(
            (item, index) => (
              <div key={item.title} className="grid col-span-1 ">
                <h4 className="text-xl font-medium">{item.title}</h4>
                <ul className="space-y-2 ">
                  {item.subTitle.map((subItem, subIndex) => (
                    <li
                      key={subItem.title}
                      className="hover:translate-x-[20px] transition-all duration-500"
                    >
                      <a href={subItem.link} className=" hover:text-orange-600">
                        {subItem.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>
      </div>
      <div className="px-12 border-b border-gray-300 border-x">
        <div className="grid items-center w-full grid-cols-3 py-5 mx-auto xl:grid-cols-10 lg:grid-cols-6 md:grid-cols-6 sm:grid-cols-3 gap-y-5">
          <p className="flex items-center justify-center col-span-4 text-lg text-center lg:col-start-2 xl:col-start-1 md:col-start-2">
            © {new Date().getFullYear()} Nhat Tam - Thanh Van. All rights
            reserved
          </p>
          <img
            src={FooterPayment}
            alt="Payment Method"
            className="w-full col-span-3 px-3"
          />
          <div className="col-span-3 grid grid-cols-3 gap-5 h-[45px]">
            <div className="col-span-2 p-2 border border-gray-200">
              <select
                onChange={(e) => i18n.changeLanguage(e.target.value)}
                className="w-full"
                name=""
                id=""
              >
                <option value="en">English (United States)</option>
                <option value="vi">Việt Nam</option>
                {/* <option value="fra">Français</option>
                <option value="esp">Español</option> */}
              </select>
            </div>
            <div className="col-span-1 p-2 border border-gray-200">
              <select className="w-full" name="" id="">
                <option value="usd">$ USD</option>
                <option value="eur">€ EUR</option>
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
