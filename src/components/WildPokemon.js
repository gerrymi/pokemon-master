import React from 'react';
import { Keyframes, config } from 'react-spring';
// import { TimingAnimation, Easing } from 'react-spring/dist/addons';

export default (props) => {
  const { wildPokemon, catching, caught} = props;

  const from = {
    transform: 'translate(-50%, 40px) rotate(-135deg)',
    top: '0px',
    left: '-10%',
    opacity: 1,
    backgroundColor: 'white',
  };

  const ballThrown = {
    transform: 'translate(-50%, 40px) rotate(0deg)',
    top: '0px',
    left: '50%',
  }

  const ballHits = {
    opactiy: 1,
    backgroundColor: 'red',
  };

  const pokemonAbsorbed = {
    opacity: 0,
    backgroundColor: 'red',
  }

  const fast = { ...config.stiff, restSpeedThreshold: 1, restDisplacementThreshold: 0.01 }

  const FieldOfEncounter = Keyframes.Spring({
    appearing: { from, config: config.gentle },
    catching: [
      { from, to: ballThrown, config: fast },
      { to: ballHits, config: config.wobbly },
      { to: pokemonAbsorbed, config: config.slow },
    ],
    caught: { from: pokemonAbsorbed, config: config.gentle },
    idle: { from: pokemonAbsorbed, to: from, config: config.gentle },
  })

  const content = ({ backgroundColor, opacity, ...pokeballStyles }) => {
    const sprite = wildPokemon && wildPokemon.sprites.front_default;
    const pokemonStyles = {
      backgroundImage: `url(${sprite})`,
      WebkitMaskImage: `url(${sprite})`,
      backgroundColor,
      opacity,
    };
    return (
      <div className="wild-pokemon">
        <div style={pokemonStyles} className="sprite-pokemon" />
        <div style={pokeballStyles} className="sprite-pokeball">
          <img src={require('../images/pokeball_spinning.gif')} alt="" />
        </div>
      </div>
    );
  };

  const catchingState =
    (caught) ? 'caught' :
    (catching === null) ? 'appearing' :
    (catching) ? 'catching' : 'idle';
  return wildPokemon ? (
    <FieldOfEncounter state={catchingState}>
      {content}
    </FieldOfEncounter>
  ) : null;
}