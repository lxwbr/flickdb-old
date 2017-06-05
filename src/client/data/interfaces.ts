/**
 * Country standard.
 */
export type ISO_3166_1 = string
/**
 * Language standard.
 */
export type ISO_639_1 = string

export type URI = string

export type ID = string

/**
 * Name-value wrapper.
 */
export interface INamedValue<T> {
    readonly name?: string
    value: T
}

export interface INode {
    readonly id: ID
}

export interface IEdge<T extends INode> {
    readonly id: ID
    readonly node: T
}

export interface IConnection<T extends INode> {
    readonly id: ID
    readonly edges: IEdge<T>[]
}

export interface IVideoFile {
    quality ?: string
    location ?: URI
}

export interface IGenre extends INamedValue<number> {
    // Nothing additional here for now
}

/**
 * Provides movie related fields as found in themoviedb API description (v4)
 */
export interface IMovie extends INode {
    adult?: boolean
    backdrop_path?: string         // TODO: not implemented
    belongs_to_collection?: object // TODO: not implemented
    budget?: number
    genres?: IGenre[]
    homepage?: string
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
    onMovieChanged ?: (movie: IMovie) => void;
}

export interface IListState {
    selectedMovies : IMovie[]
}

export interface IMovieDetailsProps {
    movie: IMovie;
    onMoviePropChange ?: (prop: string, value: any) => void;
}

export interface IGenreChipProps {
    key: number;
    genre: IGenre;
    onClick: (genre: IGenre) => void;
}

export interface IGenresSelectorProps {
    genres: IGenre[];
    possibleGenres: IGenre[];
    onGenresChanged ?: (genres: IGenre[]) => void;
}

export interface IViewer {
    id: ID
    movies: IConnection<IMovie>
}