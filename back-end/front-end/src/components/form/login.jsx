import './login.css';
import { useState, useEffect } from 'react';
import { axiosUtilisateurs } from '../../api/axios';
import { useNavigate } from "react-router-dom";
import Topbar from '../TopBar/topbar';

function Form() {
  const [nom, setnom] = useState('');
  const [prenom, setprenom] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [users, setusers] = useState([]);
  const [message, setmessage] = useState('');

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  const [isSignUp, setIsSignUp] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => await Load())();
  }, []);

  async function Load() {
    try {
      const result = await axiosUtilisateurs.get('/api/utilisateurs');
      setusers(result.data);
    } catch (err) {
      console.error('Erreur lors du chargement des utilisateurs:', err);
    }
  }

  async function save(e) {
    e.preventDefault();
    try {
      await axiosUtilisateurs.post('/api/register', {
        nom,
        prenom,
        email,
        password,
      });

      setmessage('Utilisateur enregistré avec succès');
      setnom('');
      setprenom('');
      setemail('');
      setpassword('');
      Load();
    } catch (err) {
      console.error('Erreur lors de l\'inscription:', err.response ? err.response.data : err.message);
      alert('Erreur d\'inscription: ' + (err.response ? err.response.data.message : 'Erreur inconnue'));
    }
  }

  async function login(e) {
    e.preventDefault();
    try {
      const response = await axiosUtilisateurs.post('/api/login', {
        email: loginEmail,
        password: loginPassword,
      });

      // تخزين بيانات المستخدم
      localStorage.setItem('userData', JSON.stringify(response.data));
      localStorage.setItem('isAdmin', response.data.user.admin===1); // تخزين حالة admin

      setLoginMessage('Connexion réussie');

      navigate('/');

    } catch (err) {
      setLoginMessage('');
      if (err.response) {
        const errorMessage = err.response.data.message;
        if (errorMessage === "Invalid Email") {
          setLoginMessage('Email incorrect');
        } else if (errorMessage === "Incorrect Password") {
          setLoginMessage('Mot de passe incorrect');
        } else {
          setLoginMessage('Email et Mot de passe incorrect');
        }
      }
    }
  }

  function toggleForm(showSignUp) {
    setIsSignUp(showSignUp);
    setLoginMessage('');
    setLoginEmail('');
    setLoginPassword('');
  }

  return (
    <div className="main">
      
      <div>
        {isSignUp ? (
          <form className='login-pop-container' onSubmit={save}>
            <h2>INSCRIPTION</h2>
            <div className='login-pop-input'>
              <input type='text' placeholder='Nom' required value={nom} onChange={(e) => setnom(e.target.value)} />
              <input type='text' placeholder='Prenom' required value={prenom} onChange={(e) => setprenom(e.target.value)} />
              <input type='email' placeholder='Email' required value={email} onChange={(e) => setemail(e.target.value)} />
              <input type='password' placeholder='Mot de passe' required value={password} onChange={(e) => setpassword(e.target.value)} />
              <button type='submit'>Sign Up</button>
              <div className='error-message'>{message}</div>
              <p>Already have an account? <span className='toggle-link' onClick={() => toggleForm(false)}>Sign In</span></p>
            </div>
          </form>
        ) : (
          <form className='login-pop-container' onSubmit={login}>
            <h2>CONNEXION</h2>
            <div className='login-pop-input'>
              <input type='email' placeholder='Email' required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
              <input type='password' placeholder='Mot de passe' required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
              <button type='submit'>Sign In</button>
              <div className='error-message'>{loginMessage}</div>
              <p>Don't have an account? <span className='toggle-link' onClick={() => toggleForm(true)}>Click Here</span></p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Form;