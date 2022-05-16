import { useEffect , useState } from 'react';
import './App.css';
import Movie from './Movie';
import searchIcon from './search.svg'

const api = "http://www.omdbapi.com/?i=tt3896198&apikey=dc903e29";

const App = () => {
  const [movies,setMovies]=useState([]);
  const [searchTerm,setSearchTerm]=useState('');

  const searchMovies = async (term)=>{
    const response = await fetch(`${api}&s=${term}`);
    const data = await response.json();
    setMovies(data.Search);
  }

  useEffect(()=>{
    searchMovies("Superman");
  },[])
  
  return (
    <div className='app'>
      <h1>Movie Land</h1>

      <div className='search'>
        <input placeholder='Search for movies' type="text" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}/>
        <img src={searchIcon} alt="searchImage" onClick={()=>{ searchMovies(searchTerm);}}/>
      </div>
      <div className='container'>  
        {
        movies?.length  > 0 ?  
        (movies.map((movie) => {
          return <Movie movie={movie}/>
        })):(
          <div className='empty'>
            <h2> No movies found </h2>
          </div>
        )
        }
      </div> 
    </div>
  );
}

export default App;
