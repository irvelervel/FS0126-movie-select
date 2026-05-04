import { Col, Container, Row } from 'react-bootstrap'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Component } from 'react'
import MovieCard from './components/MovieCard'
import MovieSelect from './components/MovieSelect'

class App extends Component {
  state = {
    // intendo con questo stato controllare l'input per la scelta del film
    title: 'Iron Man',
  }

  changeAppState = (e) => {
    this.setState({
      title: e.target.value,
    })
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
              <MovieSelect
                // movieSelect riceve il value da App
                value={this.state.title}
                // movieSelect riceve l'onChange da App
                onChange={this.changeAppState}
              />
            </Col>
          </Row>
          <Row className="justify-content-center mt-3">
            <Col xs={12} md={6}>
              {/* qui dentro monteremo MovieCard */}
              {/* MovieCard riceverà dal componente App tramite prop il titolo selezionato nella tendina */}
              <MovieCard title={this.state.title} />
              {/* la prop title inizialmente è "Iron Man", poi diventa "The Avengers" etc. */}
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}

export default App
