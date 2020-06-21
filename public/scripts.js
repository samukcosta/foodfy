const recipes = document.querySelectorAll(".recipe")
const ingredient_content = document.querySelector(".content_ingredients")
const preparation_content = document.querySelector(".content_preparation")
const information_content = document.querySelector(".content_information")
const showIng = document.querySelector(".showHideIng")
const showPrep = document.querySelector(".showHidePrep")
const showInfo = document.querySelector(".showHideInfo")
const currentPage = location.pathname
const menuAdmin = document.querySelectorAll(".logoAdmin a")
const menuPublic = document.querySelectorAll(".links a")
const add_preparation = document.querySelector(".add-preparation")
const add_Ingredient = document.querySelector(".add-ingredient")


for (menu of menuAdmin){
    if (currentPage.includes(menu.getAttribute("href"))){
        menu.classList.add("active")
    }
}
for (menu of menuPublic){
    if (currentPage.includes(menu.getAttribute("href"))) {
        menu.classList.add("active")
    }
}
for (let recipe of recipes){
    recipe.addEventListener("click", function(){
        const recipeId = recipe.getAttribute("id")
        window.location.href = `/foodfy/recipes/${recipeId}`
    })
}

function addIngredient() {
    const ingredients = document.querySelector("#ingredients");
    const fieldContainer = document.querySelectorAll(".ingredient");

    // Realiza um clone do último ingrediente adicionado
    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true)

    // Não adiciona um novo input se o último tem um valor vazio
    if (newField.children[0].value == "") return false

    // Deixa o valor do input vazio
    newField.children[0].value = ""
    ingredients.appendChild(newField)
}
function addPreparation() {
  const preparations = document.querySelector("#preparations");
  const fieldContainer = document.querySelectorAll(".preparation_fields");

  // Realiza um clone do último ingrediente adicionado
  const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);

  // Não adiciona um novo input se o último tem um valor vazio
  if (newField.children[0].value == "") return false;

  // Deixa o valor do input vazio
  newField.children[0].value = "";
  preparations.appendChild(newField);
}

if (showIng){
    showIng.addEventListener("click", function(){
        if (showIng.textContent === "MOSTRAR"){
            showIng.innerHTML = "ESCONDER"
            ingredient_content.classList.remove("active")
        } else {
            showIng.innerHTML = "MOSTRAR"
            ingredient_content.classList.add("active")
        }
    })
}
if (showPrep){
    showPrep.addEventListener("click", function(){
        if (showPrep.textContent === "MOSTRAR"){
            showPrep.innerHTML = "ESCONDER"
            preparation_content.classList.remove("active")
        } else {
            showPrep.innerHTML = "MOSTRAR"
            preparation_content.classList.add("active")
        }
    })
}
if (showInfo){
    showInfo.addEventListener("click", function(){
        if (showInfo.textContent === "MOSTRAR"){
            showInfo.innerHTML = "ESCONDER"
            information_content.classList.remove("active")
        } else {
            showInfo.innerHTML = "MOSTRAR"
            information_content.classList.add("active")
        }
    })
}
if (add_Ingredient) {
    add_Ingredient.addEventListener("click", addIngredient)
}
if (add_preparation) {
    document.querySelector(".add-preparation").addEventListener("click", addPreparation)
}

const ImgUpload = {
    input: "",
    preview: document.querySelector('#img-preview'),
    uploadLimit: 5,
    files: [],
    handleFileInput(event){
        const {files: fileList} = event.target
        ImgUpload.input = event.target

        if(ImgUpload.hasLimit(event)) return

        Array.from(fileList).forEach((file) => {
            ImgUpload.files.push(file)

            const reader = new FileReader()

            reader.onload = () => {
                const image = new Image()
                image.src = String(reader.result)

                console.log(image)
                const div = ImgUpload.getContainer(image)

                console.log(div)

                ImgUpload.preview.appendChild(div)
            }

            reader.readAsDataURL(file)

        })
        
    },
    hasLimit(event){
        const {uploadLimit, input, preview} = ImgUpload
        const {files: fileList} = input

        if (fileList.length > uploadLimit) {
            alert(`Envie no máximo ${uploadLimit} imagens`)
            event.preventDefault()
            return true
        }

        const photosDiv = []
        preview.childNodes.forEach(item => {
            if (item.classList && item.classList.value == "image") {
                photosDiv.push(item)
            }
        })

        const totalPhotos = fileList.length + photosDiv.length
        if (totalPhotos > uploadLimit) {
            alert("Você atingiu o limite máximo de fotos")
            event.preventDefault()
            return true
        }
    },
    getAllFiles(){
        const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer()

        ImgUpload.files.forEach(file => dataTransfer.items.add(file))

        return dataTransfer.files
    },
    getContainer(image){
        const container = document.createElement('div')
        container.classList.add('image')

        container.onclick = ImgUpload.removePhoto

        container.appendChild(image)

        container.appendChild(ImgUpload.getRemoveButton())

        return container
    },
    getRemoveButton() {
        const button = document.createElement('span')
        button.classList.add('material-icons')
        button.innerHTML = "close"
        return button
    },
    removePhoto(event){
        const photoDiv = event.target.parentNode
        const photosArray = Array.from(ImgUpload.preview.children)
        const index = photosArray.indexOf(photoDiv)

        ImgUpload.files.splice(index, 1)
        ImgUpload.input.file = ImgUpload.getAllFiles
        photoDiv.remove()
    },
    removeOldPhoto(event) {
        const photoDiv = event.target.parentNode

        if (photoDiv.id) {
            const removedFiles = document.querySelector('input[name="removed_files"]')
            if (removedFiles) {
                removedFiles.value += `${photoDiv},`
            }
        }

        photoDiv.remove()
    }
}