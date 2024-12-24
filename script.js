let key = 1;
let items = [];

function addItem(event){
    var item = document.getElementById('item-input').value.trim();
    event.preventDefault();
    if (item === ""){
        alert("Can't add empty item in the list");
    }
    else{
        document.getElementById('item-list').innerHTML += 
        `<li>
        ${item}
        <button class="remove-item btn-link text-red">
        <i class="fa-solid fa-xmark"></i>
        </button>
        </li>`;
        console.log("Added");
        localStorage.setItem(`${key}`, `${item}`);
        key++;
        document.getElementById('item-input').value=''; 
    }
}
document.querySelector('.btn').addEventListener('click', addItem);

function updateItem(event){
    event.preventDefault();
    let listItem = event.target.closest('li').textContent.trim();

    let input = document.getElementById('item-input').value;

    // console.log(listItem);
    input = listItem;
    document.getElementById('item-input').value = listItem;
    document.querySelector("#button").style.backgroundColor = "green";
    document.querySelector("#button").innerHTML = `<i class="fa-solid fa-pen"></i> Update Item`;

    let oldKey;
    for(let i = 1; i < localStorage.length; i++){
        if(localStorage.getItem(localStorage.key(i)) === listItem){
            oldKey = localStorage.key(i);
            break;
        }
    }
    
    let updateButton = document.querySelector('#button');
    let newButton = updateButton.cloneNode(true);
    updateButton.parentNode.replaceChild(newButton, updateButton);
    newButton.addEventListener('click', function(event) {
        if (event.target.innerHTML.includes('Update Item')) {
            localStorage.setItem(`${oldKey}`, document.querySelector('#item-input').value);
            document.querySelector('#button').style.backgroundColor = '';
            document.querySelector('#button').innerHTML = ' <i class="fa-solid fa-plus"></i> Add Item';
            document.querySelector('#item-input').value = '';
        }
    });
    console.log(`itemKey = ${oldKey}`);
    console.log(`oldValue = ${input}`);
}

document.querySelector('#item-list').addEventListener('click', function(event) {
    if (event.target.closest('.remove-item')) {
        deleteItem(event);
    } else {
        updateItem(event);
    }
});


function deleteItem(event){
    let itemValue = event.target.closest('li').textContent.trim(); 
    let itemKey;
    console.log(itemValue);
    
    if(confirm("Do you want to remove this item from your list?")){   
        event.target.closest('li').remove();
        console.log("Removed Item");
        for(let i = 1; i < localStorage.length; i++){
            if(localStorage.getItem(localStorage.key(i)) === itemValue){
                itemKey = localStorage.key(i);
                localStorage.removeItem(itemKey);
            }
        }
    }
    localStorage.removeItem(`${itemKey}`);
}
// document.querySelector('#item-list').addEventListener('click', deleteItem);


function clearAll(event){
    event.preventDefault();
    var list = document.getElementById('item-list').innerText;
    if (list ==''){
        alert("List is aleardy empty");
    }
    else{
        if(confirm("Are you sure you want to clear your list??")){
            document.getElementById('item-list').innerHTML = ``;
            localStorage.clear();
            key = 1;
        }
        
        console.log("Cleared all items");
    }
}
document.querySelector('.btn-clear').addEventListener('click', clearAll);


/* reference for search functionality :
    https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_filter_list
*/
function searchItem() {
    // Get the input element with the id 'filter'
    let input = document.getElementById('filter');

    // Get the value of the input and convert it to uppercase for case-insensitive comparison
    let filter = input.value.toUpperCase();

    // Get all the <li> elements in the document
    let li = document.getElementsByTagName('li');

    // Loop through all the <li> elements
    for (let i = 1; i < li.length; i++) {
        // Get the text content of the current <li> element
        let txtValue = li[i].textContent || li[i].innerText;

        // Check if the text content includes the filter string
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            // If it does, display the <li> element
            li[i].style.display = "";
        } else {
            // If it doesn't, hide the <li> element
            li[i].style.display = "none";
        }
    }
}

// To retain values from localStorage
document.addEventListener("DOMContentLoaded", retainValues);
function retainValues() {
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    items.push({ key: key, value: localStorage.getItem(key) }); // Making array of objects having property as {key: ___, value: list_item_name} This will make sorting easy based on the key.
  }
  items.sort((a, b) => a.key - b.key);
  items.forEach((item) => {
    document.getElementById("item-list").innerHTML += `<li>
        ${item.value}
        <button class="remove-item btn-link text-red" id="remove">
        <i class="fa-solid fa-xmark"></i>
        </button>
        </li>`;
  });
  key = localStorage.length + 1;
}
