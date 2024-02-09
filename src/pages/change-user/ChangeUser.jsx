import { useContext, useEffect, useState } from "react";
import { getUserByUsername, getUsers } from "../../utils/api";
import styles from "./changeuser.module.css";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

export default function CreateUser() {
  const [users, setUsers] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    getUsers().then((response) => {
      setUsers(response);
    });
  }, []);

  const handleChangeUser = (event) => {
    event.preventDefault();
    getUserByUsername(event.currentTarget.value).then((response) => {
      setUser(response);
    });
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <h2>Select a user</h2>
      <ul className={styles.listContainer}>
        {users.map((singleUser) => (
          <li key={singleUser.username}>
            <button onClick={handleChangeUser} value={singleUser.username} className={styles.userContainer}>
              <div>
                <p>{singleUser.username}</p>
                <div className={styles.imgContainer}>
                  <img src={singleUser.avatar_url} alt={`Avatar image for user ${singleUser.username}`} />
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
