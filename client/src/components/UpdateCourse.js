import React, {useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom';

export default function UpdateCourse(props) {

    const id = props.match.params.id;
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [estimatedTime, setEstimatedTime] = useState("");
    const [materialsNeeded, setMaterialsNeeded] = useState("");


    // Fetch info on load
    useEffect(() => {
        fetch(`http://localhost:5000/api/courses/${id}`)
            .then(res => res.json())
            .then(data => {
                setTitle(data.title);
                setName(`${data.User.firstName} ${data.User.lastName}`);
                setDescription(data.description);
                setEstimatedTime(data.estimatedTime);
                setMaterialsNeeded(data.materialsNeeded);
            })
    }, [id]);

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

    // Submit form
    function submitForm(e) {
        e.preventDefault();
        console.log("Hello Form");
        console.log(estimatedTime);
        // Send PUT request to update the course
        // Must be logged in!

    }

    
    return (
        <main>
            <div className="wrap">
                <h2>Update Course</h2>
                <form onSubmit={submitForm}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" value={title}  onChange={handleChange}/>

                            <p>By {name}</p>

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription" value={description} onChange={handleChange}></textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" value={estimatedTime}  onChange={handleChange}/>

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" value={materialsNeeded} onChange={handleChange}></textarea>
                        </div>
                    </div>
                    <button className="button" type="submit">Update Course</button><NavLink to="/" className="button button-secondary">Cancel</NavLink>
                </form>
            </div>
        </main>
    )
}

// Jobs to do
// Fetch data and add in like on course detail
// On submit, update the course data
// Add cancel button
// Add validation errors to title and description
// Authenticated user only