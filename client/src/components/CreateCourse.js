import React, {useState} from 'react';
import {NavLink, useHistory} from 'react-router-dom';

export default function CreateCourse(props) {

    // State Hooks
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [estimatedTime, setEstimatedTime] = useState("");
    const [materialsNeeded, setMaterialsNeeded] = useState("");
    const [errors, setErrors] = useState([]);

    const {context} = props;
    const authUser = context.authenticatedUser;

    let history = useHistory();

    /**
     * 'handleChange' - Update state on form changes
     * @param {event} e - Listens to the changes
     */
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
    
    /**
     * 'handleSubmit' 
     * Description: Prepares body and calls createCourse API method
     * @param {*} e - Event
     */
    function handleSubmit(e) {
        e.preventDefault();
        const newCourseBody = {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId: authUser.user.id
        }
        // Perform API post request
        context.data.createCourse(newCourseBody, context.email, context.pass)
            .then(errors => {
                if (errors.length > 0) {
                    setErrors(errors);
                } else {
                    history.push("/");
                }
            })
            .catch(err => {
                history.push('/error');
            }) 
    }

    return (
        <main>
            <div className="wrap">
                <h2>Create Course</h2>
                {errors ? context.data.ErrorsDisplay({errors}) : null}
                <form onSubmit={handleSubmit}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" value={title} onChange={handleChange} />

                            <p>{`${authUser.user.firstName} ${authUser.user.lastName}`}</p>

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
