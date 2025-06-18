let specialtisation = [{
    image: 'images/services/eye_care.jpg',  title: 'Eye Care'
},
{
    image: 'images/services/cold.webp',  title: 'Cough and Cold'
},
{
    image: 'images/services/tension.webp' , title: 'Hypertension'
},{
    image: 'images/services/ORTHOPAEDICS-1.jpg' , title: 'Orthopaedics'
},{
    image: 'images/services/children_doctor.jpg' , title: 'Pediatrician'
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
                <a href="book_appointmet_offline/index.html">
                <button class = "booking_buttons">Book Offline Appointment</button></a>
                <a href ="apply_for_online_prescription/index.html">
                 <button class = "booking_buttons">Get Online Prescription</button></a>
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
const checkAppointments = document.getElementById("my_appointments");
checkAppointments?.addEventListener("click", () => {
  const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
  let appointmentHTML = `
    <div class="appointment_box" id="appointmentList">
      <h1>Your Appointments</h1>
      ${appointments
        .map((data, index) => {
          return `
            <div class="summaryAppointment" data-index="${index}">
              <p><strong>${data.name}</strong> | ${data.age} | ${data.sex} | ${data.issue || data.doctor}</p>
              <p><strong>Booking:</strong> ${data.bookingTime}</p>
              <p><strong>Due:</strong> ${data.dueTime}</p>
              <div class="action_buttons">
                <button class="removeAppointment" data-index="${index}" id ="clearAppointment"><i class="fa-solid fa-xmark"></i></button>
              </div>
            </div>
          `;
        })
        .join("")}
    </div>
  `;

  const container = document.getElementById("appointmentContainer");
  container.innerHTML = appointmentHTML;

 
  document.querySelectorAll(".removeAppointment").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.getAttribute("data-index"));
      let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
      appointments.splice(idx, 1);
      localStorage.setItem("appointments", JSON.stringify(appointments));
      checkAppointments.click(); 
    });
  });
});
document.addEventListener("click", function (e) {
  const modal = document.querySelector(".appointment_box");
  if (
    modal &&
    !modal.contains(e.target) &&
    e.target.id !== "my_appointments"
  ) {
    modal.remove();
  }
});




