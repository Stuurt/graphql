import { gql, useMutation } from "@apollo/client";
import { FormEvent, useState } from "react";
import { GET_MOVIE } from "../App";

const CREATE_MOVIE = gql`
    mutation ($name: String!) {
        createMovie(name: $name){
            id
            name
        }
    }
`;

export function NewMovieForm() {
    const [name, setName] = useState('');
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
            },
            refetchQueries: [GET_MOVIE]
        })

        console.log(data);
    }

    return(
        <form onSubmit={handleCreateMovie}>
            <input type="text" value={name} onChange={e => setName(e.target.value)} />
            <button type="submit">Enviar</button>
        </form>
    )
}