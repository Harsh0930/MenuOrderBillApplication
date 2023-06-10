// Reuse the solution created to dynamically create order form fields developed 
// in the previous sprint challenge

// Define function submitOrder to save the order details captured from the form 
// in json-server using Axios API

// Note:: As per test requirement, Order API should be running on port 3002

// The function should display the text `Total amount to be paid: $<value of total amount>` 
// after the details are successfully stored at the server
let orderUrl = "http://localhost:3002/order";
// Write solution code here to dynamically add the form fields 
let count =0;
function createOrders(event){
    console.log("inside this")
    event.preventDefault();
    let containerDiv = document.getElementById('order-container');
    let orderForm = document.createElement('form'); 
   
    let categoryInput = document.createElement("input");
    categoryInput.id=`categoryName${count}`
    categoryInput.type="text";
    categoryInput.placeholder="CategoryName";
    categoryInput.style.margin="5px";
    categoryInput.classList.add("col-lg-2")
    categoryInput.required


    let itemName = document.createElement("input");
    itemName.id=`itemName${count}`
    itemName.type="text";
    itemName.placeholder="itemName";
    itemName.style.margin="5px";
    itemName.classList.add("col-lg-2")

    let price = document.createElement("input");
    price.id=`price${count}`
    price.type="number";
    price.placeholder="price";
    price.style.margin="5px";
    itemName.classList.add("col-lg-2")

    let quantity = document.createElement("input");
    quantity.id=`quantity${count}`
    quantity.type="number";
    quantity.placeholder="quantity";
    quantity.style.margin="5px";
    price.classList.add("col-lg-2")

    let amount = document.createElement("input");
    amount.id=`amount${count}`
    amount.type="text";
    amount.readOnly=true;
    amount.placeholder="amount";
    amount.style.margin="5px";
    amount.classList.add("col-lg-2")

    let AddButton = document.createElement("button");
    AddButton.id=`add${count}`
    AddButton.textContent="add";
    AddButton.style.borderRadius="30px";


    orderForm.appendChild(categoryInput);
    orderForm.appendChild(itemName);
    orderForm.appendChild(price);
    orderForm.appendChild(quantity);
    orderForm.appendChild(amount);

    containerDiv.appendChild(orderForm);

    calAmount(`price${count}` , `quantity${count}` , `amount${count}` );
    saveProduct(`categoryName${count}`,`itemName${count}`,`price${count}` , `quantity${count}` , `amount${count}`,event);
    count++;
}

let AmountArray =[];
function calAmount(price , quantity , amount){
    let Price = document.getElementById(price);
    let Quantity = document.getElementById(quantity);
    let Amount = document.getElementById(amount);
    Quantity.addEventListener("input" ,()=>{
        Amount.value = Price.value * Quantity.value;
        AmountArray.push(parseInt(Amount.value))
    });
}

function finalBill(){
    let total =0;    
    let totalAmount = document.getElementById("totalAmount");
    for (let i=0; i<AmountArray.length; i++){
        total  += AmountArray[i];
        console.log(total)
      }
        totalAmount.value = total;
}


let OrderingList = [];
function saveProduct(categoryName ,itemName , price , quantity , amount,event) {
    event.preventDefault()
    console.log("adding");
    Quantity=document.getElementById(quantity);
    Quantity.addEventListener('input',()=>{ 
        let Items = {
            "categoryName": document.getElementById(categoryName).value,
            "itemName": document.getElementById(itemName).value,
            "price": document.getElementById(price).value,
            "quantity": document.getElementById(quantity).value,
            "amount": document.getElementById(amount).value
          } 
        OrderingList.push(Items);
    console.log(OrderingList);
    finalBill()
    })
}

let orderingData =[];
function displayCustomerOrder(){
    let orderData ={
         "orderID": document.getElementById("orderId").value,
        "customerName": document.getElementById("customerName").value,
        "email": document.getElementById("email").value,
        "contactNumber": document.getElementById("contactNumber").value,
        "date": document.getElementById("date").value,
        "address": document.getElementById("address").value,
        "Items" : OrderList
    }
    orderingData.push(orderData); 
    console.log(orderingData)        
}
 

// define funtion submitOrder() to save the order details on clicking the submit button
function submitOrder(event){
    displayCustomerOrder()
    console.log("In submit order")
    event.preventDefault();
    const axioPost = axios.post(orderUrl, orderData);
              axioPost.then(response => {
        console.log(alert('Data saved successfully on server'), response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
}
//document.getElementById("orderNow").addEventListener("click" , submitOrder);

// do not delete the code given below, it is written to export the functions to be tested
module.exports = {
    submitOrder
}


