let status = window.localStorage.getItem("loginStatus");
function logout() {
    window.localStorage.setItem("loginStatus", "false")
    window.location.href = "./index.html";
}
var TableBody = document.getElementById("TableBody")
const getUsers = () => {
    axios
        .get("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users")
        .then(function (response) {
            // handle success
            var userData = response.data;


            $("#SearchBox").on("keyup", function () {

                let value = $(this).val()

                console.log("The value Entered", value)

                if ($(this).val() === "Enter") {
                    if (value.length < 2) {
                        alert("Please enter atleast 2 characters")
                    }
                }
                var users = searchedValue(value, userData)

                search(users);
            })

            search(userData)


            function searchedValue(value, userData) {
                var filtereddata = []

                for (let i = 0; i < userData.length; i++) {
                    value = value.toLowerCase()
                    var name = userData[i].fullName.toLowerCase();
                    if (name.includes(value)) {
                        filtereddata.push(userData[i])
                    }
                }
                return filtereddata;
            }


            function search(users) {
                TableBody.innerHTML = ''
                users.map((item) => {
                    return (
                        TableBody.innerHTML += ` <tr class="TableRow">
                                    <td class="SecondaryText">${item.id}</td>
                                    <td class="PrimaryText">
                                        <img src=${item.profilePic}
                                            alt="Profile Pic">
                                    </td>
                                    <td class="SecondaryText">${item.fullName}</td>
                                    <td class="PrimaryText">${item.dob}</td>
                                    <td class="SecondaryText">${item.gender}</td>
                                    <td class="SecondaryText">${item.currentCity} , ${item.currentCountry}</td>
                                </tr>`
                    )

                });
            }


            /*  let arr2 = mydatas.filter((items) => {
              return items.orderStatus == "Delivered" || items.orderStatus == "New" ;
              });
          */


        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {
            // always executed
        });
};

getUsers();




