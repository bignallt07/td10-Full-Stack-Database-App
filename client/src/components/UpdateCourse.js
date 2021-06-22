import React, {useState, useEffect} from 'react';
import {NavLink, useHistory} from 'react-router-dom';

export default function UpdateCourse(props) {

    // Variables and hooks
    const id = props.match.params.id;
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [estimatedTime, setEstimatedTime] = useState("");
    const [materialsNeeded, setMaterialsNeeded] = useState("");

    const [errors, setErrors] = useState([]);

    const {context} = props;
    const authUser = context.authenticatedUser;

    let history = useHistory();


    /**
     * useEffect - Fetch data about specific course on page load
     * @returns - Update in state on success, redirect on error
     */
    useEffect(() => {
        fetch(`http://localhost:5000/api/courses/${id}`)
            .then(res => res.json())
            .then(data => {
                const author = data.User.id;
                const user = authUser.user.id;
                if (data && user === author) {
                    setTitle(data.title);
                    setDescription(data.description);
                    setEstimatedTime(data.estimatedTime);
                    setMaterialsNeeded(data.materialsNeeded);
                } else if (data && user !== author) {
                    history.push("/forbidden");
                } else {
                    history.push("/notfound");
                } 
            }).catch(err => {
                history.push("/error");
            })
    }, [id, history, authUser]);

    /**
     * 'handleChange'
     * @param {*} e - event
     * @returns - updated state
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
     * 'submitForm'
     * @param {*} e - event
     * @returns PUT call on API to update the course 
     */
    function submitForm(e) {
        e.preventDefault();
        const courseBody = {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId: authUser.user.id
        }
        context.data.updateCourse(id, courseBody, context.email, context.pass)
            .then(errors => {
                if (errors === 403) {
                    history.push("/forbidden");
                }
                else if (errors.length > 0) {
                    setErrors(errors);
                } else {
                    history.push(`/courses/${id}`);
                }
            })
            .catch(err => {
                history.push('/error');
            }) 
    }

    return (
        <main>
            <div className="wrap">
                <h2>Update Course</h2>
                {errors ? context.data.ErrorsDisplay({errors}) : null}
                <form onSubmit={submitForm}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" value={title}  onChange={handleChange}/>

                            <p>{`${authUser.user.firstName} ${authUser.user.lastName}`}</p>

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
