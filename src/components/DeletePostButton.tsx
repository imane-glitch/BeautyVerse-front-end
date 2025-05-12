import axios from 'axios';
import './PostForm.css';

axios.defaults.baseURL = 'http://localhost:1337';

interface DeletePostProps {
  postId: number;
}

function DeletePost({ postId }: DeletePostProps) {
  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    const confirmed = window.confirm('Es-tu sûr de vouloir supprimer ce post ?');

    if (!confirmed) return;

    try {
      await axios.delete(`/api/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Post supprimé !');
    } catch (err) {
      alert('Erreur lors de la suppression');
      console.error(err);
    }
  };

  return (
    <button className="delete-button" onClick={handleDelete}>
      Supprimer le post
    </button>
  );
}

export default DeletePost;
