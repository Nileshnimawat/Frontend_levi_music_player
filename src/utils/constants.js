// BACKEND URL
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Auth Routes
export const LOGOUT = `${BASE_URL}/api/v1/user/logout`;
export const LOGIN = `${BASE_URL}/api/v1/user/login`;
export const SIGNUP = `${BASE_URL}/api/v1/user/signup`;
export const MY_PROFILE = `${BASE_URL}/api/v1/user/myprofile`;
export const LIKED_OR_DISLIKE = `${BASE_URL}/api/v1/user/likeOrDislike`;

// Music Routes
export const UPLOAD_MUSIC = `${BASE_URL}/api/v1/music/upload`;

// Playlist Routes
export const CREATE_PLAYLIST = `${BASE_URL}/api/v1/playlist/createPlaylist`;
export const DELETE_PLAYLIST = `${BASE_URL}/api/v1/playlist/deletePlaylist`;
export const ADD_MUSIC_TO_PLAYLIST = `${BASE_URL}/api/v1/playlist/addMusic`;
export const REMOVE_MUSIC_FROM_PLAYLIST = `${BASE_URL}/api/v1/playlist/removeMusic`;


//musics
export const GET_MUSICS =`${BASE_URL}/api/v1/music`
export const GET_PLAYLIST = `${BASE_URL}/api/v1/playlist`
export const GET_GLOBAL_PLAYLIST = `${BASE_URL}/api/v1/playlist/global`

export const GET_USER_LIKED_MUSICS = `${BASE_URL}/api/v1/user/likedMusics`
export const GET_PLAYLIST_BY_ID = `${BASE_URL}/api/v1/playlist`

export const GET_STATS = `${BASE_URL}/api/v1/user/stats`

export const SEARCH_QUERY =  `${BASE_URL}/api/v1/user/search`

export const HOME_PAGE_PLAYLIST = `${BASE_URL}/api/v1/playlist/homePlaylists`