import { FiSearch } from "react-icons/fi";
import "./styles.css";
import { useState } from "react";
import api from "./services/api";

function App() {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});

  async function mostrarCEP() {
    if (input === "") {
      alert("Preencha Com CEP")
      return;
    }
    try {
      const resposta = await api.get(`${input}/json`)
      setCep(resposta.data);
      setInput("");
    } catch {
      alert("Ops erro ao buscar");
      setInput("");
    }

  }

  return (
    <div className="container">
      <h1 className="titulo">Buscador CEP</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite seu cep..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="botao" onClick={mostrarCEP}>
          <FiSearch size={25} color="#ffff" />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>

          <span>{cep.logradouro} </span>
          <span>Complemento: {cep.complemento}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>{cep.localidade}-{cep.uf}</span>

        </main>
      )}
    </div>
  );
}

export default App;
