let status = window.localStorage.getItem("loginStatus");
function logout() {
    window.localStorage.setItem("loginStatus", "false")
    window.location.href = "./index.html";
}


function mydate(date) {
    var dates = new Date(date),
        month = '' + (dates.getMonth() + 1),
        day = '' + dates.getDate(),
        year = dates.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}




const getProduct = () => {

    axios.get("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products")
        .then(function (response) {
            var productData = response.data;
            var TableRow = document.getElementById("TableRow")
           
            var today = new Date();
            var day = String(today.getDate()).padStart(2, "0")
            var month = String(today.getMonth() + 1).padStart(2, "0")
            var year = today.getFullYear();
            var date = year + "-" + month + "-" + day;


            var expired = document.getElementById("expired").checked
            var lowStock = document.getElementById("low-stock").checked

            var finalData;


            if (expired && lowStock) {
                finalData = productData;
            }
            else if (expired) {
                document.getElementById("TableRow").innerHTML = " "
                finalData = productData.filter(
                    function (item) {
                        var filteringDate = mydate(item.expiryDate)
                        return filteringDate < date;
                    }

                )
                console.log(finalData)
            }
            else if (lowStock) {
                document.getElementById("TableRow").innerHTML = " "
                finalData = productData.filter(
                    function (item) {
                        var filteringDate = mydate(item.expiryDate)
                        return item.stock < 100;
                    }
                )
                console.log(finalData)
            }
            else {
                document.getElementById("TableRow").innerHTML = " "
                finalData = productData.filter(
                    function (item) {
                        var filteringDate = mydate(item.expiryDate)
                        return filteringDate > date && item.stock > 100;
                    }
                )
                console.log(finalData)
            }
            finalData.map((item) => {
                return (
                    TableRow.innerHTML += `<tr class="TableRow">
                    <td class="SecondaryText">${item.id}</td>
                    <td class="PrimaryText">${item.medicineName}</td>
                    <td class="SecondaryText">${item.medicineBrand}</td>
                    <td class="SecondaryText">${item.expiryDate}</td>
                    <td class="SecondaryText">$${item.unitPrice}</td>
                    <td class="SecondaryText">${item.stock}</td>
                </tr>`
                )

            })
            var Count = finalData.length
            var count = document.getElementById("count")
            count.innerHTML = `count : ${Count}`;

        })
}

getProduct()
