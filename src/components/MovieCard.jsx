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
    console.log('SONO COMPONENTDIDMOUNT')
    // eseguiamo all'avvio il recupero dati da OMDb
    this.getMovieDetails()
    // componentDidMount esegue la fetch un'unica volta all'avvio del componente
  }

  //   il pregio/difetto di componentDidMount è che viene eseguito SOLO UNA VOLTA per ogni montaggio!
  // poichè il componente MovieCard è GIÀ montato dall'avvio della Vite App, abbiamo bisogno di qualcos'altro
  // un metodo che riesca ad intercettare le fasi di AGGIORNAMENTO del componente

  componentDidUpdate(prevProps, prevState) {
    console.log('SONO COMPONENTDIDUPDATE')
    // questo metodo viene lanciato immediatamente DOPO una fase di aggiornamento
    // componentDidUpdate avviene immediatamente dopo un cambio di PROPS o un cambio di STATE nel componente
    // quando un componente riceve una nuova prop o quando un componente cambia lo stato, componentDidUpdate
    // viene AUTOMATICAMENTE ri-eseguito
    // componentDidUpdate ci mette a disposizione nei suoi parametri due oggetti:
    // 1) l'oggetto delle PROPS PRECEDENTI l'update
    // 2) l'oggetto dello STATE PRECEDENTE l'update
    // this.getMovieDetails()

    // componentDidUpdate come render viene ri-eseguito ad ogni aggiornamento, cioè ad ogni cambio di prop
    // e ad ogni cambio di state

    // con i 2 parametri di componentDidUpdate noi possiamo DISTINGUERE se siamo entrati in questa fase
    // di "aggiornamento" se è cambiato lo state o se sono cambiate le props!

    // cerchiamo di ISOLARE l'esecuzione di this.getMovieDetails() SOLO quando cambiano le props
    if (prevProps.title !== this.props.title) {
      console.log('CAMBIATO VALORE DEL FILM DALLA TENDINA')
      // se entriamo in questo if, abbiamo la certezza che è cambiato il VALORE DELLA TENDINA (la prop title)
      this.getMovieDetails() // <-- prendo i dettagli del nuovo film
      //   questa funzione verrà eseguita solo se siamo entrati nella fase di aggiornamento a causa di un cambio del titolo!
    }

    // con il prevState voi verificate un cambio di state per eseguire una fetch, o quello che volete
    // prevState vi permetterebbe di fare una fetch o quello che volete sul cambio magari di una PRECISA
    // proprietà di stato che cambia
    // if(prevState.ciccio !== this.state.ciccio) {
    //   in questo caso non ci sarebbero ripercussioni se cambiasse lo state in una proprietà DIVERSA da "ciccio"
    // }
  }

  render() {
    console.log('SONO RENDER')
    // this.getMovieDetails() <-- NON VA BENE!! LOOP INFINITO

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
