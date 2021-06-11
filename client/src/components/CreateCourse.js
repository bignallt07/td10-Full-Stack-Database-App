import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';

export default function CreateCourse() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [estimatedTime, setEstimatedTime] = useState("");
    const [materialsNeeded, setMaterialsNeeded] = useState("");


    // handleChange function
    function handleChange(e) {
        const name = e.target.name;
        if (name === "courseTitle") {
            setTitle(e.target.value);
        } else if (name === "courseDescription") {
            setDescription(e.target.value);
        } else if (name === "estimatedTime") {
            setEstimatedTime(e.target.value);
        } else {
            setMaterialsNeeded(e.target.value)
        }
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        console.log("Hello, we clicked");
        // Perform API post request
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
                            <label htmlFor="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" value={title} onChange={handleChange} />

                            <p>By AUTHENTICATED PERSON'S NAME</p>

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription" value={description} onChange={handleChange}></textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" value={estimatedTime} onChange={handleChange} />

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" value={materialsNeeded} onChange={handleChange}></textarea>
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
