import React from 'react'
import { Grid, Col, Row, FieldGroup, Form, FormGroup, ControlLabel, FormControl, HelpBlock, Button, Panel, PageHeader } from 'react-bootstrap'

/*
This component updates a comment by id.

*/

class Delete extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      doc: '',
      id: 'id',
      url: 'http://localhost:8080/api/',
    }
  }

  onChange = (e) => {
    e.preventDefault()
    console.log(`EVENT ${e}`)
    let obj = {}
    obj[e.target.id] = e.target.value
    this.setState(obj)
  }

  submit = (e) => {
    e.preventDefault();
    const payload = {
      id: this.state.id
    };


    fetch(this.state.url, {
      method: 'DELETE',
      mode: 'cors',
      redirect: 'follow',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then((res) => {
      return res.json()
    }).
      then((json) => {
        this.setState({
          doc: json,
        })
      }).
      catch((err) => {
        console.error(err)
      })
  }
  render() {
    return (
      <Grid>
        <PageHeader><small style={style.stitch}>Delete</small></PageHeader>
        <Row>
          <Col md={6}>
            <Form onSubmit={this.submit}>
              <FormGroup
                controlId="formBasicText"
              >
                <ControlLabel>Enter id of the document to delete</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.id}
                  placeholder="Enter id"
                  onChange={this.onChange}
                  id="id"
                />
                <FormControl.Feedback />
              </FormGroup>
              <Button type='submit' style={style.stitch}>
                Submit
              </Button>
            </Form>
          </Col>
          <Col md={6}>
            <Row>
              <Col>
                <h4>
                  Deleted Document
                  </h4>
                <pre>
                  {JSON.stringify(this.state.doc, null, 2)}
                </pre>
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    )
  }
}
const style = {
  stitch: {
    color: '#4ca84a'
  }
}
export default Delete; 
