class apModel  {
    constructor(){
        this.texto = "";
        this._imagem = "";
        this._data = "";
    }
    
    get descricao(){
        return this.texto;
    }
    get img(){
        return this._imagem;
    }
    get data(){
        return this._data;
    }
    
    requestData(data){        
        let request = new XMLHttpRequest;
        this._data = data;
        request.open("GET",`
        https://api.nasa.gov/planetary/apod?api_key=sfZdHetLnVXx7DXUjdhbRp21Tw5Js8xne65ci26M&date=${this._data}`,false);
        request.addEventListener("load",() =>{
            if(request.status == 200){
                let response = JSON.parse(request.responseText);
                this._imagem = response.url;
                this._texto = response.explanation;
            }
            else{
                console.log(`something wrong.. Error:[${request.status}] ${request.statusText}`);
            }
        })               
        request.send();
    }
}

class apView {
    constructor(model){
        this._data = document.createElement("p");
        this._texto = document.createElement("p");
        this._imagem = document.createElement("img");
        this._img.src = model.img;
        this._data.innerText = model.data;
        this._texto.innerText = `Explanation: ${model._texto}`;
        this._data.setAttribute("id", "data");
    }
    
    criarElementos(){
        this._div = document.createElement("div");
        this._div.appendChild(this._data);
        this._div.appendChild(this._img);
        this._div.appendChild(this._descricao);
        this._div.setAttribute("id","divContainer");
        document.getElementById('main').appendChild(this._div);
    }
}

class apController {
    pegaImagem(data){
        let model = new apModel;
        model.requestData(data);
        let views = new apView(model);
        views.criarElementos();

    }
    verificaData(data,operador){
        let dataFix = new Date(data+"T00:00:00");
        if(operador == "+"){
            if(dataFix.getTime() == new Date("Jun 16 1995").getTime()){
                
                dataFix.setDate(dataFix.getDate() + 4);
            }
            else{
                dataFix.setDate(dataFix.getDate() + 1);
                if(dataFix > Date.now()){
                    alert("Sorry but we can't look at the future");
                    dataFix = new Date();
                }
            }
        }
        else if(operador == "-"){
            if(dataFix.getTime() == new Date("Jun 20 1995").getTime()){
                dataFix.setDate(dataFix.getDate() - 4);
            }
            else{
                dataFix.setDate(dataFix.getDate() - 1);
                if(dataFix < new Date("Jun 16 1995")){
                    alert("unfortunately we don't have any photos on this day, please choose a date after June 19, 1995");
                    dataFix.setDate(dataFix.getDate() + 1);
                }
            }    
        }
            else{
            if(dataFix > Date.now()){
                alert("Sorry but we can't look at the future");
                dataFix = new Date();
            }
            if(dataFix < new Date("Jun 16 1995")){
                alert("unfortunately we don't have any photos on this day, please choose a date after June 19, 1995");
                dataFix = new Date();
            }
            if(dataFix.getTime() == new Date("Jun 17 1995").getTime() || dataFix.getTime() == new Date("Jun 18 1995").getTime() || dataFix.getTime() == new Date("Jun 19 1995").getTime()){       
                alert("unfortunately we don't have any photos on this day, please choose a date after June 19, 1995");
                dataFix = new Date();
            }
        }
        let arrData = dataFix.toISOString();
        let dataFix2 = arrData.split("T");
        return dataFix2[0];
    }
}

let date = document.getElementById("date"); 
let btnback = document.getElementById("btnback");
let btnSearch = document.getElementById("btnSearch"); 
let btnNext = document.getElementById("btnNext"); 
let apod = new apController;
var diaAtual = new Date();
var dd = diaAtual.getDate();
var mm = diaAtual.getMonth()+1; 
var yyyy = diaAtual.getFullYear();

if(dd<10) 
{
    dd='0'+dd;
} 

if(mm<10) 
{
    mm='0'+mm;
} 
diaAtual = yyyy+'-'+mm+'-'+dd;

window.onload = apod.pegaImagem(diaAtual);
btnSearch.addEventListener("click",function(){
    document.getElementById("divContainer").remove();
    let data = apod.verificaData(date.value,"");
    date.value = "";
    apod.pegaImagem(data);
});

btnback.addEventListener("click",function(){
    let diaAtual = document.getElementById("data");
    diaAtual = diaAtual.textContent;
    let novoDia = apod.verificaData(diaAtual,"-");
    document.getElementById("divContainer").remove();
    apod.pegaImagem(novoDia);
});

btnNext.addEventListener("click",function(){
    let diaAtual = document.getElementById("data");
    diaAtual = diaAtual.textContent;
    let novoDia = apod.verificaData(diaAtual,"+");
    document.getElementById("divContainer").remove();
    apod.pegaImagem(novoDia);
});