import React, { Component } from 'react';
import './App.css';
import PokeMap from './components/PokeMap';
import PokeStats from './components/PokeStats';
import PokeTrainer from './components/PokeTrainer';
import PokeEncounter from './components/PokeEncounter';
import PokeCaught from './components/PokeCaught';

class App extends Component {
  constructor(props) {
    super(props);
    this._getWildPokemon = this._getWildPokemon.bind(this);
    this._keyDownHandler = this._keyDownHandler.bind(this);
    this._keyUpHandler = this._keyUpHandler.bind(this);
    this._walk = this._walk.bind(this);
    this._stand = this._stand.bind(this);
    this._onRun = this._onRun.bind(this);
    this._onCatch = this._onCatch.bind(this);
    this._throwBall = this._throwBall.bind(this);
    this.state = {
      isLoading: false,
      inBattle: false,
      catching: null,
      caught: false,
      gotOut: false,
      mapPosition: 0,
      isWalking: false,
      direction: 'right',
      ballParts: 0,
      pokemon: [],
      wildPokemon: null
    }
  }

  _pokemonRange = 151;
  _encounterRate = .05;
  _catchRate = .15;
  _ballRate = 0.10;
  _walkSpeed = 32;

  componentDidMount() {
    this._app.focus();
  }

  _getWildPokemon() {
    var randomNum = Math.floor(Math.random() * this._pokemonRange + 1)
    this.setState({
      isLoading: true
    })
    fetch(`https://pokeapi.co/api/v2/pokemon/${randomNum}/`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({
          wildPokemon: json,
          isLoading: false,
          inBattle: true,
          catching: null,
          caught: false,
        });
      });
  }

  _walk(direction) {
    const { isWalking, ballParts } = this.state;
    const plusMinus = direction === 'right' ? -1 : 1;
    this.setState({
      isWalking: !isWalking,
      direction,
      ballParts: ballParts + 1,
      mapPosition: this.state.mapPosition + (this._walkSpeed * plusMinus)
    }, () => {
      if (this._getBallCount() &&
        this._encounterRate >= Math.random()) {
        !this.state.isLoading && this._getWildPokemon();
      }
    })
  }

  _stand() {
    this.setState({
      isWalking: false
    });
  }

  _keyDownHandler(e) {
    if (this.state.inBattle) {
      if (e.keyCode === 27) {
        this._onRun();
      }
      if (e.keyCode === 13) {
        this._onCatch();
      }
    } else {
      if (e.keyCode === 39) {
        this._walk('right');
      }
      if (e.keyCode === 37) {
        this._walk('left');
      }
    }
  }

  _keyUpHandler(e) {
    if (!this.state.inBattle) {
      if ([37, 39].indexOf(e.keyCode) > -1) {
        this._stand();
      }
    }
  }

  _onRun() {
    if (!this.state.catching && !this.state.caught) {
      this.setState({
        inBattle: false
      });
    }
  }

  _onCatch() {
    if (!this.state.catching && !this.state.caught) {
      this._throwBall();
    }
  }

  _throwBall() {
    const { ballParts, pokemon, wildPokemon } = this.state;
    const oneBall = 1 / this._ballRate;
    this.setState({
      catching: true,
      ballParts: ballParts - oneBall
    }, () => {
      console.log(this._getBallCount())
      if (this._catchRate >= Math.random()) {
        setTimeout(() => {
          this.setState({
            caught: true,
            inBattle: false,
            pokemon: [...pokemon, wildPokemon]
          })
        }, 2500);
      } else if (!this._getBallCount()) {
        setTimeout(() => {
          this.setState({
            catching: false,
            inBattle: false,
          })
        }, 2500)
      } else {
        setTimeout(() => {
          this.setState({
            catching: false,
            gotOut: true,
          })
        }, 2500)
      }
    });
  }

  _getBallCount() {
    return Math.floor(this.state.ballParts * this._ballRate)
  }

  _getAppProps() {
    return {
      ref: (r) => this._app = r,
      className: 'App',
      tabIndex: '0',
      onKeyDown: this._keyDownHandler,
      onKeyUp: this._keyUpHandler
    }
  }
  render() {
    const {
      inBattle,
      catching,
      caught,
      gotOut,
      mapPosition,
      isWalking,
      direction,
      pokemon,
      wildPokemon
    } = this.state;
    return (
      <div {...this._getAppProps()}>
        <PokeMap mapPosition={mapPosition}>
          <PokeStats ballCount={this._getBallCount()}/>
          <PokeTrainer isWalking={isWalking} direction={direction} />
          <PokeCaught pokemon={pokemon} />
          <PokeEncounter
            wildPokemon={wildPokemon}
            catching={catching}
            caught={caught}
            gotOut={gotOut}
            inBattle={inBattle}
            onRun={this._onRun}
            onCatch={this._onCatch}
          />
        </PokeMap>
      </div>
    );
  }
}

export default App;