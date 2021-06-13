import React from 'react';

export default class Data {

    /**
     * apiConnection Function
     * @param {*} endpoint - The end of the link for the API
     * @param {*} method - GET or POST
     * @param {*} body - To post info - think, req.body
     * @param {*} requiresAuth - Does the API need authentication
     * @param {*} credentials - What are the credentials to LOGIN
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
            // console.log(encodedCredentials);
            // set an Authorization header on each request that requires authentication by adding an Authorization property to the headers object
            options.headers['Authorization'] = `Basic ${encodedCredentials}`;
        }


        return fetch(requestPath, options);
    }

    // I DID TOO MUCH. TRY TO FIND WHY I CANNOT LOG IN - IT ISN'T GOING TO THE API


    // Fetch Methods - USER
    async getUser(emailAddress, password) {
        console.log(emailAddress);
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

    // Notice the difference between the apiConnection calls. GET Users needs to add null, and then true for the credentials, and the credentials. - Therefore they need to be sent in the call!

    async createUser(user) {
        const response = await this.apiConnection('/users', 'POST', user);
        console.log(response);
        if (response.status === 201) {
            console.log("success");
            return [];
        } else if (response.status === 400) {
            console.log("Error 400")
            return response.json().then(data => {
                console.log(data);
                return data.errors;
            });
        } else {
            console.log("Yeah, just didn't work");
            throw new Error();
        }
    }

    // FETCH METHODS - Courses

}
