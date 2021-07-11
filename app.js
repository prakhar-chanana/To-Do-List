const form = document.querySelector('#itemForm');
const itemInput = document.querySelector("#item-input");
const itemList = document.querySelector('.display-task');

let dict = {};
let highdict = {};
let middict = {};
let lowdict ={};

const handleItem = function(itemName){

    const items = itemList.querySelectorAll('.tsk');

    items.forEach(function(item){

        if(item.querySelector('.item-name').textContent === itemName){
            item.querySelector('.complete-btn').addEventListener('click', function(){
                item.querySelector('.hi').classList.toggle('completed');
                item.querySelector('#tds').classList.toggle('disabled');
            });

            item.querySelector('.del-btn').addEventListener('click',function(){
                itemList.removeChild(item);
                delete dict[itemName];
                setLocalStorage('dict',dict);
                var x = item.querySelector('.hii').classList;
                if(x[1] === "red"){
                    delete highdict[itemName];
                    setLocalStorage('highdict',highdict);
                }
                if (x[1] === 'amber') {
                    delete middict[itemName];
                    setLocalStorage('middict',middict);
                }
                if (x[1] === 'green') {
                    delete lowdict[itemName];
                    setLocalStorage('lowdict',lowdict);
                }
            });
        }
    })
}

function ccolor(value){
    document.getElementById('itemInput').classList.add(value);
}

function ShowHigh(){
    var val = document.getElementById('highpr').value;
    if(val === "High"){
        itemList.innerHTML = '';
        for(const [key,value] of Object.entries(highdict)){
            itemList.insertAdjacentHTML('beforeend',`<div class="tsk" id="tsk"><div class="hii ${value}"><div class="hi"><div class="complete"><button class="complete-btn"><i class="far fa-check-square fa-2x"></i></button></div><div class="task-details"><span class="item-name" id="tds">${key}</span></div><div class="del"><button class="del-btn"><i class="fas fa-times fa-2x"></i></button></div></div></div></div>`);
            handleItem(key);
        };
    }
}
function ShowAll(){
    var val = document.getElementById('all').value;
    if(val === "All"){
        itemList.innerHTML = '';
        for(const [key,value] of Object.entries(dict)){
            itemList.insertAdjacentHTML('beforeend',`<div class="tsk" id="tsk"><div class="hii ${value}"><div class="hi"><div class="complete"><button class="complete-btn"><i class="far fa-check-square fa-2x"></i></button></div><div class="task-details"><span class="item-name" id="tds">${key}</span></div><div class="del"><button class="del-btn"><i class="fas fa-times fa-2x"></i></button></div></div></div></div>`);
            handleItem(key);
        };
    }
}
function ShowMid(){
    var val = document.getElementById('midpr').value;
    if(val === "Mid"){
        itemList.innerHTML = '';
        for(const [key,value] of Object.entries(middict)){
            itemList.insertAdjacentHTML('beforeend',`<div class="tsk" id="tsk"><div class="hii ${value}"><div class="hi"><div class="complete"><button class="complete-btn"><i class="far fa-check-square fa-2x"></i></button></div><div class="task-details"><span class="item-name" id="tds">${key}</span></div><div class="del"><button class="del-btn"><i class="fas fa-times fa-2x"></i></button></div></div></div></div>`);
            handleItem(key);
        };
    }
}
function ShowLow(){
    var val = document.getElementById('lowpr').value;
    if(val === "Low"){
        itemList.innerHTML = '';
        for(const [key,value] of Object.entries(lowdict)){
            itemList.insertAdjacentHTML('beforeend',`<div class="tsk" id="tsk"><div class="hii ${value}"><div class="hi"><div class="complete"><button class="complete-btn"><i class="far fa-check-square fa-2x"></i></button></div><div class="task-details"><span class="item-name" id="tds">${key}</span></div><div class="del"><button class="del-btn"><i class="fas fa-times fa-2x"></i></button></div></div></div></div>`);
            handleItem(key);
        };
    }
}

const getList = function(dict){
    itemList.innerHTML = '';
        for(const [key,value] of Object.entries(dict)){
            itemList.insertAdjacentHTML('beforeend',`<div class="tsk" id="tsk"><div class="hii ${value}"><div class="hi"><div class="complete"><button class="complete-btn"><i class="far fa-check-square fa-2x"></i></button></div><div class="task-details"><span class="item-name" id="tds">${key}</span></div><div class="del"><button class="del-btn"><i class="fas fa-times fa-2x"></i></button></div></div></div></div>`);
            handleItem(key);
        };
}

const getLocalStorage = function(){
    
    const todoStorage = localStorage.getItem('dict','highdict','middict','lowdict');
    if (todoStorage=== 'undefined' || todoStorage === null){
        dict = {};
        highdict = {};
        middict = {};
        lowdict = {};
    } else{
        dict = JSON.parse(todoStorage);
        highdict = JSON.parse(todoStorage);
        lowdict = JSON.parse(todoStorage);
        middict = JSON.parse(todoStorage);
        getList(dict);
    }
}

const setLocalStorage = function(list,dict){
    localStorage.setItem(list, JSON.stringify(dict));
}

getLocalStorage();

form.addEventListener('submit', function(e){
    e.preventDefault();

    var itemName = document.getElementById('itemInput').value;
    var priority = document.getElementById('dropdown').value;

    dict[itemName] = priority;
    setLocalStorage('dict',dict);
    getList(dict);

    if(priority === "red"){
        highdict[itemName] = priority;
        setLocalStorage('highdict',highdict);
    }

    if(priority === "amber"){
        middict[itemName] = priority;
        setLocalStorage('middict',middict);
    }

    if(priority === "green"){
        lowdict[itemName] = priority;
        setLocalStorage('lowdict',lowdict);
    }


    document.getElementById('itemInput').value = "";
    document.getElementById('dropdown').value = "";
    document.getElementById('itemInput').className = "ttl";

});
