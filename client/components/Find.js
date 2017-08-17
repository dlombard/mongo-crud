import React from 'react'
import { Grid, Col, Row, FieldGroup, Form, FormGroup, ControlLabel, FormControl, HelpBlock, Button, Panel, PageHeader } from 'react-bootstrap'
import { VARS } from '../variables'
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
      url: VARS.api,
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
    let url = `${this.state.url}/${this.state.name}`

    fetch(url, {
      method: 'GET',
      mode: 'cors',
      redirect: 'follow',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
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
        <PageHeader><small style={style.stitch}>Find</small></PageHeader>
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
export default Find; 
