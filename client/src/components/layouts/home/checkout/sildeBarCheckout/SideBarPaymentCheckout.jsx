import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { HiMinus, HiPlus } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeAllCartAndInformation } from '../../../../../actions/cartActions';
import { clearErrors, createOrder } from '../../../../../actions/orderActions';
import Button from '../../../../buttons/Button';

const options = {
  style: {
    base: {
      fontSize: '16px',
    },
    invalid: {
      color: '#9e2146',
    },
  },
};

const SideBarPaymentCheckout = ({ price: itemsPrice }) => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const elements = useElements();
  const stripe = useStripe();
  const [show, setShow] = useState(true);
  const [value, setValue] = useState('cash');
  const [paymentMethod, setPaymentMethod] = useState('Cash on delivery');
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const {
    error,
    order: newOrder,
    loading,
  } = useSelector((state) => state.newOrder);
  const { user } = useSelector((state) => state.auth);
  let shippingPrice = itemsPrice > 200 ? 0 : 25;
  let totalPrice = itemsPrice + shippingPrice;

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: 'error' });
      dispatch(clearErrors());
    }
  }, [dispatch, error, enqueueSnackbar, loading, navigate]);

  useEffect(() => {
    setPaymentMethod(
      value === 'cash' ? 'Cash on delivery' : 'Direct bank transfer'
    );
  }, [value]);

  const order = {
    orderItems: cartItems,
    shippingInfo,
    itemsPrice,
    shippingPrice,
    totalPrice,
    paymentMethod,
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const paymentData = {
    amount: Math.round(totalPrice * 100),
  };

  const handlePlacePayment = async (event) => {
    event.preventDefault();
    document.querySelector('#pay_btn').disabledButton = true;
    document.querySelector('#pay_btn').className =
      'w-full h-16 mt-3 text-lg text-white bg-black bg-gray-500 cursor-not-allowed';
    let res;
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      res = await axios.post('/api/v1/payment/process', paymentData, config);

      const clientSecret = res.data.client_secret;

      if (!stripe || !elements) {
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      });

      if (result.error) {
        enqueueSnackbar(result.error.message, { variant: 'error' });
        document.querySelector('#pay_btn').disabledButton = false;
        document.querySelector('#pay_btn').className =
          'w-full h-16 mt-3 text-lg text-white bg-black';
      } else {
        // The payment is processed or not
        if (result.paymentIntent.status === 'succeeded') {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          dispatch(createOrder(order));
          dispatch(removeAllCartAndInformation());
          navigate('/profile/orders');
        } else {
          enqueueSnackbar('This is some issue while payment processing', {
            variant: 'error',
          });
        }
      }
    } catch (error) {
      document.querySelector('#pay_btn').disabledButton = false;
      document.querySelector('#pay_btn').className =
        'w-full h-16 mt-3 text-lg text-white bg-black';
      enqueueSnackbar(error.response.data.message, { variant: 'error' });
    }
  };

  const handlePlaceOrder = (event) => {
    event.preventDefault();
    dispatch(createOrder(order));
    dispatch(removeAllCartAndInformation());
    navigate('/profile/orders');
  };

  return (
    <>
      <div className="flex flex-col gap-5 px-8 py-6 text-xl bg-white border border-gray-300">
        <div className="flex flex-row items-center justify-between font-semibold ">
          <span>Payment</span>
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
                onChange={handleChange}
              >
                <FormControlLabel
                  value="cash"
                  control={<Radio />}
                  label="Cash on delivery"
                />
                <FormControlLabel
                  value="bank"
                  control={<Radio />}
                  label="Direct bank transfer"
                />
              </RadioGroup>
            </FormControl>
            {value === 'bank' ? (
              <>
                <form
                  className="flex flex-col gap-3 p-6 border border-gray-300 rounded-lg"
                  autoComplete="off"
                  onSubmit={handlePlacePayment}
                >
                  <h1 className="text-xl font-medium text-center">Card Info</h1>
                  <div className="form-group">
                    <label htmlFor="card_num_field">Card Number</label>
                    <CardNumberElement
                      type="text"
                      id="card_num_field"
                      className="p-2 border border-gray-300 rounded-md form-control"
                      options={options}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="card_exp_field">Card Expiry</label>
                    <CardExpiryElement
                      type="text"
                      id="card_exp_field"
                      className="p-2 border border-gray-300 rounded-md form-control"
                      options={options}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="card_cvc_field">Card CVC</label>
                    <CardCvcElement
                      type="text"
                      id="card_cvc_field"
                      className="p-2 border border-gray-300 rounded-md form-control"
                      options={options}
                    />
                  </div>
                  <Button
                    id="pay_btn"
                    type={shippingInfo.name === undefined ? '' : 'submit'}
                    disabledButton={
                      shippingInfo.name === undefined ? true : false
                    }
                    className={`w-full h-16 mt-3 text-lg text-white bg-black ${
                      shippingInfo.name === undefined
                        ? 'cursor-not-allowed bg-gray-500'
                        : ''
                    }`}
                  >
                    Pay {totalPrice && `- ${totalPrice}$`}
                  </Button>
                </form>
              </>
            ) : (
              <>
                <Button
                  onClick={handlePlaceOrder}
                  disabledButton={
                    shippingInfo.name === undefined ? true : false
                  }
                  className={`w-full h-16 mt-8 text-lg text-white bg-black ${
                    shippingInfo.name === undefined
                      ? 'cursor-not-allowed bg-gray-500'
                      : ''
                  }`}
                >
                  Place order
                </Button>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default SideBarPaymentCheckout;
