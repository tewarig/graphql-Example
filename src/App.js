import logo from './logo.svg';
import './App.css';
import {useQuery, gql} from '@apollo/client';
import react , {useState} from 'react';

export const AnimeList = gql`
query Query($page: Int) {
  Page(page: $page) {
    media {
      siteUrl
      title {
        english
        native
      }
      description
      coverImage {
        medium
      }
      bannerImage
      volumes
      episodes
    }
  }
}


`;

function App() {
  const [page, setPage] = useState(1);
  const {loading, error, data} = useQuery(AnimeList , {  variables: { "page" : page } });
  const NextPage = () => {
    setPage(page+1);
  }
  const PreviousPage = () => {
    setPage(page - 1);
  }
  console.log(data?.Page?.media[0]); 
  if(loading) return(<> Loading</>);
  if(error) return(<>{JSON.stringify(error)}</>)
  return (
   <div className="container"> 
     <h1> 🐈 Anime List </h1>
     <hr width="80%" />
   {data?.Page?.media.map(anime => (
     <>
   <div className="card" >
      <img    src={anime.coverImage.medium}/>
      <div> 
         <h1>{anime.title.english} </h1>
           <div className="episodes" >Episodes  <b>{anime.episodes} </b></div>
          <div  dangerouslySetInnerHTML={{__html: anime.description}} ></div> 
      </div> 
  </div>
  <hr width="75%"/>
 </>
   ))}
   <div className="buttonContainer">
    { page != 1 && <button onClick={PreviousPage}> Previous Page</button> } 
     <div className="pageText"> {page}</div>
     <button onClick={NextPage}>  Next Page </button> 
   </div>
   </div>);
}

export default App;
