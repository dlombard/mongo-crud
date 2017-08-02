import React from 'react'
import { Grid, Col, Row, FieldGroup, Form, FormGroup, ControlLabel, FormControl, Button, Panel, PageHeader } from 'react-bootstrap'

class Insert extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      doc: '',
      name: 'name',
      comment: 'my comment',
      url: 'http://localhost:8080/api',

    }
  }

  onChange = (e) => {
    e.preventDefault()
    let obj = {}
    obj[e.target.id] = e.target.value
    this.setState(obj)
  }

  submit = (e) => {
    e.preventDefault();
    const payload = {
      name: this.state.name,
      comment: this.state.comment
    };


    fetch(this.state.url, {
      method: 'POST',
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
          doc: json
        })
      }).
      catch((err) => {
        console.error(err)
      })
  }
  render() {
    return (
      <Grid>
        <PageHeader><small style={style.stitch}>Insert</small></PageHeader>
        <Row>
          <Col md={6}>
            <Form onSubmit={this.submit}>
              <FormGroup
                controlId="formBasicText"
              >
                <ControlLabel>Enter name</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.name}
                  placeholder="Enter Name"
                  onChange={this.onChange}
                  id="name"
                />
                <FormControl.Feedback />
              </FormGroup>
              <FormGroup
                controlId="formBasicText"
              >
                <ControlLabel>Enter comment</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.comment}
                  onChange={this.onChange}
                  placeholder="Enter Name"
                  id='comment'
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
                  Response Document
                  </h4>
                <pre>
                  {JSON.stringify(this.state.doc, null, 2)}
                </pre>
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid >
    )
  }
}

const style = {
  stitch: {
    color: '#4ca84a'
  }
}
export default Insert; 