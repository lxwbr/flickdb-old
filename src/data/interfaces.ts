/**
 * Country standard.
 */
export type ISO_3166_1 = string
/**
 * Language standard.
 */
export type ISO_639_1 = string

export type URI = string

/**
 * Name-value wrapper.
 */
export interface INamedValue<T> {
    readonly name?: string
    value?: T
}

export interface IVideoFile {
    quality ?: string
    location ?: URI
}

/**
 * Provides movie related fields as found in themoviedb API description (v4)
 */
export interface IMovie {
    adult?: boolean
    backdrop_path?: string         // TODO: not implemented
    belongs_to_collection?: object // TODO: not implemented
    budget?: number
    genres?: INamedValue<number>[]
    homepage?: string
    id?: number
    imdb_id?: string // minLength: 9, maxLength: 9, pattern: ^tt[0-9]{7}
    original_language?: string
    original_title?: string
    overview?: string
    popularity?: number
    poster_path?: string
    production_companies?: INamedValue<number>[]
    production_countries?: INamedValue<ISO_3166_1>[]
    release_date?: string // format: date
    revenue?: number
    runtime?: number
    spoken_languages?: INamedValue<ISO_639_1>[]
    status?: string
    tagline?: string
    title?: string
    video?: boolean
    vote_average?: number
    vote_count?: number

    videoFile ?: IVideoFile
}

export interface IListProps {
    movies : IMovie[];
    onMoviePropChange ?: (prop: String, value: any) => void;
}

export interface IListState {
    selectedMovies : IMovie[]
}

export interface IMovieDetailsProps {
    movie: IMovie;
    onMovieChanged ?: (movie: IMovie) => void;
}

export interface IGenreChipProps {
    genre: String;
    onRemove: () => void;
}

export interface IGenresSelectorProps {
    genres: String[];
    possibleGenres: String[];
    onGenresChanged ?: (genres: String[]) => void;
}
