import { useState, FormEvent } from "react";
import axios from "axios";

const SubredditForm = (): JSX.Element => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const jwt = localStorage.getItem("jwt");
    const subredditName = `r/${name}`;

    try {
      await axios.post(
        "http://localhost:1337/api/subreddits",
        {
          data: {
            name: subredditName,
            description,
            slug: name,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      setSuccess(true);
      setName("");
      setDescription("");
    } catch (err) {
      console.error("Erreur création subreddit :", err);
    }
  };

  return (
    <div className="subreddit-form-container">
      <h2>Créer un Subreddit</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom du subreddit"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        {/* Zone de description si nécessaire */}
        {/* <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        /> */}
        <button type="submit">Créer</button>
      </form>
      {success && (
        <div className="success-message">
          ✅ Subreddit créé avec succès !<br />
          <a href="/home">← Retour à l'accueil</a>
        </div>
      )}
    </div>
  );
};

export default SubredditForm;
