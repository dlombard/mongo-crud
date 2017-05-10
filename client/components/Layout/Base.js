import React from 'react';
import { Grid, Col, Row } from 'react-bootstrap'

class BasePage extends React.Component {

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }

}

export default BasePage;
