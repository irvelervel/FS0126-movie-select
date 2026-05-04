// MovieCard sarà un componente che recupererà informazioni all'avvio sul film selezionato
// ne consegue quindi che dovrà effettuare una chiamata API per recuperare questi dati
// questi dati dovranno venire salvati in uno stato -> CLASS COMPONENT

import { Component } from 'react'
import { Alert, Card, Placeholder } from 'react-bootstrap'

class MovieCard extends Component {
  // il valore della tendina sta venendo ricevuto qui in MovieCard tramite this.props.title
  // con questa informazione saremo in grado di fare una fetch su OMDb e recuperare le info del film
  // da far vedere nella Card

  state = {
    // movieDetails diventerà un oggetto con i dati del film selezionato da OMDb
    movieDetails: {},
    isLoading: true,
    isError: false,
  }

  getMovieDetails = () => {
    fetch('http://www.omdbapi.com/?apikey=24ad60e9&s=' + this.props.title)
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('Response non ok', response.status)
        }
      })
      .then((movieResults) => {
        console.log(movieResults.Search[0])
        // adesso farò un setState
        this.setState({
          movieDetails: movieResults.Search[0],
          isLoading: false, // spengo l'indicatore di caricamento
        })
        // inserisco nello stato del componente il PRIMO risultato della ricerca (quello più pertinente)
        // questo setState provoca una nuova invocazione di render()!
      })
      .catch((err) => {
        console.log('Errore recupero film', err)
        this.setState({
          isLoading: false, // spengo l'indicatore di caricamento
          isError: true, // accendo il messaggio d'errore
        })
      })
  }

  componentDidMount() {
    // eseguiamo all'avvio il recupero dati da OMDb
    this.getMovieDetails()
    // componentDidMount esegue la fetch un'unica volta all'avvio del componente
  }

  render() {
    // siamo in errore? se sì, mostrami l'Alert altrimenti -> siamo in caricamento? se sì, mostrami i placeholder,
    // altrimenti mostrami la card con il film
    return this.state.isError ? (
      <Alert variant="danger">Errore nel recupero film</Alert>
    ) : this.state.isLoading ? (
      <Card>
        <Card.Img variant="top" src="placeholder.png" />
        <Card.Body>
          <Placeholder as={Card.Title} animation="glow">
            <Placeholder xs={6} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={4} /> - <Placeholder xs={6} />{' '}
          </Placeholder>
        </Card.Body>
      </Card>
    ) : (
      <Card>
        <Card.Img variant="top" src={this.state.movieDetails.Poster} />
        <Card.Body>
          <Card.Title>{this.state.movieDetails.Title}</Card.Title>
          <Card.Text>
            {this.state.movieDetails.Year} - {this.state.movieDetails.imdbID}
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }
}

export default MovieCard
