import "./styles/discover.css";
import { useSelector } from "react-redux";
import SongCarousel from "../components/SongCarousel";

const DiscoverPage = () => {
    const { displayName, firstName, lastName, profileURL } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);

    return (
        <div className="discoverContainer">
            <div className="discoverSubcontainer">

                <div className="discoverContent">
                    <SongCarousel/>            
                    <SongCarousel/>            
                    <SongCarousel/>            
                    <SongCarousel/>            
                </div>

                <div className="discoverSidebar"></div>

            </div>
        </div>
    );

};

export default DiscoverPage;