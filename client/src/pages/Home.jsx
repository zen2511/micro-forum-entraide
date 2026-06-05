import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Forum Entraide</h1>
      <p>Teste avec une question qui existe en base :</p>
      <Link to="/question/1">Voir Question 1</Link>
      <br />
      <Link to="/question/2">Voir Question 2</Link>
    </div>
  );
}

export default Home;