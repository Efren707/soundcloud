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
        }
    }
})

export const { setLogin, setRegister, updateUser, setLogout, setFollowers, getSongs, getUserSongs, playSong, uploadSong } = authSlice.actions;
export default authSlice.reducer;