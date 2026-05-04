// MovieCard sarà un componente che recupererà informazioni all'avvio sul film selezionato
// ne consegue quindi che dovrà effettuare una chiamata API per recuperare questi dati
// questi dati dovranno venire salvati in uno stato -> CLASS COMPONENT

import { Component } from 'react'
import { Card } from 'react-bootstrap'

class MovieCard extends Component {
  // il valore della tendina sta venendo ricevuto qui in MovieCard tramite this.props.title
  // con questa informazione saremo in grado di fare una fetch su OMDb e recuperare le info del film
  // da far vedere nella Card
  render() {
    return (
      <Card>
        <Card.Img variant="top" src="https://placecats.com/500/500" />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }
}

export default MovieCard
