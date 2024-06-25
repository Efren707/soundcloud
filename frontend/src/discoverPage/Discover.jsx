import "./styles/discover.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSongs } from "../state";
import axios from "axios";
import SongCarousel from "../components/SongCarousel";

const DiscoverPage = () => {

    const dispatch = useDispatch();
    const { displayName, firstName, lastName, profileURL } = useSelector((state) => state.user);
    const songs = useSelector((state) => state.songs);
    const token = useSelector((state) => state.token);

    const [trendingSongs, setTrendingSongs] = useState([]);
    const [rapSongs, setRapSongs] = useState([]);
    const [corridoSongs, setCorridoSongs] = useState([]);

    const getAllSongs = async () => {

        axios({
            url: "http://localhost:4000/songs",
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data",
            }
        }).then((res) => {
            dispatch(getSongs({ songs: res.data }));
            sortSongs();
        },(err) => {
            console.log(err)
        })

    };

    function sortSongs(){

        let trending = [];
        let rap = [];
        let corridos = [];

        const allSongs = [...songs];

        for(let song of allSongs){
            if(song.genre === "Rap & Hip Hop"){
                rap.push(song)
            } else if(song.genre === "Corridos"){
                corridos.push(song);
            }
        }

        trending = allSongs.sort((a,b) => b.playCount - a.playCount ).slice(0,4);

        setTrendingSongs(trending);
        setCorridoSongs(corridos);
        setRapSongs(rap);

    }

    useEffect(() => {
        getAllSongs();
    }, []); 

    return (
        <div className="discoverContainer">
            <div className="discoverSubcontainer">

                <div className="discoverContent">
                    <SongCarousel title={"Trending"} songs={trendingSongs}/>            
                    <SongCarousel title={"Rap & Hip Hop"} songs={rapSongs}/>            
                    <SongCarousel title={"Corridos"} songs={corridoSongs}/>            
                </div>

                <div className="discoverSidebar"></div>

            </div>
        </div>
    );

};

export default DiscoverPage;