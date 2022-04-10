const userList = document.getElementById("users-list");
window.addEventListener("load", getUsers());

async function getUsers() {
  const users = await axios.get("/api/v1/users");
  console.log(users.data);
  for (let user of users.data) {
    const newDiv = document.createElement("tr");
    newDiv.innerHTML = `
        <th scope="row">${user.id}</th>
        <td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${user.email}</td>
      `;
    userList.appendChild(newDiv);
  }
}
