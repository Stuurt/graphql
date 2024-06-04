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
            duration
        }
    }
`;

export function NewMovieForm() {
    const [name, setName] = useState('');
    const [ageGroup, setAgeGroup] = useState('');
    const [category, setCategory] = useState('');
    const [duration, setDuration] = useState('');
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
                duration,
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
            <input type="text" value={duration} onChange={e => setDuration(e.target.value)} />
            <button type="submit">Enviar</button>
        </form>
    )
}