
var title = document.getElementById('title');
var price = document.getElementById('price');
var taxes = document.getElementById('taxes');
var ads = document.getElementById('ads');
var discount = document.getElementById('discount');
var totalElement = document.getElementById('total');
var category = document.getElementById('category');
var count = document.getElementById('count');
var submit = document.getElementsByClassName('submit');
var mood = 'create'
var temp;

function gettotal() {
    if (price.value !== '') {
        var result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        totalElement.innerHTML = result;
        totalElement.style.backgroundColor = '#040';
    } else {
        totalElement.innerHTML = ' ';
        totalElement.style.backgroundColor = '#a00d02';
    }
}

let detapro;

// Check if there is any data in localStorage with the key 'product'
if (localStorage.product != null) {
    // If there is data, assign it to detapro
    detapro = JSON.parse(localStorage.product);
} else {
    // If there is no data, initialize detapro as an empty array
    detapro = [];
}

// Function to submit data
function submitdata() {
    // Create a new object with form data
    let newpro = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        count: count.value,
        category: category.value,
        totalElement: totalElement.innerHTML,
    };

    // Push the new object into the detapro array
   
    if(mood==='create'){
        if(newpro.count > 1){
            for(let i =0 ;i<newpro.count;i++){
            detapro.push(newpro);
             }
        }
        else{
        detapro.push(newpro);
            }
}  else{
    detapro[temp]= newpro
    mood='create'
    submit[0].innerHTML= ' create'
    count.style.display= 'block'
}
cleardata()


    // Store the updated array in localStorage as a JSON string
    localStorage.setItem('product', JSON.stringify(detapro));
    cleardata();
    shawdata();
}

function cleardata() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    count.value = '';
    category.value = '';
    totalElement.innerHTML = '';
}

function shawdata() {
    gettotal()
    let table = '';
    for (let i = 0; i < detapro.length; i++) {
        table += `
        <tr>
            <td>${i + 1}</td>
            <td>${detapro[i].title}</td>
            <td>${detapro[i].price}</td>
            <td>${detapro[i].taxes}</td>
            <td>${detapro[i].ads}</td>
            <td>${detapro[i].discount}</td>
            <td>${detapro[i].count}</td>
            <td>${detapro[i].totalElement}</td>
            <td>${detapro[i].category}</td>
            <td><button onclick='uptadeData(${i})' id='update'>update</button></td>
            <td><button onclick='deletedata(${i})' id='delete'>delete</button></td>
        </tr>
        `;
    }
    document.getElementById('tbody').innerHTML = table;

    let btn = document.getElementById('deleteAll');
    if (detapro.length > 0) {
        btn.innerHTML = `<button onclick='deleteAll()'>Delete All</button>`;
    } else {
        btn.innerHTML = '';
    }
}

shawdata();

function deletedata(i) {
    detapro.splice(i, 1);
    localStorage.setItem('product', JSON.stringify(detapro));
    shawdata();
}

function deleteAll() {
    localStorage.removeItem('product');
    detapro = [];
    shawdata();
}


function uptadeData(i) {
    title.value = detapro[i].title;
    price.value = detapro[i].price;
    taxes.value = detapro[i].taxes;
    ads.value = detapro[i].ads;
    discount.value = detapro[i].discount;
    gettotal();
    count.style.display = 'none';
    category.value = detapro[i].category;
    submit[0].innerHTML = 'update'; // Access the first element of the collection
    mood='update'
    temp=i
    scroll({
        top :0,
        behavior: "smooth"
    
    })
}

let searchMood = 'title'
let search = document.getElementById('search')

function getsearchmood(id){
    if(id=== 'searchtitle'){
        searchMood = 'title'
        search.placeholder = 'search by title'

    }else{
        searchMood = 'category'
        search.placeholder = 'search by catrgory'

    }
    search.focus()
    search.value = ''
    shawdata()

}




function searchdaa(value){
    let table;
    if (searchMood=='title') {
        for(let i =0;i<detapro.length;i++){
            if(detapro[i].title.includes(value)){
                table = `
                <tr>
                    <td>${i + 1}</td>
                    <td>${detapro[i].title}</td>
                    <td>${detapro[i].price}</td>
                    <td>${detapro[i].taxes}</td>
                    <td>${detapro[i].ads}</td>
                    <td>${detapro[i].discount}</td>
                    <td>${detapro[i].count}</td>
                    <td>${detapro[i].totalElement}</td>
                    <td>${detapro[i].category}</td>
                    <td><button onclick='uptadeData(${i})' id='update'>update</button></td>
                    <td><button onclick='deletedata(${i})' id='delete'>delete</button></td>
                </tr>
                `;
            }
        }
    }else{
        
        for(let i =0;i<detapro.length;i++){
            if(detapro[i].category.includes(value)){
                table = `
                <tr>
                    <td>${i + 1}</td>
                    <td>${detapro[i].title}</td>
                    <td>${detapro[i].price}</td>
                    <td>${detapro[i].taxes}</td>
                    <td>${detapro[i].ads}</td>
                    <td>${detapro[i].discount}</td>
                    <td>${detapro[i].count}</td>
                    <td>${detapro[i].totalElement}</td>
                    <td>${detapro[i].category}</td>
                    <td><button onclick='uptadeData(${i})' id='update'>update</button></td>
                    <td><button onclick='deletedata(${i})' id='delete'>delete</button></td>
                </tr>
                `;
            }
        }

    }
    document.getElementById('tbody').innerHTML = table;

}

