import React from 'react';

export default (props) => {
  const { ballCount, ballRate } = props;

  return (
    <div className="poke-stats">
      <img src={require('../images/pokeball.gif')} alt=""/>
      <span> x {Math.floor(ballCount * ballRate)}</span>
    </div>
  );
}