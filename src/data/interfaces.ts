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
    readonly value?: T
}

export interface IVideoFile {
    quality ?: string
    location ?: URI
}

/**
 * Provides movie related fields as found in themoviedb API description (v4)
 */
export interface IMovie {
    readonly adult?: boolean
    readonly backdrop_path?: string
    readonly belongs_to_collection?: object
    readonly budget?: number
    readonly genres?: INamedValue<number>[]
    readonly homepage?: string
    readonly id?: number
    readonly imdb_id?: string // minLength: 9, maxLength: 9, pattern: ^tt[0-9]{7}
    readonly original_language?: string
    readonly original_title?: string
    readonly overview?: string
    readonly popularity?: number
    readonly poster_path?: string
    readonly production_companies?: INamedValue<number>[]
    readonly production_countries?: INamedValue<ISO_3166_1>[]
    readonly release_date?: string // format: date
    readonly revenue?: number
    readonly runtime?: number
    readonly spoken_languages?: INamedValue<ISO_639_1>[]
    readonly status?: string
    readonly tagline?: string
    readonly title?: string
    readonly video?: boolean
    readonly vote_average?: number
    readonly vote_count?: number

    videoFile ?: IVideoFile
}

export interface IListProps {
    movies : IMovie[];
    onMovieChanged ?: (movies: IMovie[]) => void;
}

export interface IListState {
    selectedMovies : IMovie[]
}