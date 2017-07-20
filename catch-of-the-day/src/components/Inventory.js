import React from 'react';
import AddFishForm from './AddFishForm'
import base from '../base';
class Inventory extends React.Component {

    constructor () {
        super();
        this.renderLogin = this.renderLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.renderInventory = this.renderInventory.bind(this);
        this.authenticate = this.authenticate.bind(this);
        this.authHandler = this.authHandler.bind(this);
        this.logout = this.logout.bind(this);
        this.state = {
            uid: null,
            owner: null
        }
    }

    componentDidMount() {
        base.onAuth((user) => {
            if (user) {
                this.authHandler(null, {user});
            }
        })
    }

    logout() {
        base.unauth();
        this.setState({ uid : null })
    }

    authenticate(provider) {
        console.log(`Trying to log in with ${provider}`);

        base.authWithOAuthPopup(provider, this.authHandler)
    }

    authHandler(err, authData) {
        console.log(`AuthData: ${authData}`)
        if (err) {
            console.log(err);
            return;
        }

        const storeRef = base.database().ref(this.props.storeId);

        storeRef.once('value', (snapshot) => {
            const data = snapshot.val() || {};

            if(!data.owner) {
                storeRef.set({
                    owner: authData.user.uid
                })
            }

            this.setState({
                uid: authData.user.uid,
                owner: data.owner || authData.user.uid
            })
        })
    }

    handleChange(e, key) {
        const fish = this.props.fishes[key];
        //take a copy of fish and update it
        const updatedFish = {
            ...fish,
            [e.target.name] : e.target.value
        }
        //e.target.name gives me the key of the value that changed
        //e.target.value gives me the new value
        this.props.updateFish(key, updatedFish);
    }

    renderLogin() {
        return (
          <nav className="login">
              <h2>Inventory</h2>
              <p>Sign in to manage your store's inventory</p>
              <button className="facebook" onClick={() => this.authenticate('facebook')}>Log In with Facebook</button>
              <button className="github" onClick={() => this.authenticate('github')}>Log in with Github</button>
          </nav>
        )}


    renderInventory(key) {
        const fish = this.props.fishes[key];

        return (
            <div className="fish-edit" key={key}>
                <input type="text" placeholder="Fish Name" name="name" value={fish.name}
                       onChange={(e) => this.handleChange(e, key)}
                />
                <input type="text" placeholder="Fish Price" name="price" value={fish.price}
                        onChange={(e) => this.handleChange(e, key)}
                />
                <select type="text" placeholder="Fish Status" name="status" value={fish.status}
                        onChange={(e) => this.handleChange(e, key)}
                >
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea type="text" placeholder="Fish Desc" name="desc" value={fish.desc}
                          onChange={(e) => this.handleChange(e, key)}
                ></textarea>
                <input  type="text" placeholder="Fish Image" name="image" value={fish.image}
                        onChange={(e) => this.handleChange(e, key)}
                />
                <button onClick={() => this.props.removeFish(key)}>Remove Fish</button>
            </div>
        )
    }

    render () {
        const logout = <button onClick={this.logout}>Log Out</button>
        if  (!this.state.uid) {
            return (
                <div>
                    {this.renderLogin()}
                </div>
            )
        }

        if (this.state.uid !== this.state.owner) {
            return(
                <div>
                    <p>Sorry you aren't the owner!</p>
                    {logout}
                </div>
            )
        }

        return (
            <div>
                <h2>Inventory</h2>
                {logout}
                {Object.keys(this.props.fishes).map(this.renderInventory)}
                <AddFishForm addFish={this.props.addFish}/>
                <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
            </div>
        )
    }
}

const { object, func, string } = React.PropTypes;

Inventory.propTypes = {
    fishes: object.isRequired,
    updateFish : func.isRequired,
    removeFish : func.isRequired,
    addFish: func.isRequired,
    loadSamples: func.isRequired,
    storeId: string.isRequired
}



export default Inventory;