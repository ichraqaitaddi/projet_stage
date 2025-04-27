import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VillaManagement.css';
import Sidebar from "../../components/sidebar/sidebar";
import NavbarDashboard from "../../components/navbar-dashboard/navbar";

const VillaManagement = () => {
  const [villagagnez, setVillagagnez] = useState([]);
  const [editingVilla, setEditingVilla] = useState(null);
  const [editedData, setEditedData] = useState({
    titre: '',
    description: ''
  });

  // جلب قائمة الفيلات من API
  useEffect(() => {
    async function fetchVillagagnez() {
      try {
        const response = await axios.get('http://localhost:8000/api/villa-tirage');
        setVillagagnez(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des villagagnez:', error);
      }
    }
    fetchVillagagnez();
  }, []);

  // تعديل بيانات الفيلا
  const handleEdit = async (id) => {
    const updatedData = {
      titre: editedData.titre || '',
      description: editedData.description || '',
    };

    try {
      const response = await axios.put(`http://localhost:8000/api/villa-tirage/${id}`, updatedData);
      setVillagagnez(villagagnez.map(villa => villa.id === id ? response.data : villa)); // تحديث الفيلا بعد التعديل
      alert('Villa modifiée avec succès');
      setEditingVilla(null); // إغلاق نافذة التعديل بعد النجاح
    } catch (error) {
      console.error('Erreur lors de la modification de la villa:', error);
      alert(`Erreur: ${error.response ? error.response.data.error : error.message}`);
    }
  };

  // حذف الفيلا
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/villa-tirage/${id}`);
      setVillagagnez(villagagnez.filter(villa => villa.id !== id)); // حذف الفيلا من الواجهة بعد الحذف
      alert('Villa supprimée avec succès');
    } catch (error) {
      console.error('Erreur lors de la suppression de la villa:', error);
      alert(`Erreur: ${error.response ? error.response.data.error : error.message}`);
    }
  };

  // تعيين القيم في حال التعديل
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // عرض الفيلات في جدول
  return (
    <div className="villa-management-container">
        <NavbarDashboard />
        <Sidebar />
      <h1>إدارة الفيلات</h1>

      <table className="villa-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Titre</th>
            <th>Description</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {villagagnez.map((villa) => (
            <tr key={villa.id}>
              <td>{villa.id}</td>
              <td>{villa.titre}</td>
              <td>{villa.description}</td>
              <td>
                <img
                  src={`http://localhost:8000/storage/${villa.image_url}`}
                  alt={villa.titre}
                  className="villa-image"
                />
              </td>
              <td>
                <button onClick={() => setEditingVilla(villa)}>Modifier</button>
                <button onClick={() => handleDelete(villa.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* نافذة التعديل */}
      {editingVilla && (
        <div className="edit-modal">
          <h2>Modifier la Villa</h2>
          <label>
            Titre:
            <input
              type="text"
              name="titre"
              value={editedData.titre}
              onChange={handleChange}
            />
          </label>
          <label>
            Description:
            <textarea
              name="description"
              value={editedData.description}
              onChange={handleChange}
            />
          </label>
          <button onClick={() => handleEdit(editingVilla.id)}>Sauvegarder les modifications</button>
          <button onClick={() => setEditingVilla(null)}>Annuler</button>
        </div>
      )}
    </div>
  );
};

export default VillaManagement;
