import { Checkbox } from '@mui/material';
import { useEffect, useState } from 'react';
import { HiMinus, HiPlus } from 'react-icons/hi';

const languages = [
  {
    label: 'Vietnamese',
    checked: false,
  },
  {
    label: 'English',
    checked: false,
  },
];

const SideBarLanguage = ({ fallbackLanguage }) => {
  const [show, setShow] = useState(false);
  const [language, setLanguage] = useState('');

  useEffect(() => {
    fallbackLanguage(language);
  }, [language, fallbackLanguage]);

  return (
    <>
      <div className="flex flex-col gap-5 px-8 py-6 text-xl border border-gray-300">
        <div className="flex flex-row items-center justify-between font-semibold ">
          <span>Language</span>
          {show ? (
            <HiMinus
              className="cursor-pointer"
              onClick={() => setShow((prev) => !prev)}
            ></HiMinus>
          ) : (
            <HiPlus
              className="cursor-pointer"
              onClick={() => setShow((prev) => !prev)}
            ></HiPlus>
          )}
        </div>
        {show && (
          <>
            <div className="flex flex-col gap-1">
              {languages &&
                languages.map((language, index) => (
                  <div
                    className="flex items-center"
                    key={index}
                    onClick={() => {
                      if (language.checked) {
                        setLanguage('');
                        languages.map((lan, index) => (lan.checked = false));
                      } else {
                        setLanguage(language.label);
                        languages.map((lan, index) => (lan.checked = false));
                        language.checked = true;
                      }
                    }}
                  >
                    <Checkbox
                      checked={language.checked}
                      sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                    />
                    <span
                      className={`text-lg my-auto cursor-pointer hover:text-orange-600 ${
                        language.checked ? 'text-orange-500' : ''
                      }`}
                    >
                      {language.label}
                    </span>
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SideBarLanguage;
