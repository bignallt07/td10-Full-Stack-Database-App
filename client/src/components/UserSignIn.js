import React, {useState} from 'react';
import {NavLink, useHistory} from 'react-router-dom';

export default function UserSignIn(props) {

    // State hooks
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    let history = useHistory();

    /**
     * 'handleChange' 
     * @param {*} e - event
     * @returns Updated State
     */
    function handleChange(e) {
        const name = e.target.name;
        if (name === "emailAddress") {
            setEmailAddress(e.target.value);
        } else {
            setPassword(e.target.value);
        }
    }


    /**
     * 'submitForm'
     * @param {*} e - event
     * @returns - Auth User set in state, or error
     */
    function submitForm(e) {
        e.preventDefault();

        const {context} = props;

        const {from} = props.location.state || {from: {pathname: '/'}};
        console.log(props.location.state);
        
        // Call Sign in from context actions
        context.actions.signIn(emailAddress, password)
            .then(user => {
                if (user === null) {
                    setErrors(errors);
                } else {
                    history.push(from); // From is state from private route - Location of the user
                    console.log(`SUCCESS! ${emailAddress} is now signed in!`);
                }
            })
            .catch(err => {
                history.push('/error');
            })
    }

    return (
        <main>
            <div className="form--centered">
                <h2>Sign In</h2>
                <form onSubmit={submitForm}>
                    <label htmlFor="emailAddress">Email Address</label>

                    <input id="emailAddress" name="emailAddress" type="email" value={emailAddress} onChange={handleChange}/>
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" value={password} onChange={handleChange}/>
                    <button className="button" type="submit">Sign In</button>
                    <NavLink to="/" className="button button-secondary">Cancel</NavLink>
                </form>
                <p>Don't have a user account? Click here to <NavLink to="/signup">sign up</NavLink>!</p>
            </div>
        </main>
    )
}

