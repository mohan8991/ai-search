import { useState, useEffect } from 'react'

function App() {
  const [apiUsers, setApiUsers] = useState([])
  const [searchItem, setSearchItem] = useState('')
  // set the initial state of filteredUsers to an empty array
  const [filteredUsers, setFilteredUsers] = useState([])


  // fetch the users
  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then(response => response.json())
      // save the complete list of users to the new state
      .then(data => setApiUsers(data))
      // if there's an error we log it to the console
      .catch(err => console.log(err))
  }, [])

  const handleInputChange = (e) => { 
    const searchTerm = e.target.value;
    setSearchItem(searchTerm)

    // filter the items using the apiUsers state
    const filteredItems = apiUsers.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredUsers(filteredItems);
  }

  return (
    <>
      <input
        type="text"
        value={searchItem}
        onChange={handleInputChange}
        placeholder='Type to search'
      />
      <ul>
        {filteredUsers.map(user => <li key={user.id}>{user.name}</li>)}
      </ul>
    </>
  )
}

export default App
