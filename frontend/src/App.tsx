import { gql, useQuery } from "@apollo/client"
import { NewMovieForm } from "./components/NewUserForm";

type Movie = {
  id: string;
  name: string;
}

export const GET_MOVIE = gql`

  query {
    users{
      id
      name
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
        {data?.movies.map(movie => <li key={movie.id}>{movie.name}</li>)}
      </ul>
      <NewMovieForm />
    </div>
  )
}

export default App
