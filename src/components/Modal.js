import React from 'react';
import { Spring } from 'react-spring';
import { TimingAnimation, Easing } from 'react-spring/dist/addons';

export default (props) => {
  const { show, children } = props;

  const from = {
    opacity: 0
  }
  const to = {
    opacity: show ? 1 : 0
  }

  return (
    <Spring
      from={from}
      to={to}
      impl={TimingAnimation}
      config={{ duration: 200, easing: Easing.cubic }}
    >
      {
        (styles) => (
          <div className='modal-shade' style={styles}>
            <div className='modal-content'>
              {children}
            </div>
          </div>
        )
      }
    </Spring>
  );
}