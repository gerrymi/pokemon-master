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
        <h1><small>A wild {_.capitalize(wildPokemon.name)} appeared!</small></h1>
        <div className="modal-actions">
          <button tabIndex='-1' className="modal-button" onClick={onRun}>
            Run<span>(escape)</span>
          </button>
          <button tabIndex='-1' className="modal-button" onClick={onCatch}>
            Catch<span>(enter)</span>
          </button>
        </div>
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