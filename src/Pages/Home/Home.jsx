import { Helmet } from "react-helmet";
import Banner from "./Banner/Banner";
import Showcase from "./Showcase/Showcase";
import TopFeature from "./TopFeature/TopFeature";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>myStock Pro | Home</title>
            </Helmet>
            <Banner></Banner>
            <TopFeature></TopFeature>
            <Showcase></Showcase>
        </div>
    );
};

export default Home;