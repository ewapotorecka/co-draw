import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <Helmet>
        <title>Art Fusion</title>
      </Helmet>
      <h1>Home</h1>

      <Link to="/rooms">Rooms</Link>
    </div>
  );
}

export default Home;
