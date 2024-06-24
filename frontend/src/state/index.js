import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    song: null,
    songs: [],
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
        playSong: (state, action) => {
            state.song = action.payload.song;
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

export const { setLogin, setRegister, updateUser, setLogout, setFollowers, getSongs, playSong, setSong } = authSlice.actions;
export default authSlice.reducer;