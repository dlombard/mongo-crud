import React from 'react'
import { Grid, Col, Row, FieldGroup, Form, FormGroup, ControlLabel, FormControl, HelpBlock, Button, Panel, PageHeader } from 'react-bootstrap'

/*
This component updates a comment by id.

curl -XPOST -H "Content-type: application/json" -d '{"id":{"$oid":"591388d7c5557cf79d4b80d7"},"comment":"UnmistakableComment"}' 'https://baas-dev.10gen.cc/api/client/v1.0/app/trymongo-red-kxrlp/svc/TryMongoHTTP/incomingWebhook/59138cd057e0fa0be0d8913c?secret=SECRET'
*/

class Delete extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      doc: '',
      id: 'id',
      comment: 'updated comment',
      curl: '',
      url: 'https://baas-dev.10gen.cc/api/client/v1.0/app/trymongo-red-kxrlp/svc/TryMongoHTTP/incomingWebhook/59139393e37e6b0bfbad84e9?secret=SECRET',
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
      id: { '$oid': this.state.id }
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
          curl: `curl -XPOST -H "Content-type: application/json" -d '${JSON.stringify(payload)}' ${this.state.url}`,
          node: `client.anonymousAuth().then(() => {
    db.collection('trymongo').deleteOne({id: {'$oid': '${this.state.id}'});
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
