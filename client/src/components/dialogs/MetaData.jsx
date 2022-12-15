import { Helmet } from 'react-helmet-async';

const MetaData = ({ title }) => {
  return (
    <Helmet>
      <title>{`${title} | MeoMeo - Store`}</title>
    </Helmet>
  );
};

export default MetaData;
