import React from 'react';
import {NavLink} from 'react-router-dom';

export default function UserSignIn() {
    return (
        <main>
            <div className="form--centered">
                <h2>Sign In</h2>
                <form>
                    <label for="emailAddress">Email Address</label>

                    <input id="emailAddress" name="emailAddress" type="email" value="" />
                    <label for="password">Password</label>
                    <input id="password" name="password" type="password" value="" />
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
