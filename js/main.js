let myRow = document.getElementById("myRow")
let cllose = document.getElementById('close')
let opeen = document.getElementById('open')
let categorys = document.getElementById('categorys')
let areaa = document.getElementById('areaa')
let Ingredientss = document.getElementById('Ingredientss')
let Contact = document.getElementById('Contact')
let search = document.getElementById('search')
let searchByFLetterr = document.getElementById('searchByFLetter')
let searchByNamee = document.getElementById('searchByName')
let hideeShow = document.getElementById('hidee-show')
let hideee = document.getElementById('hideee')
let nameInput = document.getElementById('nameInput')
let emailInput = document.getElementById('emailInput')
let phoneInput = document.getElementById('phoneInput')
let ageInput = document.getElementById('ageInput')
let passwordInput = document.getElementById('passwordInput')
let repasswordInput = document.getElementById('repasswordInput')
let landding = document.getElementById('landding')


$(document).ready(function () {
    $('.landding').fadeOut(2500)
})

async function getRandomMeals() {
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    let data = await res.json()
    let random = data.meals
    displayAllMeals(random)
}
getRandomMeals()

Contact.addEventListener('click', function () {
    $('.landding').fadeIn(2500)
    hideeShow.style.display = 'none';
    myRow.innerHTML = '';
    let width = $('#ineer').outerWidth(true)
    $('.menu').animate({ left: `-${width}px` }, 1000)
    cllose.style.display = 'none'
    opeen.style.display = 'block'
    getInputs()
})



function getInputs() {
    hideee.style.display = 'block';
}
hideee.style.display = 'none';

let pos = Array.from(document.getElementsByClassName('pos'))



$('#open').click(function () {
    let left = $('.menu').css('left')
    if (left == '0px') {
        let width = $('#ineer').outerWidth(true)
        $('.menu').animate({ left: `-${width}px` }, 1000)

    } else {
        $('.menu').animate({ left: `0px` }, 1000)
        $('#ull').animate({ top: '0px' }, 500)

        $(pos).animate({ paddingTop: '10px' }, 1000)
        // pos.forEach((el)=> {
        //     el.style.paddingTop = '10px'
        // })
        cllose.style.display = 'block'
        opeen.style.display = 'none'

    }

})

$('#close').click(function () {
    let left = $('.menu').css('left')
    if (left == '0px') {
        let width = $('#ineer').outerWidth(true)
        $('.menu').animate({ left: `-${width}px` }, 1000)
        $(pos).animate({ paddingTop: '50px' }, 1000)
        $('#ull').animate({ top: '100%' }, 300)
        cllose.style.display = 'none'
        opeen.style.display = 'block'
    } else {
        $('.menu').animate({ left: `0px` }, 1000)
    }

})

let width = $('#ineer').outerWidth(true)
$('.menu').css({ left: `-${width}px` })

hideeShow.style.display = 'none';



// ================== display For all meals =================

function displayAllMeals(arrayOfMeals) {

    let temp = '';
    for (let i = 0; i < arrayOfMeals.length; i++) {
        temp += `   <div class="col-md-3 mb-5">
        <div onclick="detailsOfMeals('${arrayOfMeals[i].idMeal}')" class="img-layer">
            <img src="${arrayOfMeals[i].strMealThumb}" alt="" class="w-100">
            <div class="layer d-flex align-items-center">
                <h3 class="ps-2">${arrayOfMeals[i].strMeal}</h3>

            </div>
        </div>
        </div>`
    }
    myRow.innerHTML = temp


}

//====================== id of meals ======================


let details = [];
async function detailsOfMeals(idOfMeals) {

    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idOfMeals}`)
    let data = await res.json()
    details = data.meals
    console.log(details)
    displaydetailsOfMeals()
    //   details[0].idMeal
}
// =========================================================
// =================== display details =====================
function displaydetailsOfMeals() {
    $('.landding').fadeOut(500)
    let tags =[];
    let tags2 = '';
    let countIngredients = ``;
    let detailsObject = details[0];
    let IngredientList=[];
    let MeasureList=[];
    console.log(detailsObject);
    for (const key in detailsObject) {
        // debugger;
        if (key.startsWith("strIngredient")) {
            //  debugger;
            if (detailsObject[key] != "") {
                IngredientList.push(detailsObject[key]);
                //countIngredients += `<li class="alert alert-info m-2 p-1">${detailsObject[key]}</li>`
            }

        }
         if (key.startsWith("strMeasure"))
        {
            if (detailsObject[key] != " ") {
                MeasureList.push(detailsObject[key]);
                //countIngredients += `<li class="alert alert-info m-2 p-1">${detailsObject[key]}</li>`
            }
        }

         if (key.startsWith('strTags')){
              if(detailsObject[key] != null){
                  tags = detailsObject[key].split(',')

              }
        }

    }
    for (let index = 0; index < IngredientList.length; index++) {
       
        countIngredients += `<li class="alert alert-info m-2 p-1">${MeasureList[index]} ${IngredientList[index]}</li>`
    }

    for (let index = 0; index < tags.length; index++) {
        tags2 +=  `<p class="btn btn-info me-2">${tags[index]} </p> `
       
        
    }
    console.log(IngredientList);
    console.log(MeasureList);
console.log(details)

    //  for (let i = 1; i <= 20; i++) {
    //     debugger;
    //     details[`strIngredient${i}`];
    //     console.log(details[`strIngredient${i}`]);
    //     if (details[`strIngredient${i}`]) {

    //         countIngredients += `<li class="alert alert-info m-2 p-1">${details[`strMeasure${i}`]} ${details[`strIngredient${i}`]}</li>`
    //     }
    // }
    console.log(countIngredients)
    hideeShow.style.display = 'none';

    let temp = '';
    temp = ` <div class="parent-flex d-flex ">
    <div class="col-md-4 me-5">
        <img src="${details[0].strMealThumb}" class="w-100 imgm" alt="">
        <h2 class="text-white">${details[0].strMeal}</h2>
    </div>
    <div class="col-md-8">
        <h2 class="text-white">Instructions</h2>
        <p class="text-white">${details[0].strInstructions} </p>

        <h2  class="text-white fw-bold pb-0 mb-0" > Area : <p class="d-inline-block fw-semibold">${details[0].strArea} </p>  </h2>
        <h2  class="text-white fw-bold pb-0 mb-0" >Category: <p class="d-inline-block fw-semibold">${details[0].strCategory}</p>  </h2>
<div class="div2 w-75 ">
<h2  class="text-white fw-bold" >Recipes:  </h2>

<ul class="list-unstyled d-flex g-3 flex-wrap">
${countIngredients}
</ul>

<h2  class="text-white fw-bold me-2" >Tags:  </h2>
<div class="div pb-3">
${tags2}
</div>
<a target="_blank" href="${details[0].strSource}" class="btn btn-success">Source</a>
<a target="_blank" href="${details[0].strYoutube}" class="btn btn-danger">Youtube</a>
</div>

    </div>
 </div>`

    myRow.innerHTML = temp
}
// =======================================================

// ========================= Search By Name ==============================
search.addEventListener('click', function () {
    // $('.landding').slideToggle(2500)

    $('.landding').fadeIn(400);
    $('.landding').fadeOut(200);
    hideee.style.display = 'none';
    myRow.innerHTML = "";
    let width = $('#ineer').outerWidth(true)
    $('.menu').animate({ left: `-${width}px` }, 1000)
    cllose.style.display = 'none'
    opeen.style.display = 'block'
    searchInputs()

})

searchByNamee.addEventListener('keyup', function () {
    searchByName(searchByNamee.value)
})
// hideeShow.style.display = 'none';


let SBN = [];
async function searchByName(nameMeals) {
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nameMeals}`)
    let data = await res.json()
    SBN = data.meals
    displayAllMeals(SBN)
    console.log(SBN)
}
// =====================================================================
// ========================== search by first letter ====================

searchByFLetterr.addEventListener('keyup', function () {
    searchByFLetter(searchByFLetterr.value)
})

let SFL = [];
async function searchByFLetter(nameMeals) {
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${nameMeals}`)
    let data = await res.json()
    SFL = data.meals
    //    hideeShow.style.display = 'block';
    //    searchInputs()
    displayAllMeals(SFL)
    console.log(SFL)
}



function searchInputs() {
    hideeShow.style.display = 'block';

}

// =============== category meals ===============

categorys.addEventListener('click', function () {
    $('.landding').fadeOut(2500)

    hideee.style.display = 'none';
    hideeShow.style.display = 'none';
    let width = $('#ineer').outerWidth(true)
    $('.menu').animate({ left: `-${width}px` }, 1000)
    cllose.style.display = 'none'
    opeen.style.display = 'block'
    getGategory()
})


let category = [];
async function getGategory() {
    let res = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    let data = await res.json()
    category = data.categories
    displayGat()
    console.log(category)
}


function displayGat() {
    $('.landding').fadeOut(2500)

    let temp = '';
    for (let i = 0; i < category.length; i++) {
        temp += `<div class="col-md-3 mb-5">
        <div onclick="getGategoryMeals('${category[i].strCategory}')" class="img-layer">
            <img src="${category[i].strCategoryThumb}" alt="" class="w-100">
            <div class="layer text-center">
                 <h1 class="ps-2">${category[i].strCategory}</h1>
               <p class="mt-2">${category[i].strCategoryDescription}</p>
            </div>
        </div>
        </div>`
    }
    myRow.innerHTML = temp
}
let gategoryMeals = [];
async function getGategoryMeals(nameMeals) {
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${nameMeals}`)
    let data = await res.json()
    let gategoryMeals = data.meals
    displayAllMeals(gategoryMeals)
}

// =============== category meals ===============

// ================ Area Meals ========================


areaa.addEventListener('click', function () {
    let left = $('.menu').css('left')
    if (left == '0px') {
        let width = $('#ineer').outerWidth(true)
        $('.menu').animate({ left: `-${width}px` }, 1000)
        $(pos).animate({ paddingTop: '50px' }, 1000)
        $('#ull').animate({ top: '100%' }, 300)
        cllose.style.display = 'none'
        opeen.style.display = 'block'
    } else {
        // $('.menu').animate({left: `0px`},1000 ) 
    }

    hideee.style.display = 'none';
    hideeShow.style.display = 'none';
    let width = $('#ineer').outerWidth(true)
    $('.menu').animate({ left: `-${width}px` }, 1000)
    cllose.style.display = 'none'
    opeen.style.display = 'block'
    getarea()
})

let area = [];
async function getarea() {

    let res = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
    let data = await res.json()
    area = data.meals
    displayArea()
    console.log(area)
}


function displayArea() {
    $('.landding').fadeOut(2500)

    let temp = '';
    for (let i = 0; i < area.length; i++) {
        temp += `   <div class="col-md-3 mb-5">
        <div  onclick="getAreaMeals('${area[i].strArea}')" class="img-layer text-center">
            <i class="fa-solid fa-house-laptop fa-4x text-white"></i>
                <h3 class="ps-2 text-white">${area[i].strArea}</h3>
            
        </div>
        </div>`
    }
    myRow.innerHTML = temp
}

let areaMeals = [];
async function getAreaMeals(nameMeals) {
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${nameMeals}`)
    let data = await res.json()
    let areaMeals = data.meals
    displayAllMeals(areaMeals)
}

// ================ Area Meals ========================


// ================ Ingredients Meals ==================
Ingredientss.addEventListener('click', function () {


    hideee.style.display = 'none';
    hideeShow.style.display = 'none';
    let width = $('#ineer').outerWidth(true)
    $('.menu').animate({ left: `-${width}px` }, 1000)
    cllose.style.display = 'none'
    opeen.style.display = 'block'
    getIngredients()
    $('.landding').fadeOut(2500)

})

let Ingredients = [];
async function getIngredients() {

    let res = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
    let data = await res.json()
    Ingredients = data.meals.slice(0, 20)
    $('.landding').fadeOut(2500)
    displayIngredients()
    console.log(Ingredients)
}


function displayIngredients() {
    $('.landding').fadeOut(2500)

    let temp = '';
    for (let i = 0; i < Ingredients.length; i++) {
        temp += `    <div class="col-md-3 mb-5">
        <div  onclick="getIngredientsMeals('${Ingredients[i].strIngredient}')" class="img-layer text-center">
            <i class="fa-solid fa-drumstick-bite fa-4x text-white"></i>
                <h4 class="ps-2 text-white">${Ingredients[i].strIngredient}</h4>
     <p class="text-white">${Ingredients[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
            
        </div>
        </div>`
    }
    myRow.innerHTML = temp
}

let IngredientsMeals = [];
async function getIngredientsMeals(nameMeals) {
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${nameMeals}`)
    let data = await res.json()
    let IngredientsMeals = data.meals
    displayAllMeals(IngredientsMeals)
}


let nameAlert = document.getElementById('nameAlert')
nameInput.addEventListener('keyup', function () {
    // debugger;
    checkName()
})

function checkName() {

    let reg = /^[A-Z][a-z]{1,8}[0-9]?[0-9]?[0-9]?$/
    //debugger;
    if (reg.test(nameInput.value) == true) {
        nameAlert.classList.replace('d-block', 'd-none')
        return true
    } else {
        nameAlert.classList.replace('d-none', 'd-block')
        return false
    }
}

let emailAlert = document.getElementById('emailAlert')
emailInput.addEventListener('keyup', function () {
    checkEmail()
})



function checkEmail() {

    let reg = /^[a-zA-Z][a-z]{3,7}[0-9]{2,5}@[a-z]{5,8}\.[a-z]{2,3}$/

    if (reg.test(emailInput.value) == true) {
        emailAlert.classList.replace('d-block', 'd-none')
        return true
    } else {
        emailAlert.classList.replace('d-none', 'd-block')
        return false

    }
}

let phoneAlert = document.getElementById('phoneAlert')
phoneInput.addEventListener('keyup', function () {
    checkPhone()
})

function checkPhone() {

    let reg = /^[0][1][0-5][0-8]{8}/

    if (reg.test(phoneInput.value) == true) {
        phoneAlert.classList.replace('d-block', 'd-none')
        return true
    } else {
        phoneAlert.classList.replace('d-none', 'd-block')
        return false

    }
}

// ==========================================
let ageAlert = document.getElementById('ageAlert')
ageInput.addEventListener('keyup', function () {
    checkAge()
})

function checkAge() {

    let reg = /^[1-9][1-9]$/

    if (reg.test(ageInput.value) == true) {
        ageAlert.classList.replace('d-block', 'd-none')
        return true
    } else {
        ageAlert.classList.replace('d-none', 'd-block')
        return false

    }
}

// ==================================================

let passwordAlert = document.getElementById('passwordAlert')
passwordInput.addEventListener('keyup', function () {
    checkPassword()
})


function checkPassword() {

    let reg = /^[A-Z][a-zA-Z0-9!@#$%^&*]{6,16}$/

    if (reg.test(passwordInput.value) == true) {
        passwordAlert.classList.replace('d-block', 'd-none')
        return true
    } else {
        passwordAlert.classList.replace('d-none', 'd-block')
        return false
    }
}



// ===================================================
let repasswordAlert = document.getElementById('repasswordAlert')
repasswordInput.addEventListener('keyup', function () {
    checkRePassword()
})
let submitBtnn = document.getElementById('submitBtnn')
let submitBtn = document.getElementById('submitBtn')

function checkRePassword() {


    if (passwordInput.value == repasswordInput.value) {

        repasswordAlert.classList.replace('d-block', 'd-none');
        debugger;
        if (checkName() == true && checkEmail() == true && checkPhone() == true && checkAge() == true && checkPassword() == true) {
            submitBtnn.classList.replace('d-none', 'd-block')
            submitBtn.classList.replace('d-block', 'd-none')
        } else {
            submitBtnn.classList.replace('d-block', 'd-none')
            submitBtn.classList.replace('d-none', 'd-block')
        }

    }

}


// function checkAll(){
//     if( checkName() == true && checkEmail() == true && checkPhone() == true && checkAge() == true && checkPassword() == true && checkRePassword() == true){
//         submitBtnn.style.display = 'block'
//         submitBtn.style.dsplay = 'none'
//     }else{
//         submitBtnn.style.display = 'none'
//         submitBtn.style.dsplay = 'block'
//     }
// }




