import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor() {
    super();
    this.state = {
      hasError: false,
    };
  }

  componentDidCatch(error) {
    console.log(error);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <p>Oops, Something Went Wrong!!!</p>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

/* ErrorBoundary
 * if you need Error Boundary you only need a Class-Based Component not functional-component
 */
