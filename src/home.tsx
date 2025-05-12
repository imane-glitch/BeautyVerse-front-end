import { useEffect, useState } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:1337';

function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get('/api/posts', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      setData(res.data);
    })
    .catch((err) => {
      console.error('Erreur lors du chargement des données protégées :', err.response);
    });
  }, []);

  return (
    <div>
      <h2>Home – Contenu protégé</h2>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Chargement...</p>}
    </div>
  );
}

export default Home;
