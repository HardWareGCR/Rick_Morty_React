import React, { useState, useEffect } from 'react';
import { getCharacterById } from './services/api.js';
import logo from '/Rick_and_Morty.svg';
import './App.css';

function App() {
  const [character, setCharacter] = useState(null);
  const [episode, setEpisode] = useState(null);
  const [id, setId] = useState(1);
  const [input, setInputid] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getCharacterById(id);

        if (data.id != undefined) {
          setCharacter(data);

        } else {
          
        }



      } catch (error) {
        console.error('Erro ao buscar o personagem:', error);
        setError('Falha ao obter os dados do personagem.');
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [id]);

  const handleSearch = (event) => {

    const searchId = parseInt(id);

    if (!searchId || searchId < 1 || searchId > 826) {
      alert('Por favor, insira um ID válido entre 1 e 826.');
      return;
    }

    setId(searchId);
  };

  const handlePrev = () => {
    setId((prevId) => Math.max(1, prevId - 1));
  };

  const handleNext = () => {
    setId((prevId) => (prevId < 826 ? prevId + 1 : prevId));
  };

  return (
    <div className="App">
      <div className="container">
        <div >
          <img src={logo} alt="Logo" style={{ height: '100px', marginLeft: '40px', margin: '15px' }} />
        </div>
        <div className="mb-4">
          <div className="input-group">
            <input type="number" name="searchId" value={id} onChange={(element) => setId(element.target.value)} className="form-control" placeholder="Enter character ID..." />
            <button onClick={handleSearch} type="submit" className="btn btn-primary">Search</button>
          </div>
        </div>
        {loading && <p className="text-center text-light">Loading...</p>}
        {error && <p className="text-center text-danger">{error}</p>}
        {character && !loading && (
          <div className="card mb-4 mx-auto" style={{ maxWidth: '500px' }}>
            <img src={character.image} className="card-img-top" alt={character.name} />
            <div className="card-body">
              <h2 className="card-title">{character.name}</h2>
              <p className="card-text"><strong>Status:</strong> {character.status}</p>
              <p className="card-text"><strong>Espécie:</strong> {character.species}</p>
              <p className="card-text"><strong>Gênero:</strong> {character.gender}</p>
              <p className="card-text"><strong>Origem:</strong> {character.origin.name}</p>
              <p className="card-text"><strong>Localização:</strong> {character.location.name}</p>
              <p className="card-text"><strong>Criada:</strong> {new Date(character.created).toLocaleDateString()}</p>
              <p className="card-text">
                <strong>Episodes:</strong>
                <ul>
                  {character.episode.map((ep) => (
                    <li><a href='#'>{ep}</a></li>
                  ))}
                </ul>
              </p>
            </div>
          </div>
        )}
        <div className="d-flex justify-content-center gap-2">
          <button onClick={handlePrev} className="btn btn-secondary me-2">Previous</button>
          <button onClick={handleNext} className="btn btn-secondary">Next</button>
        </div>
      </div>
    </div>
  );
}

export default App;
