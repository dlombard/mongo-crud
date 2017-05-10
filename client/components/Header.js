import React from 'react';
import { Grid, Col, Row, Page, PageHeader } from 'react-bootstrap'

class Header extends React.Component {

  render() {
    return (
      <Grid>
        <Row>
          <Col md={10} mdOffset={1}>
            <PageHeader>Try Now - BaaS</PageHeader>
          </Col>
        </Row>
      </Grid>
    );
  }

}

export default Header;
