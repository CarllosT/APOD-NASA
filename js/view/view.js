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
    
    criarElementos()
            {
        this._div = document.createElement("div");
        this._div.appendChild(this._data);
        this._div.appendChild(this._img);
        this._div.appendChild(this._descricao);
        this._div.setAttribute("id","divContainer");
        document.getElementById('main').appendChild(this._div);
    }
}