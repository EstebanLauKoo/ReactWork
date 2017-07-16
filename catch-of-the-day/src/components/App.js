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

class App extends React.Component {

    constructor() {
        // initialize the component
        super();
        // bind the method so we can use
        this.addToOrder = this.addToOrder.bind(this);
        this.loadSamples = this.loadSamples.bind(this);
        this.addFish = this.addFish.bind(this);
        // sets the initial state
        this.state = {
            fishes: {},
            order: {}
        }
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
                <Order fishes={this.state.fishes} order={this.state.order}/>
                <Inventory addFish={this.addFish} loadSamples={this.loadSamples}/>
            </div>
        )
    }
}

export default App;