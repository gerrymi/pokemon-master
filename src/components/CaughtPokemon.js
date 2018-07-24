import React from 'react';

const CaughtPokemon = (props) => {
  const { pokemon } = props;
  return (
    <div className="caught-pokemon">
      {
        pokemon.map((p, i) => (
          <img
            key={`${i}_${p.name}`}
            src={p.sprites.front_default}
            alt={p.name}
          />
        ))
      }
    </div>
  );
}

export default CaughtPokemon;