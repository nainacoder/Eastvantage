import { useEffect, useState } from 'react';
import axios from 'axios';

type UserType = {
  fullName: string;
  email: string;
};

const UserData: React.FC = () => {
  const [user, setUser] = useState<UserType>({ fullName: '', email: '' });
  const [refresh, setRefresh] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const getUsers = async () => {
    const resposnse = await axios.get('https://randomuser.me/api');
    let { results } = resposnse.data;
    const { title, first, last } = results[0].name;
    const fullName = `${title} ${first} ${last}`;
    const { email } = results[0];
    console.log('fullName***', fullName, email);
    const user = { fullName, email };
    localStorage.setItem('UserDetails', JSON.stringify(user));
    setIsFetching(false);
  };

  useEffect(() => {
    setIsFetching(true);
    getUsers();
    return () => {
      localStorage.removeItem('UserDetails');
    };
  }, [refresh]);

  let items = JSON.parse(localStorage.getItem('UserDetails') || '{}');

  useEffect(() => {
    if (items) {
      setUser(items);
    }
  }, [items]);

  function handleRefresh() {
    setRefresh(!refresh);
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
      }}
    >
      <div>
        {isFetching ? (
          'Loading...'
        ) : (
          <>
            <h3>FullName: {user && user.fullName}</h3>
            <h3>Email: {user && user.email}</h3>
            <button onClick={handleRefresh}>Refresh</button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserData;
