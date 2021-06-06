import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';

export default function UserSignIn() {

    // Credentials
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // handleChange function
    // Checks to see what the name of the input is, then update the state
    // This is called a CONTROLLED COMPONENT
    function handleChange(e) {
        const name = e.target.name;
        if (name === "emailAddress") {
            setEmail(e.target.value);
        } else {
            setPassword(e.target.value);
        }
    }

    // Tonight.
    // 2. Look to submit the form with a post request

    // Submit function
    function submitForm(e) {
        e.preventDefault();
        console.log(email);
        console.log(password);
        // We need to make a get request to see if it is successful. Probably in context
        // If it is to be authenticated, and redirect to the former location or the logged in screen
            // If not add an error 
            // Catch global error for other stuff too.
    }

    return (
        <main>
            <div className="form--centered">
                <h2>Sign In</h2>
                <form onClick={submitForm}>
                    <label htmlFor="emailAddress">Email Address</label>

                    <input id="emailAddress" name="emailAddress" type="email" value={email} onChange={handleChange}/>
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
// onclick="event.preventDefault();
/*
Come back to later. 
1. Add user auth
2. Update the labels and create the sign in methods
3. Handle Submit and Handle Cancel Methods
4. Display Errors

*/
