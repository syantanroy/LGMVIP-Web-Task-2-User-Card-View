import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Navbar = styled.nav`
display: flex;
  justify-content: space-between;
  background: #333;
  padding: 10px;
  color: #404040;
  margin: auto;
  
`;

const Button = styled.button`

  background-color: initial;
  background-image: linear-gradient(#a247fc 0, #5b03b3 100%);
  border-radius: 5px;
  border-style: none;
  box-shadow: rgba(245, 244, 247, .25) 0 1px 1px inset;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: Inter, sans-serif;
  font-size: 16px;
  font-weight: 500;
  height: 60px;
  line-height: 60px;
  margin-left: -4px;
  outline: 0;
  text-align: center;
  transition: all .3s cubic-bezier(.05, .03, .35, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: bottom;
  width: 190px;

&:hover,
&:focus  {
  opacity: .6;
  colour: skyblue;
}
`
;

const UserCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  margin-top: 20px;
`;

const UserCard = styled.div`
border: 3px;
border-colour: black;
display: grid;
  justify-content: center;
  background: rgba(0, 0, 0, 0.574);;
  padding: 10px;
  border-radius: 10px;
  margin-right: 10px;
  margin-left: 10px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.12), 0 3px 5px rgba(0,0,0,0.24);
  transition: all 0.2s ease-in-out;
  box-sizing: border-box;
  &:hover {
    box-shadow: 0 8px 8px rgba(0,0,0,0.19), 0 8px 8px rgba(0,0,0,0.23);
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 24px;
  color: #333;
`;

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUsers = async () => {
    setLoading(true);
    try {
      const response1 = await axios.get('https://reqres.in/api/users?page=1');
      const response2 = await axios.get('https://reqres.in/api/users?page=2');
      const [usersResponse1, usersResponse2] = await Promise.all([response1, response2]);

    const usersData1 = usersResponse1.data.data;
    const usersData2 = usersResponse2.data.data;
    setUsers([...usersData1, ...usersData2]);
    } catch (error) {
      alert('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar>
        <div style={{color: "whitesmoke",fontSize: "30px", fontFamily: " 'Poppins',sans-serif", padding: "10px",}}>Click the button at right to display data</div>
        <Button className='button-63' onClick={getUsers}>Get Users</Button>
      </Navbar>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <UserCardGrid>
          {users.map((user) => (
            <UserCard key={user.id}>
              <img style={{borderRadius: "40px", color: "rgb(255, 255, 255)", marginLeft: "20px"}} src={user.avatar} alt={user.first_name} />
              <h1 style={{justifyContent:"center", color: "rgb(255, 255, 255)", fontFamily: "sans-serif"}}>Name : {`${user.first_name} ${user.last_name}`}</h1>
              <h3 style={{justifyContent:"center", color: "rgb(255, 255, 255)", fontFamily: "sans-serif"}}>Email : {user.email}</h3>
            </UserCard>
          ))}
        </UserCardGrid>
      )}
    </div>
  );
}

export default App;
