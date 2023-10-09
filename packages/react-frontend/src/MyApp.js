import React, {useState, useEffect} from 'react';
import Table from './Table';
import Form from "./Form";

export default function MyApp() {
  const [characters, setCharacters] = useState([]); 

    async function removeOneCharacter (index) {
      const user = characters[index];
      const id = user.id
      const url = `http://localhost:8000/users/${id}`;
      const response = await fetch(url, {
        method: 'DELETE',
      });
      if (response.status === 204) {
        const updated = characters.filter((character, i) => {
	        return i !== index
	    });
	    setCharacters(updated);
      }

	}



  function updateList(person) { 
    postUser(person)
      .then((response) => {
        if (response.status === 201){
          response.json().then((json) => {
            setCharacters([...characters, person])
          });
        }
      })
      
      .catch((error) => {
        console.log(error);
      })
}

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
}

function postUser(person) {
  const promise = fetch("http://localhost:8000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(person),
  });

  return promise;
}

useEffect(() => {
  fetchUsers()
	  .then((res) => res.json())
	  .then((json) => setCharacters(json["users_list"]))
	  .catch((error) => { console.log(error); });
}, [] );

    
  return (

    <div className="container">
      <Table characterData={characters} 
        removeCharacter={removeOneCharacter} />
    <Form handleSubmit={updateList} />
    

    </div>
  )
}


