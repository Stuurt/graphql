import { gql, useQuery } from "@apollo/client"
import { NewMovieForm } from "./components/NewMovieForm";

type Movie = {
  id: string;
  name: string;
  ageGroup: string;
  category: string;
  duration: string;
}

export const GET_MOVIE = gql`

  query {
    movies{
      id
      name
      ageGroup
      category
      duration
    }
  }
`;


function App() {

  const { data, loading } = useQuery<{ movies: Movie[] }>(GET_MOVIE)

  if (loading) {
    return <p>Carregando...</p>
  }

  return (
    <div>
      <ul>
        {data?.movies.map(movie => <li key={movie.id}>{movie.name}{movie.ageGroup}{movie.category}{movie.duration}</li>)}
      </ul>
      <NewMovieForm />
    </div>
  )
}

export default App
