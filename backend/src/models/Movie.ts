import { Field, ID, ObjectType } from "type-graphql";


@ObjectType()
export class Movie {

    @Field(_type => ID)
    id: string;

    @Field()
    name: string;

    @Field()
    ageGroup: string;

    @Field()
    category: string;

    @Field()
    releaseDate: string;

    @Field()
    duration: string;

    @Field()
    director: string;

    @Field()
    movieCast: string;

    @Field()
    producer: string;
    
}