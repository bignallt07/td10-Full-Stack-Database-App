import React from 'react';
import {NavLink} from 'react-router-dom';

export default function Header({context}) {

    // Get Authenticated User State
    const authUser = context.authenticatedUser;

    return (
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo"><NavLink to="/">Courses</NavLink></h1>
                <nav>
                    <ul className="header--signedout">
                    {
                        authUser ? 
                            <React.Fragment>
                                <li>Welcome, {authUser.user.firstName}!</li>
                                <li><NavLink to="/signout">Sign Out</NavLink></li>
                            </React.Fragment>
                            :
                            <React.Fragment>
                                <li><NavLink to="/signup">Sign Up</NavLink></li>
                                <li><NavLink to="/signin">Sign In</NavLink></li>
                            </React.Fragment>
                    }
                    </ul>
                </nav>
            </div>
        </header>
    )
}

/**
 * Things to do
 * 1. Add a check to see if the user has been activated and if so set their name at the top, otherwise. What we have here
 * 2. When autherizing the user, enable the switch to in and out
 * 
 */
