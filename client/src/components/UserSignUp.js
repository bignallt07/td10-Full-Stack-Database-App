import React, {useState} from 'react';
import {NavLink, useHistory} from 'react-router-dom';

export default function UserSignUp({context}) {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confirmed, setConfirmed] = useState("");

    const [errors, setErrors] = useState([]);

    // History Hook
    let history = useHistory();

    // handleChange function
    function handleChange(e) {
        const name = e.target.name;
        if (name === "firstName") {
            setFirstName(e.target.value);
        } else if (name === "lastName") {
            setLastName(e.target.value);
        } else if (name === "emailAddress") {
            setEmailAddress(e.target.value);
        } else if (name === "password") {
            setPassword(e.target.value);
        } else {
            setConfirmed(e.target.value);
        }
    }

    // Submit function
    function submitForm(e) {
        e.preventDefault();

        const user = {
            firstName,
            lastName,
            emailAddress,
            password
        }

        // console.log(user);

        context.data.createUser(user)
            .then(errors => {
                console.log(errors);
                if (errors.length) {
                    setErrors(errors);
                    console.log(errors);
                } else {
                    console.log("A new user was created", firstName, lastName)
                }
            })
            .catch(err => {
                console.log(err);
                history.push('/error');
            })
    }

    function ErrorsDisplay({ errors }) {
        let errorsDisplay = null;

        if (errors.length) {
            errorsDisplay = (
            <div className="validation--errors">
                <h3>Validation errors</h3>
                <ul>
                    {errors.map((error, i) => <li key={i}>{error}</li>)}
                </ul>
            </div>
            );
        }

        return errorsDisplay;
        }

    return (
        <main>
        <div className="form--centered">
            <h2>Sign Up</h2>
            <ErrorsDisplay errors={errors} />
            <form onSubmit={submitForm}>
                <label htmlFor="firstName">First Name</label>
                <input id="firstName" name="firstName" type="text" value={firstName} onChange={handleChange}/>
                <label htmlFor="lastName">Last Name</label>
                <input id="lastName" name="lastName" type="text" value={lastName} onChange={handleChange}/>
                <label htmlFor="emailAddress">Email Address</label>
                <input id="emailAddress" name="emailAddress" type="email" value={emailAddress} onChange={handleChange}/>
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

3. Do I need to write a cancel function?


*/