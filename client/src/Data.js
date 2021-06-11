import React from 'react';

export default class Data {

    // Create API function to GET AND POST
    apiConnection(endpoint, method, body = null) {

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


        return fetch(requestPath, options);
    }


    // Fetch Methods
    async getUser() {}


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

}
