let menuItems = [];

let menuUrl="http://localhost:3000/menu";

// Write code to fetch the complete menu data using Axios API when the web page is loaded 
// Note: As per test requirement, Order API should be running on port 3000
function fetchMenuItemsFromServer(url) {
  // the data fetched from server should be stored in the `menuItems` array.
    // the values of `menuItems` array should be displayed on the menu.html page
    const getPromise = axios.get(url);
    getPromise.then((response) => {
        response.data.forEach(post => {
          let menu={
            category:post.category,
            itemName:post.itemName,
            price:post.price
          }
          menuItems.push(menu);
          document.body.innerHTML += 
          `<table class="table w-50 ms-3 mb-1">
          <tbody >
            <tr class="row m-1">
              <td class="col-lg-6">${post.itemName}</td>
              <td class="col-lg-6">${post.price}</td>
            </tr>
          </tbody>
        </table>`
        });
    }).catch((error)=>{
        console.log("Failed:",error); 
    });
    console.log(menuItems);
}
// fetchMenuItemsFromServer(menuUrl);

//Write code to filter the menu items from list by category
const category = document.getElementById('category');
category.addEventListener('change', function(e) {
   findItemsByCategory(e.target.value);
});

function findItemsByCategory(category) {
    // the filtered menu items should be displayed on the menu.html page.
    if(category==="Starters"){
    axios.get("http://localhost:3000/menu?category=Starters")
    .then((response) => {
        response.data.forEach(post => {
            document.body.innerHTML += 
            `<table class="table w-50 ms-3 mb-1">
            <tbody >
              <tr class="row m-1">
                <td class="col-lg-6">${post.itemName}</td>
                <td class="col-lg-6">${post.price}</td>
              </tr>
            </tbody>
          </table>`
        });
    });
   }
   else if (category==="Desserts"){
    axios.get("http://localhost:3000/menu?category=Desserts")
    .then((response) => {
        response.data.forEach(post => {
            document.body.innerHTML += 
            `<table class="table w-50 ms-3 mb-1">
            <tbody >
              <tr class="row m-1">
                <td class="col-lg-6">${post.itemName}</td>
                <td class="col-lg-6">${post.price}</td>
              </tr>
            </tbody>
          </table>`
        })
    })
   }
   else if (category==="Beverages"){
    axios.get("http://localhost:3000/menu?category=Beverages")
    .then((response) => {
        response.data.forEach(post => {
            document.body.innerHTML += 
            `<table class="table w-50 ms-3 mb-1">
          <tbody >
            <tr class="row m-1">
              <td class="col-lg-6">${post.itemName}</td>
              <td class="col-lg-6">${post.price}</td>
            </tr>
          </tbody>
        </table>`
 
        });
    });
   }
   else if (category==="MainCourse"){
    axios.get("http://localhost:3000/menu?category=Main Course")
    .then((response) => {
        response.data.forEach(post => {
            document.body.innerHTML += 
            `<table class="table w-50 ms-3 mb-1">
            <tbody >
              <tr class="row m-1">
                <td class="col-lg-6">${post.itemName}</td>
                <td class="col-lg-6">${post.price}</td>
              </tr>
            </tbody>
          </table>`
 
        });
    });
   }
   else{
    fetchMenuItemsFromServer(menuUrl);
   }

}



// do not delete the code given below, it is written to export the functions to be tested
module.exports = {
    fetchMenuItemsFromServer
}
