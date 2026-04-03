import useToken from '@hooks/useToken';
import { Spin } from 'antd';

function FullScreenSpin() {
  const token = useToken();

  return (
    <Spin
      spinning
      fullscreen
      size="large"
      styles={{
        root: {
          backgroundColor: token.colorBgBase,
        },
        indicator: {
          color: token.colorPrimary,
        },
      }}
    />
  );
}

export default FullScreenSpin;
