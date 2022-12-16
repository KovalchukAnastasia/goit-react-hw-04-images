import { LoaderDiv } from './Loader.styled';
import { Watch } from 'react-loader-spinner';

const Loader = () => {
  return (
    <LoaderDiv>
      <Watch
        color="#ffffff"
        wrapperStyle={{
          position: 'fixed',
          top: 0,
          left: 20,
          width: 40,
          height: 40,
          zIndex: 1150,
        }}
      />
    </LoaderDiv>
  );
};

export default Loader;
