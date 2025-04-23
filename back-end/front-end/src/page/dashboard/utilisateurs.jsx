import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './utilisateurs.css';
import Sidebar from "../../components/sidebar/sidebar";
import NavbarDashboard from "../../components/navbar-dashboard/navbar";



const Utilisateurs = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ email: '', admin: 0 });
  const [searchQuery, setSearchQuery] = useState(''); // إضافة state للبحث

  useEffect(() => {
    fetchUsers();
  }, [searchQuery]); // استخدام searchQuery كـ dependancy

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/utilisateurs');
      const filteredUsers = response.data.filter(user =>
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) // فلترة النتائج بناءً على البحث
      );
      setUsers(filteredUsers);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs', error);
    }
  };

  const getRoleName = (admin) => {
    return String(admin) === "1" ? "Admin" : "Client";
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/utilisateurs/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression', error);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({ email: user.email, admin: user.admin });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'admin' ? Number(value) : value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Données envoyées :", formData); // نشوفو شنو كيبعت
  
      await axios.put(`http://localhost:8000/api/utilisateurs/${editingUser.id}`, formData);
  
      setEditingUser(null);
      fetchUsers(); // refresh
    } catch (error) {
      console.error('Erreur lors de la modification', error);
      if (error.response) {
        console.error('Détails de l\'erreur:', error.response.data); // هنا كيبان الخطأ 422
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // تحديث قيمة البحث
  };

  return (
    <div className="container">
        <NavbarDashboard />
        <Sidebar />
      <h2>Liste des Utilisateurs</h2>

      {/* خانة البحث */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Rechercher par email..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{getRoleName(user.admin)}</td>
                <td>
                  <button onClick={() => handleEdit(user)}>Modifier</button>
                  <button onClick={() => handleDelete(user.id)}>Supprimer</button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="4">Aucun utilisateur trouvé.</td></tr>
          )}
        </tbody>
      </table>

      {editingUser && (
        <form onSubmit={handleFormSubmit} className="edit-form">
          <h3>Modifier l'utilisateur ID: {editingUser.id}</h3>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              required
            />
          </label>
          <label>
            Rôle:
            <select name="admin" value={formData.admin} onChange={handleFormChange}>
              <option value={1}>Admin</option>
              <option value={0}>Client</option>
            </select>
          </label>
          <button type="submit">Enregistrer</button>
          <button type="button" onClick={() => setEditingUser(null)} style={{ marginLeft: '10px' }}>
            Annuler
          </button>
        </form>
      )}
    </div>
  );
};

export default Utilisateurs;