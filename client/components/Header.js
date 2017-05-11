import React from 'react';
import { Grid, Col, Row, Page, PageHeader } from 'react-bootstrap'

class Header extends React.Component {

  render() {
    return (
      <Grid>
        <Row>
          <Col md={10} mdOffset={1}>
            <PageHeader>Try Now - <span style={style.stitch}>Stitch</span></PageHeader>
          </Col>
        </Row>
      </Grid>
    );
  }

}
const style = {
  stitch:{
    color: '#4ca84a'
  }
}
export default Header;
