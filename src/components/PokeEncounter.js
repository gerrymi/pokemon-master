import React from 'react';
import _ from 'lodash';
import { Spring } from 'react-spring';
import { TimingAnimation, Easing } from 'react-spring/dist/addons';

export default (props) => {
  const { wildPokemon, inBattle, onRun, onCatch } = props;

  const content = (styles) => (
    <div className='modal-shade' style={styles}>
      <div className='modal-content'>
        <img className="sprite" src={wildPokemon.sprites.front_default} alt={wildPokemon.sprites.front_default} />
        <p><small>A wild {_.capitalize(wildPokemon.name)} appeared!</small></p>
          <button tabIndex='-1' className="modal-catch" onClick={onCatch}>
            Catch
          </button>
          <button tabIndex='-1' className="modal-run" onClick={onRun}>
            Run Away
          </button>
      </div>
    </div>
  )
  const from = {
    opacity: 0
  }
  const to = {
    opacity: inBattle ? 1 : 0
  }
  return wildPokemon ? (
    <Spring
      from={from}
      to={to}
      impl={TimingAnimation}
      config={{ duration: 200, easing: Easing.cubic }}
    >
      {content}
    </Spring>
  ) : null;
}