import axios from 'axios';

export async function PostHistory(user, getHistory, updateUser, options) {
    const get_history = await getHistory()

    console.log("get_history", get_history)

    async function postUser() {
        return axios.post(`http://localhost:3000/update/${user.googleId}`, {
            isNew: false,
            preferences: options
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            console.log("User Status: " + res.status)
            console.log("User Data: " + res.data)
        }).catch((error) => {
            if (error.response) {
                console.log(error.response.data + "Error has occured updating"); // => the response payload 
            }
        })
    }

    async function updateUserHistory() {
        return axios.post(`http://localhost:3000/history`, {
            googleId: user.googleId,
            history: get_history.history,
            timeTaken: get_history.timeTaken
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            console.log("History Status: " + res.status)
            console.log("History Data: " + res.data)
        }).catch((error) => {
            if (error.response) {
                console.log(error.response.data + "Error history post"); // => the response payload 
            }
        })
    }

    try {
        const chain = await Promise.all([updateUserHistory(), postUser()]).then((res) => {
            return res
        })
        console.log(chain)
        console.log("Successful History Update and User Update")
    } catch (error) {
        console.log(error)
    }
}