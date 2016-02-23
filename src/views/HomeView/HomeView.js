/* @flow */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { increment, makeBigJSONBlob } from '../../redux/modules/counter';
import DuckImage from './Duck.jpg';
import classes from './HomeView.scss';

// We can use Flow (http://flowtype.org/) to type our component's props
// and state. For convenience we've included both regular propTypes and
// Flow types, but if you want to try just using Flow you'll want to
// disable the eslint rule `react/prop-types`.
// NOTE: You can run `npm run flow:check` to check for any errors in your
// code, or `npm i -g flow-bin` to have access to the binary globally.
// Sorry Windows users :(.
type Props = {
  counter: number,
  increment: Function,
  makeBigJSONBlob: Function
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class HomeView extends React.Component<void, Props, void> {
  static propTypes = {
    counter: PropTypes.number.isRequired,
    increment: PropTypes.func.isRequired,
    makeBigJSONBlob: PropTypes.func.isRequired
  };

  shouldComponentUpdate (nextProps, nextState) {
    console.log('NxtState', nextState);
    console.log('nxtprops', nextProps);

    return nextProps.counter !== this.props.counter;
  }

  render () {
    return (
      <div className='container text-center'>
        <div className='row'>
          <div className='col-xs-2 col-xs-offset-5'>
            <img className={classes.duck}
              src={DuckImage}
              alt='This is a duck, because Redux.' />
          </div>
        </div>
        <h1>Welcome to the React Redux Starter Kit</h1>
        <h2>
          Sample Counter:
          {' '}
          <span className={classes['counter--green']}>{this.props.counter}</span>
        </h2>
        <button className='btn btn-default' onClick={this.props.increment}>
          Increment
        </button>
        {' '}
        <button className='btn btn-danger' onClick={this.props.makeBigJSONBlob}>
          Make Gigantor Store
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  counter: state.counter.count
});
export default connect((mapStateToProps), {
  increment: () => increment(1),
  makeBigJSONBlob
})(HomeView);
