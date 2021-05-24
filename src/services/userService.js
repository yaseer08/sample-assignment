import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import userList from '../users.json'

const mockAdapter = new MockAdapter(axios);

function getUserList() {
  mockAdapter.onGet("/users").reply(200, {
    users: userList,
  });
  return new Promise((resolve, reject) => {
    axios
      .get("/users")
      .then((res) => {
        resolve(res.data.users.data);
      })
      .catch((error) => {
        reject(error.response.data.message);
      });
  });
}


// function getUserList() {
//     return new Promise((resolve, reject) => {

//         axios.get(`https://reqres.in/api/users/`)
//             .then(res => {
//                 resolve(res.data.data)
//             })
//             .catch((error) => {
//                 reject(error.response.data.message)
//             })
//     })
// }

function getUserDetails(userId) {
    return new Promise((resolve, reject) => {
        axios.get(`https://reqres.in/api/users/${userId}`)
            .then(res => {
                resolve(res.data)
            })
            .catch((error) => {
                reject(error.response.data.message)
            }
            )
    })
}

function updateUserDetails(userId,body) {
    return new Promise((resolve, reject) => {
        axios.put(`https://reqres.in/api/users/${userId}`, body)
            .then(res => {
                resolve(res.data)
            })
            .catch((error) => {
                reject(error.response.data.message)
            }
            )
    })
}

function addNewUser(data) {
    return new Promise((resolve, reject) => {
        axios.post(`https://reqres.in/api/users`, data)
            .then(res => {
                resolve(res.data)
            })
            .catch((error) => {
                reject(error.response.data.message)
            }
            )
    })
}

function deleteUser(userId) {
    return new Promise((resolve, reject) => {
        axios.delete(`https://reqres.in/api/users/${userId}`)
            .then(res => {
                resolve(res.data)
            })
            .catch((error) => {
                reject(error.response.data.message)
            }
            )
    })
}
export {
    getUserList,
    getUserDetails,
    updateUserDetails,
    addNewUser,
    deleteUser
}
