class apModel  
        {
    constructor(){
        this._texto = "";
        this._imagem = "";
        this._data = "";
    }
    
    get descricao()
        {
        return this._texto;
    }
    get img()
        {
        return this._imagem;
    }
    get data()
        {
        return this._data;
    }
    
    requestData(data)
        {        
        let request = new XMLHttpRequest;
        this._data = data;
        request.open("GET",`
        https://api.nasa.gov/planetary/apod?api_key=cCGWrU4YCdF8AIf6xkZfC0QRLsLXO9IR5EJmOL7B&date=${this._data}`,false);
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