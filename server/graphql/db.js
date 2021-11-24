export let movies = [
    {
        id:1,
        name: "Star Wars",
        score: 1
    },
    {
        id:2,
        name: "Avengers",
        score: 9
    },
    {
        id:3,
        name: "Transformer",
        score: 1
    },
    {
        id:4,
        name: "Logan",
        score: 2
    },
    {
        id:5,
        name: "Fast Furious",
        score: 8
    },
]


export const getById = id => {
    const filteredMovie = movies.filter(x => id === x.id);
    return filteredMovie[0];
}

export const getMovies = () => movies;

export const deleteMovie = (id) => {
    const cleanMovies = movies.filter(x => x.id !== id);
    if( movies.length > cleanMovies.length ){
        movies = cleanMovies;
        return true;
    }else{
        return false;
    }
}

export const addMovie = (name,score) => {
    const newMovie = {
        id: movies.length+1,
        name,
        score
    };
    movies.push(newMovie);
    return newMovie;
}

