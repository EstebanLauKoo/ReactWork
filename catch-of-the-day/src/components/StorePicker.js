// Importing this creates the scripts in the html.
// This comes from the package.json dependencies specificially node_modules
import React from 'react';

// This is your component
class StorePicker extends React.Component {
    render() {
        // if you are returning in a render and its nesting
        // do return () because it you don't it will turn into return;
        // so nothing after the return; will send
        return (
            // React requires className
            // You can't return two parent elements
            // if you want to comment inside the component you need { /* comment here */}
            <form className="store-selector">
                <h2>Please Enter A Store</h2>
                <input type="text" required placeholder="Store Name"/>
                <button type="submit">Visit Store</button>
            </form>
        )
    }
}

export default StorePicker;