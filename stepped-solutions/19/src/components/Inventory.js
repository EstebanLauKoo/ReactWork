import React from 'react';
import AddFishForm from './AddFishForm';

class Inventory extends React.Component {

  renderLogin() {
      return(
      <nav className="login">
          <h2>Inventory</h2>
          <p>Sign in to manage your store's inventory</p>
          <button className="github" onClick={() => this.authenticate('github')}>
              Log In with Github
          </button>
          <button className="facebook" onClick={() => this.authenticate('facebook')}>
              Log In with Facebook
          </button>
      </nav>
      )}

  render() {



    return (
      <div>
        <h2>Inventory</h2>
        <AddFishForm addFish={this.props.addFish}/>
        <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      </div>
    )
  }
}

export default Inventory;
