import React from 'react'
import { Grid, Col, Row, FieldGroup, Form, FormGroup, ControlLabel, FormControl, Button, Panel, PageHeader } from 'react-bootstrap'

class Main extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      doc: '',
      name: 'name',
      comment: 'my comment',
      curl: '',
      url: 'https://baas-dev.10gen.cc/api/client/v1.0/app/trymongo-red-kxrlp/svc/TryMongoHTTP/incomingWebhook/591310a5e37e6b0bfbad7bb0?secret=SECRET',
      node: ''
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
          doc: json,
          curl: `curl -XPOST -H "Content-type: application/json" -d '${JSON.stringify(payload)}' '${this.state.url}'`,
          node: `client.anonymousAuth().then(() => {
    db.collection('trymongo').insert({name: '${this.state.name}', comment:'${this.state.comment}'});
  })`
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
                  Curl command generated
                  </h4>
                <Panel>
                  <p>
                    <strong>curl:</strong>
                  </p>
                  <pre><code>
                    {this.state.curl}
                  </code></pre>
                  <br />
                  <p>
                    <strong>node command:</strong>
                  </p>
                  <pre><code>
                    {this.state.node}
                  </code></pre>
                </Panel>
              </Col>
              <Col>
                <h4>
                  Inserted Document
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
export default Main; 