import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import api from "./sources/api";

import "./styles.css";

function App() {
   const [input, setInput] = useState("");
   const [cep, setCep] = useState({});

   async function handleSearch() {
      // 01310930/json/

      if (input === "") {
         alert("Preencha algum cep!");
         return;
      }
      try {
         const response = await api.get(`${input}/json`);
         setCep(response.data);
         setInput("");
      } catch {
         alert("Digita um cep válido seu animal 😡");
         setInput("");
      }
   }

   return (
      <div className="container">
         <h1 className="title">Buscador CEP</h1>

         <div className="containerInput">
            <input
               type="text"
               placeholder="Digite seu cep..."
               value={input}
               onChange={(e) => setInput(e.target.value)}
            />

            <button className="buttonSearch" onClick={handleSearch}>
               <FiSearch size={25} color="#fff" />
            </button>
         </div>

         {Object.keys(cep).length > 0 && (
            <main className="main">
               <h2>CEP: {cep.cep}</h2>

               <span>{cep.logradouro}</span>
               <span>Bairro: {cep.bairro}</span>
               <span>Cidade: {cep.localidade}</span>
               <span>Estado: {cep.uf}</span>
            </main>
         )}
      </div>
   );
}

export default App;
