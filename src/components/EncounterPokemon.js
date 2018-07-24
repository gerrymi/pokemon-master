import React from 'react';

const EncounterPokemon = (props) => {
  const { wildPokemon, inBattle, onRun, onCatch } = props;
  if (!inBattle) { return false }
  const name = wildPokemon.name.charAt(0).toUpperCase() + wildPokemon.name.substring(1);
  return (
    <div className='modal-shade'>
      <div className='modal-content'>
        <img className="sprite" src={wildPokemon.sprites.front_default} alt={wildPokemon.sprites.front_default} />
        <h1><small>A wild {name} appeared!</small></h1>
        <div className="modal-actions">
          <button className="modal-button" onClick={onRun}>
            Run<span>(escape)</span>
          </button>
          <button className="modal-button" onClick={onCatch}>
            Catch<span>(enter)</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default EncounterPokemon;