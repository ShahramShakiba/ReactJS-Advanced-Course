import UserFinder from './components/UserFinder';
import UsersContext from './context/users-context';

const DUMMY_USERS = [
  { id: 'u1', name: 'Shahram' },
  { id: 'u2', name: 'Max' },
  { id: 'u3', name: 'Manuel' },
  { id: 'u4', name: 'Julie' },
];

export default function App() {
  const userContext = {
    users: DUMMY_USERS,
  };

  return (
    <UsersContext.Provider value={userContext}>
      <UserFinder />
    </UsersContext.Provider>
  );
}

/* Components :
  - are regular JavaScript functions which return renderable results 
    (typically JSX )

? Functional Components     *** The default & most modern approach ***
    function App() {
      return (               
        <h2> A Product! </h2>
      );
    }


? Class-Based Components        *** was required in the past ***
    class Product extends Component {   
      render() {                       
        return <h2> A Product! </h2>
      }
    }

    - Components can also be defined as JS classes where a render() method defines the to-be-rendered output

    - was required in the past, when using React prior to version 16.8 :
      . Traditionally, you had to use class-based components to
        manage "state" & "side effects"

      . React 16.7 introduced "React Hooks" for functional components

      . Class-Based components can NOT use React Hooks
 */
