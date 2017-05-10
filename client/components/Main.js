import React from 'react'
import { Grid, Col, Row, FieldGroup, Form, FormGroup, ControlLabel, FormControl, HelpBlock, Well, Button } from 'react-bootstrap'

class Main extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      doc: '',
      name: 'name',
      comment: 'my comment'
    }
  }

  onChange = (e) => {
    e.preventDefault()
    console.log(`EVENT ${e}`)
    let obj = {}
    obj[e.target.id] = e.target.value
    this.setState(obj)
  }

  onChangeComment = (e) => {
    e.preventDefault()
    this.setState({
      comment: e.target.value
    })
  }
  submit = (e) => {
    e.preventDefault();
    const payload = {
      name: this.state.name,
      comment: this.state.comment
    };
    const url = 'https://baas-dev.10gen.cc/api/client/v1.0/app/trymongo-red-kxrlp/svc/TryMongoHTTP/incomingWebhook/591310a5e37e6b0bfbad7bb0?secret=SECRET'

    fetch(url, {
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
          doc: JSON.stringify(json)
        })
      }).
      catch((err) => {
        console.error(err)
      })
  }
  render() {
    return (
      <Grid>
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
              <Button type='submit'>
                Submit
              </Button>
            </Form>
          </Col>
          <Col md={6}>
            <Well>
              {this.state.doc}
            </Well>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default Main; 