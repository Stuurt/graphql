import { gql, useMutation } from "@apollo/client";
import { FormEvent, useState } from "react";
import { GET_MOVIE } from "../App";

const CREATE_MOVIE = gql`
    mutation {
        createMovie(){
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

        if (!name){
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
            <input type="text" value={name} onChange={e => setName(e.target.value)} />
            <input type="text" value={ageGroup} onChange={e => setAgeGroup(e.target.value)} />
            <input type="text" value={category} onChange={e => setCategory(e.target.value)} />
            <input type="text" value={releaseDate} onChange={e => setReleaseDate(e.target.value)} />
            <input type="text" value={duration} onChange={e => setDuration(e.target.value)} />
            <input type="text" value={director} onChange={e => setDirector(e.target.value)} />
            <input type="text" value={movieCast} onChange={e => setMovieCast(e.target.value)} />
            <input type="text" value={producer} onChange={e => setProducer(e.target.value)} />
            <button type="submit">Enviar</button>
        </form>
    )
}