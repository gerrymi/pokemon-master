import React from 'react';
import { Transition } from 'react-spring';
import { TimingAnimation, Easing } from 'react-spring/dist/addons';

const CaughtPokemon = (props) => {
  const { pokemon } = props;
  const from = {
    opacity: 0,
    transform: 'scale(0)'
  }

  const enter = {
    opacity: 1,
    transform: 'scale(1)'
  }

  const leave = {
    opacity: 0,
    transform: 'scale(0)'
  }
  return (
    <div className="caught-pokemon">
      <Transition
        keys={pokemon.map((p, i) => `${i}_${p.name}`)}
        from={from}
        enter={enter}
        leave={leave}
        impl={TimingAnimation}
        config={{ duration: 1000, easing: Easing.bounce }}
      >
        {
          pokemon.map((p) => (
            (styles) => (
              <img
                style={styles}
                key={p.key}
                src={p.sprites.front_default}
                alt={p.name}
              />
            )
          ))
        }
      </Transition>
    </div>
  );
}

export default CaughtPokemon;