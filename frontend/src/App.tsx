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

  query (){
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
          {movie.name}{movie.ageGroup}
          {movie.category}{movie.releaseDate}
          {movie.duration}{movie.director}
          {movie.movieCast}{movie.producer}</li>)}
      </ul>
      <NewMovieForm /> ola
    </div>
  )
}

export default App
