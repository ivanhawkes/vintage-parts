import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [posts, setPosts] = useState([]);

   useEffect(() => {
      fetch('http://localhost:8080/manufacturers/1')
         .then((response) => response.json())
         .then((data) => {
            console.log(data);
            setPosts(data);
         })
         .catch((err) => {
            console.log(err.message);
         });
   }, []);

   //for (const data of posts){ console.log(data)}

   return (
    <>
      <section id="center">
        <button className="counter" onClick={() => setCount((count) => count + 1)}>
          Count is {count}
        </button>
        <p>
          Results: { posts.length }
        </p>
        <p>
          Id: {posts.manufacturerId }<br />
          Name: {posts.manufacturerName }<br />
          Url: {posts.manufacturerUrl }<br />
        </p>
      </section>
    </>
  )
}

export default App
