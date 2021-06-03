import React from 'react';
import {NavLink} from 'react-router-dom';

export default function UserSignUp() {
    return (
        <main>
        <div class="form--centered">
            <h2>Sign Up</h2>
            
            <form>
                <label for="firstName">First Name</label>
                <input id="firstName" name="firstName" type="text" value="" />
                <label for="lastName">Last Name</label>
                <input id="lastName" name="lastName" type="text" value="" />
                <label for="emailAddress">Email Address</label>
                <input id="emailAddress" name="emailAddress" type="email" value="" />
                <label for="password">Password</label>
                <input id="password" name="password" type="password" value="" />
                <label for="confirmPassword">Confirm Password</label>
                <input id="confirmPassword" name="confirmPassword" type="password" value="" />
                <button class="button" type="submit">Sign Up</button>
                <NavLink to="/" className="button button-secondary">Cancel</NavLink>
            </form>
            <p>Already have a user account? Click here to <NavLink to="/signin">sign in</NavLink>!</p>
        </div>
    </main>
    )
}

/*
To Do...
1. When sign up button clicked, create a new account by sending a post request to api/users
2. Get the form working. Big job on it's own


*/