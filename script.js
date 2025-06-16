let specialtisation = [{
    image: 'eye_care.jpg',  title: 'Eye Care'
},
{
    image: 'cold.webp',  title: 'Cough and Cold'
},
{
    image: ''
},{},{},{},{},{}];
let gridHTML = '';

specialtisation.forEach((grid) => {
    gridHTML += `<div class="item">
                <div class="image_of_type">
                <img src="${grid.image}" class = "service_image">
                <div class="text_in_grid">
                <br>
                <h2>${grid.title}</h2>
                </div>
                </div>
            </div>`
});

      document.querySelector('.available_categories').innerHTML = gridHTML;