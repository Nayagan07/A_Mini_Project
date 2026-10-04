// const browseImage = document.querySelector("#browseImage");
// const animalImage = document.getElementById("animalImage");

// browseImage.addEventListener("click", () => {
//     animalImage.click();
// });
// animalImage.addEventListener("change", async () => {
//     const file = animalImage.files[0];
//     if (!file) return;
//     if (file.size > 10 * 1024 * 1024) {
//         alert("Image must be smaller than 10 MB.");
//         return;
//     }
//     if (!file.type.startsWith("image/")) {
//         alert("Please select an image.");
//         return;
//     }
//     const imageURL = URL.createObjectURL(file);
//         document.querySelector(".camera img").src = imageURL;
//             await analyzeAnimal(file);
// });
const browseImage = document.getElementById("browseImage");
const animalImage = document.getElementById("animalImage");

// const resultImage = document.querySelector(".result-image img");
let resultImage = document.querySelector(".camera img");
let resultImage1 = document.querySelector(".result-image img");
const resultName = document.querySelector(".result-info h2");
const resultScientificName = document.querySelector(".result-info p");

browseImage.addEventListener("click", () => {
    animalImage.click();
});

animalImage.addEventListener("change", async () => {

    const file = animalImage.files[0];

    if (!file) {
        return;
    }

    if (file.size > 10 * 1024 * 1024) {
        alert("Image must be smaller than 10 MB.");
        animalImage.value = "";
        return;
    }

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        alert("Please select a JPG, PNG or WEBP image.");
        animalImage.value = "";
        return;
    }

    resultImage.src = URL.createObjectURL(file);
    resultImage1.src = URL.createObjectURL(file);

    resultName.textContent = "Uploading...";
    resultScientificName.textContent = "Please wait";

    const formData = new FormData();

    formData.append("animalImage", file);

    try {

        const response = await fetch(
            "http://localhost:5000/api/emergency/upload",
            {
                method: "POST",
                body: formData
            }
        );

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        resultName.textContent = "Image Uploaded";
        resultScientificName.textContent = data.message;

        console.log("Backend response:", data);

    } catch (error) {

        console.error(error);

        resultName.textContent = "Upload Failed";
        resultScientificName.textContent = error.message;

    }

});
let datalist = document.querySelector(".animmal-list11")
fetch("assets/js/animal.json")
    .then(response => response.json())
    .then(data => {
        let animal = data.animals;
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
    
    
