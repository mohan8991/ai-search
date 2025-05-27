import { useState, useEffect } from 'react'

function App() {
  const [apiUsers, setApiUsers] = useState([])
  const [searchItem, setSearchItem] = useState('')
  const [searchItem1, setSearchItem1] = useState('')
  const [useAiSearch, setAiSearch] = useState(false)
  const [results, setResults] = useState('')
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

  const performSearch = (e) => { 
    const searchTerm = e.target.value;
    setSearchItem(searchTerm)

    // filter the items using the apiUsers state
    const filteredItems = apiUsers.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredUsers(filteredItems);
  }

  const searchAi = (e) => {
    const searchTerm1 = e.target.value;
    setSearchItem1(searchTerm1)

    console.log(searchTerm1)
    // fetchData();
  }

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setAiSearch(isChecked);
  }

  useEffect(() => {
    const fetchData = async () => {
      if (!searchItem1) {
        // setResults([]);
        // return;
      }

      // setLoading(true);
      // setError(null);

      try {
        const response = await fetch('http://localhost:3000/ai_search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: searchItem1 }), // Sending search term as JSON in body
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setResults(data.answer);
      } catch (e) {
        // setError(e);
        // setResults([]);
      } finally {
        // setLoading(false);
      }
    };
    const delayDebounce = setTimeout(() => {
      fetchData();
    }, 1000); // 1 second delay

     return () => clearTimeout(delayDebounce);
  }, [searchItem1]);

  return (
    <>
      <label> use AI</label>
      <input type="checkbox" id="use_ai" name="use_ai" value={useAiSearch} onChange={handleCheckboxChange}/>
      <br />
      {!useAiSearch && <input
        type="text"
        value={searchItem}
        onChange={performSearch}
        placeholder='Type to search'
      /> }
      <ul>
        {filteredUsers.map(user => <li key={user.id}>{user.name}</li>)}
      </ul>
      <br />
      {useAiSearch && <input
        type="text"
        placeholder='AI search'
        value={searchItem1}
        onChange={searchAi}
      /> }
      <h1>{results}</h1>
    </>
  )
}

export default App
