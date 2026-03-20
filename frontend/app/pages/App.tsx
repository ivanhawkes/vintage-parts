import { useState, useEffect } from 'react'

// Define an interface for the REST API response JSON.
type User = {
  userId: number;
  userName: string;
  email: string;
};
 
const FetchUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
 
    fetchData();
  }, []);
 
  return (
    <div>
      <h2>Users</h2>
      {users.map((user) => (
          <li key={user.userId}>
            {user.userName} - {user.email}
          </li>
        ))}
    </div>
  );
};

// Define an interface for the REST API response JSON.
interface Manufacturer {
  manufacturerId: number;
  manufacturerName: string;
  manufacturerUrl: string;
}

const FetchManufacturers: React.FC = () => {
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/manufacturers');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setManufacturers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
 
    fetchData();
  }, []);
 
  return (
    <div>
      <h2>Manufacturers</h2>
      {manufacturers.map((manufacturer) => (
          <li key={manufacturer.manufacturerId}>
            {manufacturer.manufacturerName} - {manufacturer.manufacturerUrl}
          </li>
        ))}
    </div>
  );
};


function App(){
  return (
    <>
    <h1>My App</h1>
    <FetchUsers />
    <FetchManufacturers />
    </>
  );
};

export default App

