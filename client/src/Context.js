import React, {Component} from 'react';
import Data from './Data';
import Cookies from 'js-cookie';

export const context = React.createContext();

export class Provider extends Component {

  // Creating a new instance of Data, which holds the APIConnection class
    constructor() {
      super();
      this.data = new Data();
    };

    state = {
      // Ensure auth user is set to authenticatedUser and if not NULL
      authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
      // Not sure about the security here
      email: Cookies.getJSON('email') || "",
      pass: Cookies.getJSON("pass") || ""
    };  
        
    render() {

      // Unpacked Authenticated User from State
      const {authenticatedUser, email, pass} = this.state;

      const value = {
        authenticatedUser,
        email,
        pass,
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
            email: emailAddress,
            pass: password
          };
        });
        // Set Cookie - name of cookie, data you want, when it expires
        Cookies.set('authenticatedUser', JSON.stringify(user), {expires: 1});
        Cookies.set('email', emailAddress, {expires: 1});
        Cookies.set('pass', password, {expires: 1});
      }
      return user;
    }

    signOut = () => {
      this.setState(() => {
        return {
          authenticatedUser: null,
          email: "",
          pass: ""
        };
      });
      // Remove cookie
      Cookies.remove('authenticatedUser');
      Cookies.remove('email');
      Cookies.remove('pass');
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