import React, {useState} from 'react';
import {NavLink, useHistory} from 'react-router-dom';

export default function UserSignIn(props) {

    // Credentials
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    let history = useHistory();

    // handleChange function
    // Checks to see what the name of the input is, then update the state
    // This is called a CONTROLLED COMPONENT
    function handleChange(e) {
        const name = e.target.name;
        if (name === "emailAddress") {
            setEmailAddress(e.target.value);
        } else {
            setPassword(e.target.value);
        }
    }

    // Tonight.
    // 2. Look to submit the form with a post request

    // Submit function
    function submitForm(e) {
        e.preventDefault();

        // From comes from privateRoute state. Used in history to redirect user to page they were on
        const {context} = props;

        const {from} = props.location.state || {from: {pathname: '/'}};
        console.log(props.location.state);
        
        // Call Sign in from context actions
        context.actions.signIn(emailAddress, password)
            .then(user => {
                console.log(user);
                if (user === null) {
                    setErrors(errors);
                    console.log(errors)
                } else {
                    history.push(from); // From is state from private route - Location of the user
                    console.log(`SUCCESS! ${emailAddress} is now signed in!`);
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

    // Have a cancel function if necessary - See React Auth course

    return (
        <main>
            <div className="form--centered">
                <h2>Sign In</h2>
                <ErrorsDisplay errors={errors} />
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
// onclick="event.preventDefault();
/*
Come back to later. 
1. Add user auth
2. Update the labels and create the sign in methods
3. Handle Submit and Handle Cancel Methods
4. Display Errors

*/
