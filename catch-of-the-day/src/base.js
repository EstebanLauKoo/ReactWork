import Rebase from 're-base';

// Using the rebase package to build connection to firebase
const base = Rebase.createClass({
    apiKey: "AIzaSyCXrt4ah4f2u_s_xP39Gtx4-hsc8CDcYO4",
    authDomain: "catch-of-the-day-esteban.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-esteban.firebaseio.com"
});

export default base