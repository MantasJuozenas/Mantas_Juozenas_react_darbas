import { useContext, useEffect } from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Card from '../../components/Card/Card';
import CardList from '../../components/Card/CardList';
import { AuthContext } from '../../store/AuthContext';
import style from './HomePage.module.scss';

function HomePage() {
  const { logout, token } = useContext(AuthContext);
  const [posts, setPosts] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  function handleSearchInput(e) {
    setSearchInput(e.target.value);
  }

  function filtering() {
    const postsCopy = [...posts];
    if (Number(searchInput) == searchInput) {
      const filtered = postsCopy.filter((post) => post.id.toString().includes(searchInput));
      setFilteredPosts(filtered);
      return;
    }
    const filtered = postsCopy.filter((post) => post.title.toLowerCase().includes(searchInput.toLowerCase()));
    setFilteredPosts(filtered);
  }

  async function fetchPosts() {
    const resp = await fetch('https://autumn-delicate-wilderness.glitch.me/v1/content/skills', {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    });
    const data = await resp.json();
    if (data) {
      setPosts(data);
    }
  }

  useEffect(() => {
    fetchPosts();
    if (searchInput) {
      filtering();
    }
  }, [searchInput]);

  return (
    <div className={style.mainContainer}>
      <nav>
        <NavLink className={`${style.navLink} ${style.active}`} to='/'>
          Įrašai
        </NavLink>
        <NavLink className={style.navLinkReg} to='/addpost'>
          Pridėti įrašą
        </NavLink>
        <NavLink to={'/login'}>
          <button onClick={logout} className={style.btn}>
            Atsijungti
          </button>
        </NavLink>
      </nav>
      <div>
        <input
          type='text'
          placeholder='Ieškokite pagal antraštę arba id'
          onChange={(e) => handleSearchInput(e)}
          value={searchInput}
        />
      </div>
      {!Array.isArray(posts) ? (
        <h2>Kraunama...</h2>
      ) : posts.length === 0 ? (
        <h2>Nėra įrašų</h2>
      ) : (
        <CardList>
          {searchInput
            ? filteredPosts.map((post, i) => {
                return <Card key={i} data={post} />;
              })
            : posts.map((post, i) => {
                return <Card key={i} data={post} />;
              })}
        </CardList>
      )}
    </div>
  );
}

export default HomePage;
