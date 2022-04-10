var users = require("../../init_data.json").data;



function checkDuplicate(email) {
    const foundUser = Object.entries(users).find(user => user[1].email === email)
    if (!foundUser) {
        return false
    } else {
        return true
    }
}


module.exports = checkDuplicate;