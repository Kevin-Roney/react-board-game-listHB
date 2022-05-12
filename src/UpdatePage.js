import react from 'react';
import { getGameById, updateGames } from './services/fetch-utils';
import { withRouter } from 'react-router-dom';


export default withRouter(class UpdatePage extends react.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      genre: '',
      min_players: 0,
      max_players: 0,
      designer: '',
      description: ''
    };
  }
  // you'll need the history hook from react-router-dom to do your redirecting in the handleSubmit

  // here's the state you'll need:
    // title;
    // genre;
    // designer;
    // description;
    // minPlayers;
    // maxPlayers;
  componentDidMount = async () => {
    console.log(this.props);
    const gameData = await getGameById(this.props.match.params.id);
    this.setState({ ...gameData });
    console.log(gameData);
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    // update a game
    await updateGames(this.props.match.params.id, this.state);
    // use history.push to send the user to the list page

    this.props.history.push('/board-games');
  }
  render() {
    const {
      title,
      genre,
      min_players,
      max_players,
      designer,
      description
    } = this.state;
    return (
      <div className='create'>
        {/* on submit, call your handleSubmit function */}
        <form onSubmit={this.handleSubmit}>
          <h2>Update {title}</h2>
          <label>
              Title
            {/* on change, set the title in state */}
            <input required value={title} name='title' onChange={(e) => this.setState({ title: e.target.value })}/>
          </label>
          <label>
              Genre
            {/* on change, set the genre in state */}
            <select required value={genre} onChange={(e) => this.setState({ genre: e.target.value })}>
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
            <input required value={designer} name='designer' onChange={(e) => this.setState({ designer: e.target.value })}/>
          </label>
          <label>
              Min Players
            {/* on change, set the min players in state */}
            <input required value={min_players} name='min_players' onChange={(e) => this.setState({ min_players: e.target.value })}/>
          </label>
          <label>
              Max Players
            {/* on change, set the max players in state */}
            <input required value={max_players} name='max_players' onChange={(e) => this.setState({ max_players: e.target.value })}/>
          </label>
          <label>
              Description
            {/* on change, set the description in state */}
            <input required value={description} name='description' onChange={(e) => this.setState({ description: e.target.value })}/>
          </label>
          <button>Update game</button>
        </form>
      </div>
    );
  }
});