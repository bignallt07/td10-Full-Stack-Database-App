import React, {useState, useEffect} from 'react';
import {NavLink, useHistory} from 'react-router-dom';

export default function UpdateCourse(props) {

    const id = props.match.params.id;
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [estimatedTime, setEstimatedTime] = useState("");
    const [materialsNeeded, setMaterialsNeeded] = useState("");

    const [errors, setErrors] = useState([]);

    const {context} = props;
    const authUser = context.authenticatedUser;

    let history = useHistory();


    // Fetch info on load
    useEffect(() => {
        fetch(`http://localhost:5000/api/courses/${id}`)
            .then(res => res.json())
            .then(data => {
                setTitle(data.title);
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
        const courseBody = {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId: authUser.user.id
        }
        context.data.updateCourse(id, courseBody, context.email, context.pass)
            .then(errors => {
                console.log(errors);
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
            <div className="wrap">
                <h2>Update Course</h2>
                <ErrorsDisplay errors={errors} />
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

// Jobs to do
// Fetch data and add in like on course detail
// On submit, update the course data
// Add cancel button
// Add validation errors to title and description
// Authenticated user only