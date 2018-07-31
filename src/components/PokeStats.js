import React from 'react';

export default (props) => {
  return (
    <div className="poke-stats">
      <img src={require('../images/pokeball.gif')} alt="" />
      <span> x {props.ballCount}</span>
    </div>
  );
}