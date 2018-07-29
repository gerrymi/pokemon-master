import React from 'react';

const PokeTrainer = (props) => {
  const { mapPosition, children } = props;
  // Parallax
  const landPosition = `${mapPosition}px center`
  const skyPosition = `${mapPosition/16}px top`
  return (
    <div className='map' style={{ backgroundPosition: landPosition }}>
      <div className='sky' style={{ backgroundPosition: skyPosition }} />
      {children}
    </div>
  );
}

export default PokeTrainer;