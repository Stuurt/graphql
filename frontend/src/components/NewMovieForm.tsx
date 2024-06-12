import { gql, useMutation } from "@apollo/client";
import { FormEvent, useState } from "react";
import { GET_MOVIE } from "../App";

const CREATE_MOVIE = gql`
    mutation ($name: String!,
            $ageGroup: String!,
            $category: String!,
            $releaseDate: String!,
            $duration: String!,
            $director: String!,
            $movieCast: String!,
            $producer: String!){
        createMovie(name: $name,
                    ageGroup: $ageGroup,
                    category: $category,
                    releaseDate: $releaseDate,
                    duration: $duration,
                    director:$director,
                    movieCast: $movieCast,
                    producer: $producer){
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

export function NewMovieForm() {
    const [name, setName] = useState('');
    const [ageGroup, setAgeGroup] = useState('');
    const [category, setCategory] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [duration, setDuration] = useState('');
    const [director, setDirector] = useState('');
    const [movieCast, setMovieCast] = useState('');
    const [producer, setProducer] = useState('');
    const [createMovie, {data, loading, error}] = useMutation(CREATE_MOVIE)

    async function handleCreateMovie(event: FormEvent) {
        event.preventDefault();

        if (!name || !ageGroup || !category || !releaseDate || !duration || !director || !movieCast || !producer){
            return;
        }

        if (loading) {
            return <p>Carregando...</p>
        }

        if (error) {
            return <p>Erro!</p>
        }

        await createMovie({
            variables: {
                name,
                ageGroup,
                category,
                releaseDate,
                duration,
                director,
                movieCast,
                producer,
            },
            refetchQueries: [GET_MOVIE]
        })

        console.log(data);
    }

    return(
        <form onSubmit={handleCreateMovie}>
            <p>Nome do Filme: <input type="text" value={name} onChange={e => setName(e.target.value)} /></p>  
            <p>Faixa Etária: <input type="text" value={ageGroup} onChange={e => setAgeGroup(e.target.value)} /></p>
            <p>Categoria: <input type="text" value={category} onChange={e => setCategory(e.target.value)} /></p>
            <p>Data de Lançamento: <input type="text" value={releaseDate} onChange={e => setReleaseDate(e.target.value)} /></p>
            <p>Duração: <input type="text" value={duration} onChange={e => setDuration(e.target.value)} /></p>
            <p>Diretor: <input type="text" value={director} onChange={e => setDirector(e.target.value)} /></p>
            <p>Elenco: <input type="text" value={movieCast} onChange={e => setMovieCast(e.target.value)} /></p>
            <p>Produtor: <input type="text" value={producer} onChange={e => setProducer(e.target.value)} /></p>
            <button type="submit">Enviar</button>
        </form>
    )
}