let specialtisation = [{
    image: 'images/services/eye_care.jpg',  title: 'Eye Care'
},
{
    image: 'images/services/cold.webp',  title: 'Cough and Cold'
},
{
    image: 'images/services/tension.webp' , title: 'Hypertension'
},{
    image: 'images/services/ORTHOPAEDICS-1.jpg' , title: 'Othropaedics'
},{
    image: 'images/services/children_doctor.jpg' , title: 'Peditrician'
},{
    image: 'images/services/heart.jpg' , title: 'cardiologist'
}];
let gridHTML = '';

specialtisation.forEach((grid) => {
    gridHTML += `<div class="item">
                <div class="image_of_type">
                <img src="${grid.image}" class = "service_image">
                <div class="text_in_grid">
                <br>
                <h2>${grid.title}</h2>
                <button class = "booking_buttons">Book Offline Appointment</button>
                 <button class = "booking_buttons">Get Online Prescription</button>
                </div>
                </div>
            </div>`
});

      document.querySelector('.available_categories').innerHTML = gridHTML;

       document.addEventListener("DOMContentLoaded", () => {
        const darkToggle = document.getElementById("darkModeSwitch");
        const body = document.body;

  const isDark = localStorage.getItem("darkMode") === "true";
  if (isDark) body.classList.add("dark");
  if (darkToggle) darkToggle.checked = isDark;

  if (darkToggle) {
    darkToggle.addEventListener("change", () => {
      body.classList.toggle("dark");
      localStorage.setItem("darkMode", body.classList.contains("dark"));
    });
  }
});
  