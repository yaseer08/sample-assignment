import "./App.css";
import getUserListThunk from "./redux/actions/userListActions";
import deleteUserThunk from "./redux/actions/deleteUserAction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Button, IconButton, Avatar } from "@chakra-ui/react";
import { AddIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import UserForm from "./components/userForm";

function App() {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUserListThunk());
  }, []);

  const [isDrawerOpen, setDrawerOpen] = useState(false);

  //curreent User
  const [currUser, setCurrUser] = useState({});

  //handle Drawer Open
  const handleDrawerOpen = (user = {}) => {
    setDrawerOpen(true);
    setCurrUser(user);
  };

  //handle drawer close
  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setCurrUser({});
  };

  //delete User
  const deleteUser = (id) => {
    dispatch(deleteUserThunk(id));
  };
  return (
    <div className="App">
      <div className="header-wrapper">
        <div className="header-content">
          <p className="title">Team Members</p>
          {!userList.loading ? (
            <p className="sub-text">
              You have {userList.success.length} members
            </p>
          ) : (
            ""
          )}
        </div>
        <Button
          leftIcon={<AddIcon />}
          colorScheme="teal"
          onClick={() => handleDrawerOpen()}
        >
          Create user
        </Button>
      </div>
      <div className="userList">
        {userList.loading ? (
          <div>loading</div>
        ) : userList?.success?.length ? (
          userList.success.map((user, index) => {
            return (
              <div
                className="card"
                key={user.id}
                style={{
                  borderBottom:
                    index === userList.success.length - 1
                      ? 0
                      : "1px solid lightgrey",
                }}
              >
                <Avatar
                  size="xl"
                  name={user.first_name + " " + user.last_name}
                  src={user.avatar}
                />
                <div className="info">
                  <p>
                    Name: {user.first_name} {user.last_name}
                  </p>
                  <p>Email: {user.email}</p>
                  <p>Mobile: {user.mobile_number ? user.mobile_number : 'NA'}</p>
                  <p>Role: {user.role}</p>
                </div>
                <div
                  className="buttonContainer"
                  style={{
                    justifyContent:
                      user.role === "Admin" ? "center" : "space-between",
                  }}
                >
                  {user.role !== "Admin" ? (
                    <IconButton
                      colorScheme="red"
                      aria-label="Call Segun"
                      size="lg"
                      icon={<DeleteIcon />}
                      onClick={() => deleteUser(user.id)}
                    />
                  ) : (
                    ""
                  )}
                  <IconButton
                    colorScheme="teal"
                    aria-label="Call Segun"
                    size="lg"
                    icon={<EditIcon />}
                    onClick={() => handleDrawerOpen(user)}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <div>No data</div>
        )}
      </div>
      <UserForm
        user={currUser}
        onDrawerOpen={isDrawerOpen}
        onDrawerClose={handleDrawerClose}
      />
    </div>
  );
}

export default App;
