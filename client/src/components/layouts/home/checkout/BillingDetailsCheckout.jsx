import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { saveShippingInfo } from '../../../../actions/cartActions';
import Button from '../../../buttons/Button';

const shippingInfoSchema = Yup.object({
  name: Yup.string().required('Please enter your name.'),
  phone: Yup.string().required('Please enter your phone.'),
  email: Yup.string()
    .required('Please enter your email.')
    .email('Please enter valid email.'),
  delivery: Yup.string().required('Please enter your delivery address.'),
  note: Yup.string(),
});

const BillingDetailsCheckout = () => {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setFocus,
  } = useForm({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      delivery: '',
      note: '',
    },
    resolver: yupResolver(shippingInfoSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    setFocus('name');
  }, [setFocus]);

  const handlePlaceOrder = (data) => {
    dispatch(saveShippingInfo(data));
  };

  return (
    <form
      onSubmit={handleSubmit(handlePlaceOrder)}
      autoComplete="off"
      className="flex flex-col gap-6 p-5 text-lg bg-white"
    >
      <h5 className="text-xl font-semibold">Billing Details</h5>
      <div className="flex flex-col gap-2">
        <label htmlFor="name">
          Name <span className="text-red-600">*</span>
        </label>
        <div>
          <input
            type="text"
            className="w-full p-2 border border-gray-300"
            id="name"
            name="name"
            {...register('name')}
          />
        </div>
        {errors?.name && (
          <div className="text-sm text-red-500">{errors.name?.message}</div>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="phone">
          Phone number <span className="text-red-600">*</span>
        </label>
        <div>
          <input
            type="text"
            className="w-full p-2 border border-gray-300"
            id="phone"
            name="phone"
            {...register('phone')}
          />
        </div>
        {errors?.phone && (
          <div className="text-sm text-red-500">{errors.phone?.message}</div>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email">
          Email address <span className="text-red-600">*</span>
        </label>
        <div>
          <input
            type="email"
            className="w-full p-2 border border-gray-300"
            id="email"
            name="email"
            {...register('email')}
          />
        </div>
        {errors?.email && (
          <div className="text-sm text-red-500">{errors.email?.message}</div>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="delivery">
          Delivery address <span className="text-red-600">*</span>
        </label>
        <div>
          <input
            type="text"
            className="w-full p-2 border border-gray-300"
            id="delivery"
            name="delivery"
            {...register('delivery')}
          />
        </div>
        {errors?.delivery && (
          <div className="text-sm text-red-500">{errors.delivery?.message}</div>
        )}
      </div>
      <h5 className="mt-8 text-xl font-semibold">Additional informations</h5>
      <div className="flex flex-col gap-2">
        <label htmlFor="note">
          Order notes (optional) <span className="text-red-600">*</span>
        </label>
        <div className="mt-2 border border-gray-300">
          <textarea
            name="note"
            id="note"
            {...register('note')}
            cols="30"
            rows="7"
            placeholder="Notes about your order, e.g. special notes for delivery."
            className="w-full p-4 resize-none"
          ></textarea>
        </div>
        {errors?.note && (
          <div className="text-sm text-red-500">{errors.note?.message}</div>
        )}
      </div>
      <Button
        type="submit"
        className="text-lg text-black bg-white border border-black"
      >
        Save Shipping Info
      </Button>
    </form>
  );
};

export default BillingDetailsCheckout;
