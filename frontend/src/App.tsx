import { gql, useQuery } from "@apollo/client"
import { NewMovieForm } from "./components/NewMovieForm";

type Movie = {
  id: string;
  name: string;
  ageGroup: string;
  category: string;
  releaseDate: string;
  duration: string;
  director: string;
  movieCast: string;
  producer: string;
}

export const GET_MOVIE = gql`

  query {
    movies{
      id
      name
      ageGroup
      category
      releaseDate
      duration
      director
      movieCast
      producer
    }
  }
`;


function App() {

  const { data, loading } = useQuery<{ movies: Movie[] }>(GET_MOVIE)

  console.log(data)

  if (loading) {
    return <p>Carregando...</p>
  }

  return (
    <div>
      <ul>
        {data?.movies.map(movie => <li key={movie.id}>
          <h4>Nome do filme: {movie.name}</h4> <h4>Faixa etária: {movie.ageGroup} </h4>
          <h4>Categoria: {movie.category}</h4> <h4>Data de lançamento: {movie.releaseDate}</h4>
          <h4>Duração: {movie.duration}</h4> <h4>Diretor: {movie.director}</h4>
          <h4>Elenco: {movie.movieCast}</h4> <h4>Produtor: {movie.producer}</h4> -------- </li>)}
      </ul>
      <NewMovieForm />
    </div>
  )
}

export default App
