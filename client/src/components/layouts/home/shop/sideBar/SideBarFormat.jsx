import { useEffect, useState } from 'react';
import { HiMinus, HiPlus } from 'react-icons/hi';

const formats = [
  {
    label: 'Paper back',
    active: false,
  },
  {
    label: 'Hard cover',
    active: false,
  },
];

const SideBarFormat = ({ fallbackFormat }) => {
  const [show, setShow] = useState(false);
  const [format, setFormat] = useState('');
  useEffect(() => {
    fallbackFormat(format);
  }, [fallbackFormat, format]);
  return (
    <>
      <div className="border-gray-300 border px-8 py-6 flex flex-col gap-5 text-xl">
        <div className=" flex flex-row justify-between font-semibold items-center">
          <span>Format</span>
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
            <div className="flex flex-col gap-3 text-lg">
              {formats &&
                formats.map((format, index) => (
                  <span
                    key={index}
                    onClick={() => {
                      setFormat(format.label);
                      formats.map((type, index) => (type.active = false));
                      format.active = true;
                    }}
                    className={`cursor-pointer hover:text-orange-600 ${
                      format.active ? 'text-orange-600' : ''
                    }`}
                  >
                    {format.label}
                  </span>
                ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SideBarFormat;
