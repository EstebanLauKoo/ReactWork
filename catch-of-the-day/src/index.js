// let's go!

// Importing this creates the scripts in the html.
// This comes from the package.json dependencies specificially node_modules
import React from 'react';

// This imports the render method from 'react-dom'
// You could also use ReactDOM from 'react-dom'
// then use  ReactDom.render() so that you can use that method
import { render } from 'react-dom';

// We are importing things to do handle routing
import { BrowserRouter, Match, Miss} from 'react-router';

// Import the App component from the components directory
import App from './components/App';

// You are importing css files
import './css/style.css';

//this is importing the component 'Storepicker' from the StorePicker.js in the components folder
import StorePicker from './components/StorePicker';

// Importing the NotFound Component
import NotFound from './components/NotFound'

const Root = () => {
    return (
        <BrowserRouter>
            <div>
                { /*
                    We are playing with the routes on this
                    in Match we are asking for the url to match those and depending on what you do it will render with different components
                    in Miss we are throwing an error situation and rendering something with it
                */}
            <Match pattern="/store/:storeId" component={App} />
            <Match exactly pattern="/" component={StorePicker} />
            <Miss component={NotFound} />
            </div>
        </BrowserRouter>
    )
}

// This is is JSX right here
// What you are doing is stating first part as the component
// Then render to the id=main
render(<Root/>, document.querySelector('#main'));





