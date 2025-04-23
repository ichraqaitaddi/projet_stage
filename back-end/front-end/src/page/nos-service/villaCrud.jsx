import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './villaCrud.css';

function VillaCrud() {
  const [villas, setVillas] = useState([]);
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [prix, setPrix] = useState('');
  const [adresse, setAdresse] = useState('');
  const [image, setImage] = useState(null);
  const [editing, setEditing] = useState(null); // Pour savoir si on est en mode édition

  const fetchVillas = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/villas');
      setVillas(res.data);
    } catch (error) {
      console.error('Erreur de chargement des villas:', error);
    }
  };

  useEffect(() => {
    fetchVillas();
  }, []);

  const handleAddVilla = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('titre', titre);
    formData.append('description', description);
    formData.append('prix', prix);
    formData.append('adresse', adresse);
    formData.append('image', image);

    try {
      if (editing) {
        // Si on édite une villa existante
        await axios.put(`http://localhost:8000/api/villas/${editing.id}`, formData);
      } else {
        // Si on ajoute une nouvelle villa
        await axios.post('http://localhost:8000/api/villas', formData);
      }
      fetchVillas(); // Recharger les villas après l'ajout ou la modification
      setTitre('');
      setDescription('');
      setPrix('');
      setAdresse('');
      setImage(null);
      setEditing(null); // Réinitialiser le mode édition
    } catch (error) {
      console.error('Erreur lors de l\'ajout ou modification de la villa:', error);
      alert('Une erreur est survenue.');
    }
  };

  const handleEdit = (villa) => {
    setTitre(villa.titre);
    setDescription(villa.description);
    setPrix(villa.prix);
    setAdresse(villa.adresse);
    setEditing(villa); // Mettre la villa en mode édition
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/villas/${id}`);
      fetchVillas(); // Recharger les villas après la suppression
    } catch (error) {
      console.error('Erreur de suppression:', error);
    }
  };

  return (
    <div className="villa-crud-container">
      <h2>{editing ? 'Modifier une Villa' : 'Ajouter une Villa'}</h2>
      <form onSubmit={handleAddVilla} className="villa-form">
        <input type="text" placeholder="Titre" value={titre} onChange={(e) => setTitre(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="number" placeholder="Prix" value={prix} onChange={(e) => setPrix(e.target.value)} required />
        <input type="text" placeholder="Adresse" value={adresse} onChange={(e) => setAdresse(e.target.value)} required />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
        <button type="submit">{editing ? 'Sauvegarder les modifications' : 'Ajouter Villa'}</button>
      </form>

      <h2>Liste des Villas</h2>
      <table className="villa-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Titre</th>
            <th>Description</th>
            <th>Prix</th>
            <th>Adresse</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {villas.map((villa) => (
            <tr key={villa.id}>
              <td>{villa.id}</td>
              <td>{villa.titre}</td>
              <td>{villa.description}</td>
              <td>{villa.prix} DH</td>
              <td>{villa.adresse}</td>
              <td>
                <img src={`http://localhost:8000/images/${villa.image}`} alt={villa.titre} style={{ width: '100px' }} />
              </td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(villa)}>Modifier</button>
                <button className="delete-btn" onClick={() => handleDelete(villa.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VillaCrud;
