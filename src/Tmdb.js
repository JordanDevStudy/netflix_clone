const API_KEY = '15736b260562b6f8c8df048ce5258399';
const API_BASE = 'https://api.themoviedb.org/3';

/*
- originais netfix
- recomendados (trending)
- em alta (top rated)
- animes
*/

const basicFetch  = async (endpoint) => {
    const req = await fetch (`${API_BASE}${endpoint}`);
    const json = await req.json();
    return json;
}

export default {
    getHomeList: async () => {
        return [
            {
                slug: 'originals',
                title: 'Originais do Netflix',
                items: await basicFetch (`/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug:'trending',
                title: 'Recomendados',
                items: await basicFetch (`/trending/all/week?language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug:'toprated',
                title: 'Em alta',
                items: await basicFetch (`/movie/top_rated?language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug:'animes',
                title: 'Animações Japonesas',
                items: await basicFetch (`/discover/tv?with_genres=16&region=JP&language=pt-BR&api_key=${API_KEY}`)
            },
        ];
    },
    getMovieInfo: async (movieId, type) => {
    let info = {};

    if(movieId) {
        switch(type){
            case 'movie':
                info = await basicFetch(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`);
            break;
            case 'tv':
                info = await basicFetch(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`);
            break;
        }
      }
      return info;
    }
}