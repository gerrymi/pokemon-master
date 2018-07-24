import React from 'react';

const PokeTrainer = (props) => {
  const { mapPosition, children } = props;
  return (
    <div className='map' style={{ backgroundPosition: mapPosition }}>
      {children}
    </div>
  );
}

export default PokeTrainer;