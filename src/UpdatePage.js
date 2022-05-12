import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { getGameById, updateGames } from './services/fetch-utils';

export default function UpdatePage() {
  // you'll need the history hook from react-router-dom to do your redirecting in the handleSubmit
  const { push } = useHistory();
  const { id } = useParams();
  // here's the state you'll need:
    // title;
    // genre;
    // designer;
    // description;
    // minPlayers;
    // maxPlayers;
  const [gameInForm, setGameInForm] = useState({
    title: '',
    genre: '',
    min_players: 0,
    max_players: 0,
    designer: '',
    description: ''
  });

  useEffect(() => {
    async function fetch() {

      const gameData = await getGameById(id);

      setGameInForm(gameData);
    }
    fetch();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();

    // update a game
    await updateGames(id, gameInForm);
    // use history.push to send the user to the list page
    push('/board-games');
  }
  return (
    <div className='create'>
      {/* on submit, call your handleSubmit function */}
      <form onSubmit={handleSubmit}>
        <h2>Update {gameInForm.title}</h2>
        <label>
            Title
          {/* on change, set the title in state */}
          <input required value={gameInForm.title} name='title' onChange={(e) => setGameInForm({ ...gameInForm, title: e.target.value })}/>
        </label>
        <label>
            Genre
          {/* on change, set the genre in state */}
          <select required value={gameInForm.genre} onChange={(e) => setGameInForm({ ...gameInForm, genre: e.target.value })}>
            <option>Tile-laying</option>
            <option>Economic</option>
            <option>War</option>
            <option>Card</option>
            <option>Abstract</option>
            <option>Cooperative</option>
            <option>Solo</option>
          </select>
        </label>
        <label>
            Designer
          {/* on change, set the designer in state */}
          <input required value={gameInForm.designer} name='designer' onChange={(e) => setGameInForm({ ...gameInForm, designer: e.target.value })}/>
        </label>
        <label>
            Min Players
          {/* on change, set the min players in state */}
          <input required value={gameInForm.min_players} name='min_players' onChange={(e) => setGameInForm({ ...gameInForm, min_players: e.target.value })}/>
        </label>
        <label>
            Max Players
          {/* on change, set the max players in state */}
          <input required value={gameInForm.max_players} name='max_players' onChange={(e) => setGameInForm({ ...gameInForm, max_players: e.target.value })}/>
        </label>
        <label>
            Description
          {/* on change, set the description in state */}
          <input required value={gameInForm.description} name='description' onChange={(e) => setGameInForm({ ...gameInForm, description: e.target.value })}/>
        </label>
        <button>Update game</button>
      </form>
    </div>
  );
}
