import { token } from '@theme/token';
import { Spin } from 'antd';

function FullScreenSpin() {
  return (
    <Spin
      spinning
      fullscreen
      size="large"
      styles={{
        root: {
          backgroundColor: token.colorBg,
        },
        indicator: {
          color: token.colorPrimary,
        },
      }}
    />
  );
}

export default FullScreenSpin;
