import React, {useEffect, useState} from "react";

import "./styles.css";
import api from './services/api'

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(()=> {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    });
  },[]);
 
  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'Desafio Conceitos React',
      url:'rocketseat.com.br',
      techs: [
        'node', 'react', 'react native'
      ]
    })
    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`)
      let filteredArray = repositories.filter(repository => repository.id !== id)
      setRepositories(filteredArray);
    } catch (error) {
      console.log('👎Error')
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
            <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
          )}  
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}
export default App;