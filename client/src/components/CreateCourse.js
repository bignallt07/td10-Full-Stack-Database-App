import React from 'react';
import {NavLink} from 'react-router-dom';

export default function CreateCourse() {

    function handleSubmit(e) {
        e.preventDefault();
        console.log("Hello, we clicked");
    }

    return (
        <main>
            <div className="wrap">
                <h2>Create Course</h2>
                <div className="validation--errors">
                    <h3>Validation Errors</h3>
                    <ul>
                        <li>Please provide a value for "Title"</li>
                        <li>Please provide a value for "Description"</li>
                    </ul>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="main--flex">
                        <div>
                            <label for="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" value="" />

                            <p>By AUTHENTICATED PERSON'S NAME</p>

                            <label for="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription"></textarea>
                        </div>
                        <div>
                            <label for="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" value="" />

                            <label for="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded"></textarea>
                        </div>
                    </div>
                    <button className="button" type="submit">Create Course</button><NavLink to="/" className="button button-secondary">Cancel</NavLink>
                </form>
            </div>
        </main>
    )
}

// Lots to do here...
// 1. When clicked, send a post request to api/courses to set up a new link
// 2. This needs to be hooked up to user authentication
