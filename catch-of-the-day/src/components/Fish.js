import React from 'react';
import { formatPrice } from '../helpers';
class Fish extends React.Component {
    render() {
        // this is like saying this.props.details
        const { details, index } = this.props;
        const isAvailable = details.status === 'available';
        // this const is saying if is available is true then text will show as 'Add To Order' if not it will show as 'Sold Out!;
        const buttonText = isAvailable ? 'Add To Order' : 'Sold Out!';
        return (
            <li className="menu-fish">
                <img src={details.image} alt={details.name}/>
                <h3 className="fish-name">
                    {details.name}
                    <span className="price">{formatPrice(details.price)}</span>
                </h3>
                <p>{details.desc}</p>
                <button onClick={() => this.props.addToOrder(index)} disabled={!isAvailable}>{buttonText}</button>
            </li>
        )
    }
}


Fish.propTypes = {
    details: React.PropTypes.object.isRequired,
    index: React.PropTypes.string.isRequired,
    addToOrder: React.PropTypes.func.isRequired
}



export default Fish