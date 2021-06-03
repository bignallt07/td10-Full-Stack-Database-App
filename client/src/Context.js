import React, {Component} from 'react';

const context = React.createContext();

export class Provider extends Component {

    state = {
        score: 0
    }

    async getCourses(link) {
        console.log("Hello from Context");
        // let dataList
        // await fetch(`http://localhost:5000/api/${link}`)
        //     .then(res => res.json())
        //     .then(data => {
        //         dataList = data
        //     })
        // return dataList;
    }
        
    render() {
        return (
            <context.Provider value={{
                score: this.state.score,
                courses: this.state.courses,
                actions: {
                    getCourses: this.getCourses
                }
            }}>
                {this.props.children}
            </context.Provider>
        );
    }
}

export const Consumer = context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <context.Consumer>
        {context => <Component {...props} context={context} />}
      </context.Consumer>
    );
  }
}