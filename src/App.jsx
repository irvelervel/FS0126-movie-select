import { Col, Container, Form, Row } from 'react-bootstrap'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Component } from 'react'
import MovieCard from './components/MovieCard'

class App extends Component {
  state = {
    // intendo con questo stato controllare l'input per la scelta del film
    title: 'Iron Man',
  }

  render() {
    return (
      <>
        <Container>
          <Row className="my-3">
            <Col className="text-center">
              <h2>Scegli il tuo film!</h2>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs={12} md={6}>
              <Form.Select
                aria-label="Default select example"
                value={this.state.title}
                onChange={(e) => {
                  this.setState({
                    title: e.target.value,
                  })
                }}
              >
                <option>Iron Man</option>
                <option>The Avengers</option>
                <option>Black Widow</option>
                <option>Doctor Strange</option>
                <option>Spider Man No Way Home</option>
              </Form.Select>
            </Col>
          </Row>
          <Row className="justify-content-center mt-3">
            <Col xs={12} md={6}>
              {/* qui dentro monteremo MovieCard */}
              {/* MovieCard riceverà dal componente App tramite prop il titolo selezionato nella tendina */}
              <MovieCard title={this.state.title} />
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}

export default App
