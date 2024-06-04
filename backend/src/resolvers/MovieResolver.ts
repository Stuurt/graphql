import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Movie } from "../models/Movie";
import crypto from 'crypto'

// query: buscar dados
// mutation: criar, alterar ou deletar

@Resolver()
export class MovieResolver {

    private data: Movie[] = [];

    @Query(() => [Movie])
    async movies(){
        return this.data;
    }

    @Mutation(() => Movie)
    async createMovie(
        @Arg('name') name: string,
        @Arg('ageGroup') ageGroup: string,
        @Arg('category') category: string,
        @Arg('duration') duration: string,
    ){
        const movie = { id: crypto.randomUUID(), name, ageGroup, category, duration}

        this.data.push(movie)

        return movie;
    }
}