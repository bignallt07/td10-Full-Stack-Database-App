import React, {Component} from 'react';
import Data from './Data';

export const context = React.createContext();

export class Provider extends Component {

  // Creating a new instance of Data, which holds the APIConnection class
    constructor() {
      super();
      this.data = new Data();
    };

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

      const value = {
        data: this.data,
      };


      return (
          <context.Provider value={value}>
              {this.props.children}
          </context.Provider>
      );
    }

    // signIn = async() => {}

    // signOut = () => {}

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