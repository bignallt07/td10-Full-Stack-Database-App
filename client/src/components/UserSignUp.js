import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';

export default function UserSignUp() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmed, setConfirmed] = useState("");

    // handleChange function
    function handleChange(e) {
        const name = e.target.name;
        if (name === "firstName") {
            setFirstName(e.target.value);
        } else if (name === "lastName") {
            setLastName(e.target.value);
        } else if (name === "emailAddress") {
            setEmail(e.target.value);
        } else if (name === "password") {
            setPassword(e.target.value);
        } else {
            setConfirmed(e.target.value);
        }
    }

    // Submit function
    function submitForm(e) {
        e.preventDefault();
        console.log("First Name: ", firstName);
        console.log("Last Name: ", lastName);
        console.log("Email Address: ", email);
        console.log("Password: ", password);
        console.log("Confirmed: ", confirmed);
        const match = (password === confirmed) ? "Matched" : "Did not Match";
        console.log(match);
        /*
        To do...
        1. If passwords don't match there should be a validator here
        2. Then we need to do a post request to the API 
            3. If successful... redirect to the main page, but logged in and updates the context state of Autherized to USER.
            4. If not, error
        */
    }

    return (
        <main>
        <div className="form--centered">
            <h2>Sign Up</h2>
            
            <form onSubmit={submitForm}>
                <label htmlFor="firstName">First Name</label>
                <input id="firstName" name="firstName" type="text" value={firstName} onChange={handleChange}/>
                <label htmlFor="lastName">Last Name</label>
                <input id="lastName" name="lastName" type="text" value={lastName} onChange={handleChange}/>
                <label htmlFor="emailAddress">Email Address</label>
                <input id="emailAddress" name="emailAddress" type="email" value={email} onChange={handleChange}/>
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" value={password} onChange={handleChange}/>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input id="confirmPassword" name="confirmPassword" type="password" value={confirmed} onChange={handleChange}/>
                <button className="button" type="submit">Sign Up</button>
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