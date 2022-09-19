let status = window.localStorage.getItem("loginStatus");
function logout() {
    window.localStorage.setItem("loginStatus", "false")
    window.location.href ="./index.html";
}
console.log(window.location)


const getUsers = () => {




    axios
        .get("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders")
        .then(function (response) {
            // handle success
            var responseData = response.data;
            console.log(responseData);



            let checkboxArray = [];
            let Count = 0;
            var TableBody = document.querySelector(".TableBody")
            TableBody.innerHTML = ""
            var checkBox = document.getElementsByClassName("storesCheckBox");

            for (let i = 0; i < checkBox.length; i++) {
                if (checkBox[i].checked) {
                    checkboxArray.push(checkBox[i].value)
                }
            }
            console.log(checkboxArray)

            filteredData = responseData.filter((user) => checkboxArray.includes(user.orderStatus))
            console.log(filteredData)
            Count = filteredData.length

            filteredData.map((user) => {
                return (
                    TableBody.innerHTML += ` <tr class="TableRow">
                    <td class="SecondaryText">${user.id}</td>
                    <td class="PrimaryText">${user.customerName}</td>
                    <td class="SecondaryText">${user.orderDate}<br>
                    <span class="SecondaryText">${user.orderTime}</span></td>
                    <td class="SecondaryText">$${user.amount}</td>
                    <td class="SecondaryText">${user.orderStatus}</td>
                </tr>`
                )
            })
            var count = document.getElementById("count")
            console.log(count)
            count.innerHTML = `count : ${Count}`;

        })

}

getUsers();