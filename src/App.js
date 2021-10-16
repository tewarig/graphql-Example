import logo from './logo.svg';
import './App.css';
import {useQuery, gql} from '@apollo/client';


export const AnimeList = gql`
{
  Page {
    media {
      siteUrl
      title {
        english
        native
      }
      description
    }
  }
}
`;

function App() {
  const {loading, error, data} = useQuery(AnimeList);

  console.log(data); 
  if(loading) return(<> Loading</>);
  if(error) return(<>{JSON.stringify(error)}</>)
  return (
   <>
   {JSON.stringify(data)}
   </>);
}

export default App;
