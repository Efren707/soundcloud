import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    song: null,
    songs: [],
    userSongs: [],
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setRegister: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        updateUser: (state, action) => {
            state.user = action.payload.updatedUser;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
            state.song = null;
            state.songs = null;
            state.userSongs = null;
        },
        setFollowers: (state, action) => {
            if(state.user){
                state.user.followers = action.payload.followers;
            } else {
                console.error("user followers non-existent");
            }
        },
        getSongs: (state, action) => {
            state.songs = action.payload.songs;
        },
        getUserSongs: (state, action) => {
            state.userSongs = action.payload.userSongs;
        },
        playSong: (state, action) => {
            state.song = action.payload.song;
        },
        uploadSong: (state, action) => {
            state.song = action.payload.uploadedSong;
        },
        updateSong: (state, action) => {
            state.song = action.payload.updatedSong;
        },
        deleteSong: (state, action) => {
            let deletedSongId = action.payload.deletedSong;
            let filteredUserSongs = state.userSongs.filter(song => song._id !== deletedSongId);
            state.userSongs = filteredUserSongs;
        },
    }
})

export const { setLogin, setRegister, updateUser, setLogout, setFollowers, getSongs, getUserSongs, playSong, uploadSong, updateSong, deleteSong } = authSlice.actions;
export default authSlice.reducer;