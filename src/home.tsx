import { useEffect, useState } from 'react';
import axios from 'axios';
import PostPreview from './components/PostPreview';
axios.defaults.baseURL = 'http://localhost:1337';

interface Post {
  id: number;
  title: string;
  content?: string;
  link?: string;
  image?: string[];
  createdAt: string;
  subreddit?: {
    id: number;
    name: string;
  };
}

interface ApiResponse {
  data: Post[];
}

function Home() {
  const [data, setData] = useState<Post[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get('/api/posts?populate=*', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log('API posts response:', res.data.results);
      setData(res.data.results);
    })
    .catch((err) => {
      console.error('Erreur lors du chargement des données protégées :', err.response);
    });
  }, []);

  return (
    <div>
      <h2>Home – Contenu protégé</h2>
      {data.length ? <PostPreview posts={data} /> : <p>Chargement...</p>}
    </div>
  );
}



export default Home;