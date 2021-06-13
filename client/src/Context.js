import React, {Component} from 'react';
import Data from './Data';

export const context = React.createContext();

export class Provider extends Component {

  // Creating a new instance of Data, which holds the APIConnection class
    constructor() {
      super();
      this.data = new Data();
    };

    state = {
      authenticatedUser: null,
    };

        
    render() {

      // Unpacked Authenticated User from State
      const {authenticatedUser} = this.state;

      const value = {
        authenticatedUser,
        data: this.data,
        actions: {
          signIn: this.signIn,
          signOut: this.signOut
        }
      };


      return (
          <context.Provider value={value}>
              {this.props.children}
          </context.Provider>
      );
    }


    signIn = async (emailAddress, password) => {
      // Call the getUser function from data
      const user = await this.data.getUser(emailAddress, password);
      if (user !== null) {
        // update logged in user state
        this.setState(() => {
          return {
            authenticatedUser: user,
          };
        });
      }
      return user;
    }

    signOut = () => {
      this.setState({authenticatedUser: null});
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