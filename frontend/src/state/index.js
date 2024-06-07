import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: null,
    token: null,
    song: [],
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
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
        setSongs: (state, action) => {
            state.songs = action.payload.songs;
        },
        setSong: (state, action) => {
            const updatedSongs = state.songs.map((song) => {
                if(song.id === action.payload.song_id) return action.payload.song;
                return song;
            });

            state.songs = updatedSongs; 
        }
    }
})

export const { setMode, setLogin, setLogout, setFollowers, setSongs, setSong } = authSlice.actions;
export default authSlice.reducer;