import React from 'react'
import { Grid, Col, Row, FieldGroup, Form, FormGroup, ControlLabel, FormControl, HelpBlock, Button, Panel, PageHeader } from 'react-bootstrap'

/*
This component updates a comment by id.

curl -XPOST -H "Content-type: application/json" -d '{"id":{"$oid":"591388d7c5557cf79d4b80d7"},"comment":"UnmistakableComment"}' 'https://baas-dev.10gen.cc/api/client/v1.0/app/trymongo-red-kxrlp/svc/TryMongoHTTP/incomingWebhook/59138cd057e0fa0be0d8913c?secret=SECRET'
*/

class Update extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      doc: '',
      id: 'id',
      comment: '',
      url: 'http://localhost:8080/api/',
      name: ''
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
      id: this.state.id,
      comment: this.state.comment,
      name: this.state.name
    };


    fetch(this.state.url, {
      method: 'PATCH',
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
        <PageHeader><small style={style.stitch}>Update</small></PageHeader>
        <Row>
          <Col md={6}>
            <Form onSubmit={this.submit}>
              <FormGroup
                controlId="formBasicText"
              >
                <ControlLabel>Enter id</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.id}
                  placeholder="Enter id"
                  onChange={this.onChange}
                  id="id"
                />
                <FormControl.Feedback />
              </FormGroup>
              <FormGroup
                controlId="formBasicText"
              >
                <ControlLabel>Enter Name</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.name}
                  onChange={this.onChange}
                  placeholder="Enter name"
                  id='name'
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
                  placeholder="Enter comment"
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
                  Documents Found
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
export default Update; 
