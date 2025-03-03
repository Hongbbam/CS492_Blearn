import { useWindowSize } from '@react-hook/window-size';
import React from 'react';

interface Props {
  isFooterPresent: boolean;
  ref_?: React.RefObject<HTMLDivElement>;
}

const ContentPadding: React.FC<Props> = ({ isFooterPresent, ref_, children }) => {
  const [width] = useWindowSize();

  return (
    <div
      ref={ref_}
      className="py-8 overflow-y-auto overflow-x-hidden flex justify-center w-full"
      style={{
        height: `calc(100 * var(--wh) - env(safe-area-inset-top, 0px) - env(safe-area-inset-bottom, 0px) - ${isFooterPresent ? 140 : 64}px)`,
        paddingLeft: `calc(env(safe-area-inset-left, 0px) + ${width >= 960 ? 32 : 24}px)`,
        paddingRight: `calc(env(safe-area-inset-right, 0px) + ${width >= 960 ? 32 : 24}px)`,
      }}
    >
      <div className="w-full h-fit my-auto" style={{ maxWidth: 1184 }}>
        {children}
      </div>
    </div>
  );
};

export default ContentPadding;
