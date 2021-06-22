
export default class Data {
    /**
     * apiConnection Function
     * @param {*} endpoint - The end of the link for the API
     * @param {*} method - GET or POST
     * @param {*} body -  Information to send in the req.body
     * @param {*} requiresAuth - Does the API need authentication?
     * @param {*} credentials - What are the credentials to LOGIN?
     * @returns 
     */
    // Create API function to GET AND POST
    apiConnection(endpoint, method, body = null, requiresAuth = false, credentials = null) {

        // Setting up the request path (in the future, this will need to be updated to remove localhost)
        const requestPath = `http://localhost:5000/api${endpoint}`;

        // Options to send with the HTTP method and headers
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        };

        // Stringify and body that is passed to make it easier to read
        if (body !== null) {
            options.body = JSON.stringify(body);
        }

        // If authentication Needed
        if (requiresAuth) {
            const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
            // set an Authorization header on each request that requires authentication by adding an Authorization property to the headers object
            options.headers['Authorization'] = `Basic ${encodedCredentials}`;
        }

        return fetch(requestPath, options);
    }


    // Fetch Methods - USER

    /**
     * 'getUser' call - Used to fetch the credentials of the user
     * @param {string} emailAddress 
     * @param {string} password 
     * @returns - JSON of user credentials
     */
    async getUser(emailAddress, password) {
        const response = await this.apiConnection('/users', 'GET', null, true, {emailAddress, password});
        if (response.status === 200) {
            return response.json().then(data => data);
        }
        else if (response.status === 401) {
            return null;
        }
        else {
            throw new Error();
        }
    }

    /**
     * 'createUser' call - Used to sign up new user
     * @param {string} user - Body of data used to sign up user
     * @returns - Empty array on success, errors of failure
     */
    async createUser(user) {
        const response = await this.apiConnection('/users', 'POST', user);
        if (response.status === 201) {
            console.log("success");
            return [];
        } else if (response.status === 400) {
            console.log("Error 400")
            return response.json().then(data => {
                return data.errors;
            });
        } else {
            throw new Error();
        }
    }

    // FETCH METHODS - Courses

    /**
     * 'createCourse' call - used to create a new course
     * @param {object} newCourse - Body of data to send
     * @param {string} emailAddress 
     * @param {string} password 
     * @returns - Empty array on success, errors on failure
     */
    async createCourse(newCourse, emailAddress, password) {
        const response = await this.apiConnection('/courses', 'POST', newCourse, true, {emailAddress, password});
        if (response.status === 201) {
            console.log("New Course Created");
            return [];
        } else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors;
            })
        } else {
            throw new Error();
        }
    }

    /**
     * 'updateCourse' call - To update an exsisting course
     * @param {number} courseID - Id of the course
     * @param {object} updatedContent - Body for course update
     * @param {string} emailAddress 
     * @param {string} password 
     * @returns - Empty array on success, errors or response status on error
     */
    async updateCourse(courseID, updatedContent, emailAddress, password) {
        const response = await this.apiConnection(`/courses/${courseID}`, 'PUT', updatedContent, true, {emailAddress, password});
        if (response.status === 204) {
            console.log("Course Updated");
            return [];
        } else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors;
            })
        } else if (response.status === 403) {
            // Create component for forbidden
            return response.status;
        }
        else {
            throw new Error();
        }
    }

    /**
     * 'deleteCourse' call - to delete a course.
     * @param {*} courseID 
     * @param {*} emailAddress 
     * @param {*} password 
     * @returns - Empty array on success, errors or redirect on error
     */
    async deleteCourse(courseID, emailAddress, password) {
        const response = await this.apiConnection(`/courses/${courseID}`, 'DELETE', null, true, {emailAddress, password});
        if (response.status === 204) {
            console.log("Course Deleted");
            return [];
        } else if (response.status === 403) {
            this.props.history.push("/forbidden");
        } else {
            throw new Error();
        }
    }

    // Other Methods

    /**
     * 'ErrorsDisplay' - Show validation errors 
     * @param {object} errors - object of errors
     * @returns - JSX of markup
     */
    ErrorsDisplay({ errors }) {
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

}
