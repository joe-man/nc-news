import { useContext, useEffect, useState } from "react";
import { getUserByUsername, getUsers } from "../../utils/api";
import styles from "./changeuser.module.css";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import NotFound from "../../components/NotFound";

export default function CreateUser() {
  const [users, setUsers] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    getUsers()
      .then((response) => {
        setUsers(response);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setNotFound(true);
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
      {loading ? (
        <Loading />
      ) : (
        <>
          {notFound ? (
            <NotFound text="Unable to get users at this time, please try again later" />
          ) : (
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
          )}
        </>
      )}
    </div>
  );
}
