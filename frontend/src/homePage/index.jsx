import { useSelector } from "react-redux";

const HomePage = () => {
  const { _id, picturePath } = useSelector((state) => state.user);

    return (
        <div>
            <h1>HomePage</h1>
        </div>
    );

};

export default HomePage;