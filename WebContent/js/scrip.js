var listaPokemon= document.getElementById("listaPokemon");
var img = document.getElementById("img");
var h3Abi=document.getElementById("h3Abi");
var li1=document.getElementById("li1");
var li2=document.getElementById("li2");
window.onscroll=function(){scroll()}

function cargarDataPokemon(){
	
	var request = new XMLHttpRequest();
	request.onreadystatechange= function(){
		console.log("OnReadyStateChange: ",this.readyState);
		//comprobamos que termino su trabajo y que la respuesta de servidor es 200
			if(this.readyState==4 && this.status==200 ){
				//Comprobar y Visualisar que hay en
				console.log(this.responseText);
				
				//respuesta como objeto javaScript
				var respuesta=JSON.parse(this.responseText);
				crearListaPokemon(respuesta);
			}
	}
	//configurar metodo http y la url a la que se va hacer peticion
	request.open('GET','https://pokeapi.co/api/v2/pokemon/',true);
	request.send();
}
function crearListaPokemon(datos){
	
	var listaPokemones= datos.results;
	for(pokemon of listaPokemones){
		createElementoPokemon(pokemon);
	}
}
function createElementoPokemon(pokemon){
	
	//ceando elemento li
	var elementoLi=document.createElement("li");
	var elementB=document.createElement("button");

	
	//configuracion de elemento,poniendo contenido texto
	elementoLi.innerText=pokemon.name + " ";
	elementoLi.className="list-group-item list-group-item-action list-group-item-danger";
	elementB.className="btn btn-primary";
	elementB.innerText="Mostar Pokemon";
	elementB.onclick= function(){
		var request = new XMLHttpRequest();
		request.onreadystatechange= function(){
		
				if(this.readyState==4 && this.status==200 ){
					var respuesta =JSON.parse(this.responseText);
					img.src=respuesta.sprites.front_default;
					listaAbilities (respuesta);
					h3Abi.innerText=pokemon.name;
				}
		}
		//configurar metodo http y la url a la que se va hacer peticion
		request.open('GET','https://pokeapi.co/api/v2/pokemon/'+pokemon.name,true);
		request.send();
	}

	//mandarlo al DOM
	elementoLi.appendChild(elementB);
	listaPokemon.appendChild(elementoLi);
	
	
}
function listaAbilities (data){
	var listaAbilitiesP=data.abilities;
	li1.innerText=listaAbilitiesP[0].ability.name;
	li2.innerText=listaAbilitiesP[1].ability.name;
}

function scroll(){
	
}
