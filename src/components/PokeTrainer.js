import React from 'react';

const PokeTrainer = (props) => {
  const { direction, isWalking } = props;
  const playerClasses = ['poke-trainer'];
  const position = isWalking ? 'step' : 'stand';
  playerClasses.push(direction);
  return (
    <img
      className={playerClasses.join(' ')}
      src={require(`../images/ash_pikachu_${position}.gif`)}
      alt=''
    />
  );
}

export default PokeTrainer;