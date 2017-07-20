// Importing this creates the scripts in the html.
// This comes from the package.json dependencies specificially node_modules
import React from 'react';
import { getFunName } from '../helpers'

// This is your component
class StorePicker extends React.Component {

    // This is a way to pass in this to the method
    // good for when you are using a method multiple times
    // second way is by writing it on your on submit this.goToStore().bind(this)

    constructor () {
        super();
        this.goToStore = this.goToStore.bind(this);
    }

    // Methods like goToStore cannot retrieve this StorePicker class without doing some things

    goToStore(event) {
        event.preventDefault();
        // this console.log will console this
        // first grab the text from the box
        console.log(this.storeInput);
        // Here we are storing the id as an actual value
        const storeId = this.storeInput.value;
        // In here we are testing the value has been grabbed
        // NOTE:: ES6 string interpolating has to freacking use backTicks
        console.log(`going to ${storeId}` );
        // second we're going to transition from / to /store/:storeId
        this.context.router.transitionTo(`store/${storeId}`)
    }

    render() {
        // if you are returning in a render and its nesting
        // do return () because it you don't it will turn into return;
        // so nothing after the return; will send
        return (
            // React requires className
            // You can't return two parent elements
            // if you want to comment inside the component you need { /* comment here */}
            <form className="store-selector" onSubmit={(e) => this.goToStore(e)}>
                <h2>Please Enter A Store</h2>
                <input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref={(input) =>  {this.storeInput = input}}/>
                <button type="submit">Visit Store</button>
            </form>
        )
    }
}

StorePicker.contextTypes = {
    router: React.PropTypes.object
}

export default StorePicker;