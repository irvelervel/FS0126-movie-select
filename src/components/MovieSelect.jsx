import { Form } from 'react-bootstrap'

// qui scorporo il componente della Select per la selezione del film
const MovieSelect = (props) => {
  return (
    <Form.Select
      aria-label="Default select example"
      value={props.value}
      onChange={props.onChange}
    >
      <option>Iron Man</option>
      <option>The Avengers</option>
      <option>Black Widow</option>
      <option>Doctor Strange</option>
      <option>Spider Man No Way Home</option>
    </Form.Select>
  )
}

export default MovieSelect
