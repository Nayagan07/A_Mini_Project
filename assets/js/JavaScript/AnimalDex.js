let input = document.querySelector("#animal-search");
let button = document.querySelector("#search-btn");
let datalist = document.querySelector("#animal-list");
let h1 = document.querySelector("#animal-name");
let image = document.querySelector("#animal-image");

let Sname = document.querySelector("#scientific-name");
let family = document.querySelector("#family");
let origin = document.querySelector("#origin");
let habitat = document.querySelector("#habitat");
let diet = document.querySelector("#diet");

let lifeSpan = document.querySelector("#lifespan");
let weight = document.querySelector("#weight");
let height = document.querySelector("#height");

let appearance = document.querySelector("#appearance");
let color = document.querySelector("#colors");
let ability = document.querySelector("#abilities");
let environment = document.querySelector("#environment");
let communication = document.querySelector("#communication");   
let facts = document.querySelector("#facts");
let food = document.querySelector("#food-item")


fetch("assets/js/animal.json")
    .then(response => response.json())
    .then(data => {
        let animal = data.animals;
        button.addEventListener("click", function () {
            let animalName = input.value;
            let selectedAnimal = animal.find(animal => animal.name === animalName);
            if (selectedAnimal) {
                image.src = selectedAnimal.image;
            } else {
                alert("Animal not found!");
            }
            h1.innerHTML = selectedAnimal.name;
            Sname.innerHTML = selectedAnimal.scientificName;
            family.innerHTML = selectedAnimal.family;
            origin.innerHTML = selectedAnimal.origin;
            habitat.innerHTML = selectedAnimal.habitat;
            diet.innerHTML = selectedAnimal.diet;

            lifeSpan.innerHTML = selectedAnimal.lifespan;
            weight.innerHTML = selectedAnimal.weight;
            height.innerHTML = selectedAnimal.height;

            appearance.innerHTML = selectedAnimal.appearance;
            color.innerHTML = selectedAnimal.color;
            ability.innerHTML = selectedAnimal.abilities;
            environment.innerHTML = selectedAnimal.appearance;
            communication.innerHTML = selectedAnimal.communication;
            facts.innerHTML = selectedAnimal.interestingFacts;
            for (let i =0; i < 5; i++ ){
                food.innerHTML += `
                <p>${selectedAnimal.healthyFood[i].name}</p>
                <span>${selectedAnimal.healthyFood[i].benefit}</span>
                `;
            }
            

        });
        animal.forEach(element => {
                    // console.log(element);

            for (let key in element) {
                console.log(key);
                if (key === "id") {
                    let id = element[key];
                    console.log(id);
                    }
                else if (key === "name") {
                    let name = element[key];
                    console.log(name);
                    let option = document.createElement("option");
                    option.value = name;
                    datalist.appendChild(option);
                    }
            }
        })
    })