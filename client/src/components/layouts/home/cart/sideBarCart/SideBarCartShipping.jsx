import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { HiMinus, HiPlus } from 'react-icons/hi';

const SideBarCartShipping = ({ price }) => {
  const [show, setShow] = useState(true);
  const [value, setValue] = useState(price > 200 ? 'freeShip' : 'noneFreeShip');

  useEffect(() => {
    setValue(price > 200 ? 'freeShip' : 'noneFreeShip');
  }, [price]);

  return (
    <>
      <div className="flex flex-col gap-5 px-8 py-6 text-xl bg-white border border-gray-300">
        <div className="flex flex-row items-center justify-between font-semibold ">
          <span>Shipping</span>
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
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
              >
                <FormControlLabel
                  value="freeShip"
                  control={<Radio />}
                  label="Free Shipping"
                  disabled={value === 'freeShip' ? false : true}
                />
                <FormControlLabel
                  value="noneFreeShip"
                  control={<Radio />}
                  label="None Free Shipping: 25$"
                  disabled={value === 'noneFreeShip' ? false : true}
                />
              </RadioGroup>
            </FormControl>
          </>
        )}
      </div>
    </>
  );
};

export default SideBarCartShipping;
