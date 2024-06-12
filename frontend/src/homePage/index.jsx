import { useSelector } from "react-redux";

const HomePage = () => {
    const {_id, userName, email, password, profilePicPath, followers, following} = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);

    return (
        <div>
            <h1>HomePage</h1>
            <h2>{userName}</h2>
        </div>
    );

};

export default HomePage;