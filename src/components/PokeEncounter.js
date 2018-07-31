import React from 'react';
import _ from 'lodash';
import Modal from './Modal';
import WildPokemon from './WildPokemon';

export default (props) => {
  const { inBattle, wildPokemon, catching, caught, gotOut, onRun, onCatch } = props;

  return (
    <Modal show={inBattle}>
      <WildPokemon
        wildPokemon={wildPokemon}
        catching={catching}
        caught={caught}
      />
      {
        wildPokemon && (
          gotOut ?
            <p>{_.capitalize(wildPokemon.name)} got out!</p> :
            <p>A wild {_.capitalize(wildPokemon.name)} appeared!</p>
        )
      }
      <button disabled={catching || caught} tabIndex='-1' className="modal-catch" onClick={onCatch}>
        Catch
      </button>
      <button disabled={catching || caught} tabIndex='-1' className="modal-run" onClick={onRun}>
        Run Away
      </button>
    </Modal>
  );
}