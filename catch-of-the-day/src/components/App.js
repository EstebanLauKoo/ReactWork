import React from 'react';

// This will grab the Header from component 'Header.js'
// first part is what you call it in this file
import Header from './Header';

// Importing Order component
import Order from './Order';

// Importing Inventory component
import Inventory from './Inventory';


class App extends React.Component {
    render() {
        return(
            <div className="catch-of-the-day">
                <div className="menu">
                    { /* this is passing in a prop with the key of 'tagline' and a value */}
                    <Header tagline="Fresh Seafood Market"/>
                </div>
                <Order />
                <Inventory />
            </div>
        )
    }
}

export default App;