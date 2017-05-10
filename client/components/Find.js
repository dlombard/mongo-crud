import React from 'react'
import { Grid, Col, Row, FieldGroup, Form, FormGroup, ControlLabel, FormControl, HelpBlock, Button, Panel, PageHeader } from 'react-bootstrap'

/*
This component finds by name.

NOTE: there is a different webhook to find all documents:
curl -XPOST -H "Content-type: application/json" -d '{}' 'https://baas-dev.10gen.cc/api/client/v1.0/app/trymongo-red-kxrlp/svc/TryMongoHTTP/incomingWebhook/591310fae37e6b0bfbad7bb9?secret=SECRET'
*/

class Find extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      doc: '',
      name: 'name',
      curl: '',
      url: 'https://baas-dev.10gen.cc/api/client/v1.0/app/trymongo-red-kxrlp/svc/TryMongoHTTP/incomingWebhook/591388da57e0fa0be0d88fb7?secret=SECRET'
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
      name: this.state.name,
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
          doc: json,
          curl: `curl -XPOST -H "Content-type: application/json" -d '${JSON.stringify(payload)}' ${this.state.url}`
        })
      }).
      catch((err) => {
        console.error(err)
      })
  }
  render() {
    return (
      <Grid>
        <PageHeader>Find</PageHeader>
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
              <Button type='submit'>
                Submit
              </Button>
            </Form>
          </Col>
          <Col md={6}>
            <Row>
              <Col>
                <h4>
                  Curl command generated
                  </h4>
                <Panel>
                  {this.state.curl}
                </Panel>
              </Col>
              <Col>
                <h4>
                  Found Documents
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

export default Find; 
