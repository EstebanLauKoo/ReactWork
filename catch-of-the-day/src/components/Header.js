import React from 'react';

// this is just another way to write function Header() {}
const Header = (props) => {
    return (
        <header className="top">
            <h1>
                Catch
                <span className="ofThe">
                        <span className="of">of</span>
                        <span className="the">the</span>
                    </span>
                Day
            </h1>
            { /* We are passing the prop with the actual component.prop. and the key name value*/}
            <h3 className="tagline"><span>{props.tagline}</span></h3>
        </header>
    )
}

export default Header;
