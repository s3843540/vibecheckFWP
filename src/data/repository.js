//Declares constant values.
const USER_KEY = "user";
const USERS_KEY = "users";
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

function setUser(account) {
    //Gets all users
    var existingUsers = JSON.parse(localStorage.getItem(USERS_KEY));
    //Checks to see if there are users. If there are no users, initializes array.
    if (existingUsers === null) {
        existingUsers = [];
    }
    //Sets the current user for the session in local storage.
    localStorage.setItem(USER_KEY, JSON.stringify(account));
    //Appends user to the array.
    existingUsers.push(account);
    //Sets updated data of users to local storage.
    localStorage.setItem(USERS_KEY, JSON.stringify(existingUsers));
}

function getUser() {
    return localStorage.getItem(USER_KEY);
}

function getUsers() {
    const allUsers = localStorage.getItem(USERS_KEY)
    //If there are no users, returns empty JSON object.
    if (allUsers !== null) {
        return JSON.parse(allUsers);
    }
    else {
        return [{}]
    }
}

function verifyUser(email, password) {
    const allUsers = getUsers();
    //Double for-loop to iterate for values in allUsers.
    for(const user of allUsers) {
        for (const value of user) {
            //If a match is found, sets up JSON object to save into local storage.
            if(email === value.email && password === value.password){
                const account = [
                    {
                      username: value.username,
                      email: value.email,
                      password: value.password,
                      date: value.date
                    }
                  ];
                localStorage.setItem(USER_KEY, JSON.stringify(account));
                return true;
            }
        }
    }
}

function resetUser() {
    localStorage.removeItem(USER_KEY);
}

function deleteUser(user) {
    const allUsers = getUsers();
    const userParsed = JSON.parse(user);
    var targetUser = null;
    var counter = 0;

    //For-loop to find matching user
    for (const userC of allUsers) {
        //Counter used to find position of data in the JSON array.
        counter++;
        if (userParsed[0].username === userC[0].username && userParsed[0].email === userC[0].email) {
            targetUser = JSON.stringify(userC);
            //Adds a comma to the string depending on the position in which the data is found.
            if (counter !== allUsers.length){
                targetUser = targetUser+',';
            }
            else if (counter > 1) {
                targetUser = ','+targetUser;
            }
        }
    }
    //Removes the string of data containing the user information and updates local storaage with new string.
    var updateUsers = JSON.stringify(allUsers).replace(targetUser, '');
    localStorage.setItem(USERS_KEY, updateUsers);   
}

export {
    setUser,
    getUser,
    getUsers,
    verifyUser,
    resetUser,
    deleteUser,
    weekdays,
    months
}