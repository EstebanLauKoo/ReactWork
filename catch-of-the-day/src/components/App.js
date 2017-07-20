import React from 'react';

// This will grab the Header from component 'Header.js'
// first part is what you call it in this file
import Header from './Header';

// Importing Order component
import Order from './Order';

// Importing Inventory component
import Inventory from './Inventory';

import sampleFishes from '../sample-fishes';

import Fish from './Fish'

// Importing the base configs and connection to the app.js file
import base from '../base';

class App extends React.Component {

    constructor() {
        // initialize the component
        super();
        // bind the method so we can use
        this.removeFromOrder = this.removeFromOrder.bind(this);
        this.removeFish = this.removeFish.bind(this);
        this.updateFish = this.updateFish.bind(this);
        this.addToOrder = this.addToOrder.bind(this);
        this.loadSamples = this.loadSamples.bind(this);
        this.addFish = this.addFish.bind(this);
        // sets the initial state
        this.state = {
            fishes: {},
            order: {}
        }
    }

    // This method comes from react. This is a lifecycle
    componentWillMount() {
        // This runs right before the <app> is rendered
        this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        })

        //check if there is any order in localstorage
        const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`)

        if(localStorageRef) {
            this.setState({
                order: JSON.parse(localStorageRef)
            })
        }
    }

    componentWillUnmount () {
        base.removeBinding(this.ref);
    }

    componentWillUpdate (nextProps, nextState) {
        localStorage.setItem(`order-${this.props.params.storeId}`,
        JSON.stringify(nextState.order));
    }

    addToOrder(key) {
        // This is the initial grab for state
        const order = {...this.state.order};
        // This adds the new fish
        // logic is saying this order at this key is either going to be plus 1 or if there is none put 1
        order[key] = order[key] +1 || 1;
        // Update your state this is basically saying put this new order object into the state order
        this.setState( { order: order } )

    }

    addFish(fish) {
        // This will grab the initial state before change
        const fishes = {...this.state.fishes};
        // this will add the new fish
        const timestamp = Date.now()
        fishes[`fish-${timestamp}`] = fish;
        // set it as state
        this.setState({ fishes });
    }

    updateFish(key, updatedFish) {
        const fishes = {...this.state.fishes};
        fishes[key] = updatedFish
        this.setState({ fishes: fishes })
    }

    removeFish(key) {
        const fishes = {...this.state.fishes};
        fishes[key] = null;
        this.setState({ fishes });
    }

    removeFromOrder(key) {
        const order = {...this.state.order};
        delete order[key];
        this.setState( { order } );
    }

    loadSamples() {
        this.setState({
            fishes: sampleFishes
        })
    }

    render() {
        return(
            <div className="catch-of-the-day">
                <div className="menu">
                    { /* this is passing in a prop with the key of 'tagline' and a value */}
                    <Header tagline="Fresh Seafood Market"/>
                    <ul className="list-of-fishes">
                        {Object
                            .keys(this.state.fishes)
                            .map(key => <Fish index={key} addToOrder={this.addToOrder} key={key} details={this.state.fishes[key]}/>)
                        }
                    </ul>
                </div>
                <Order
                    fishes={this.state.fishes}
                    order={this.state.order}
                    params={this.props.params}
                    removeFromOrder={this.removeFromOrder}
                />
                <Inventory
                    fishes={this.state.fishes}
                    addFish={this.addFish}
                    loadSamples={this.loadSamples}
                    updateFish={this.updateFish}
                    removeFish={this.removeFish}
                    storeId={this.props.params.storeId}
                />
            </div>
        )
    }
}

App.propTypes = {
    params: React.PropTypes.object.isRequired
}

export default App;