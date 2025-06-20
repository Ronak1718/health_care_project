
const specialtisation = [
  { image: 'images/services/eye_care.jpg', title: 'Eye Care' },
  { image: 'images/services/cold.webp', title: 'Cough and Cold' },
  { image: 'images/services/tension.webp', title: 'Hypertension' },
  { image: 'images/services/ORTHOPAEDICS-1.jpg', title: 'Orthopaedics' },
  { image: 'images/services/children_doctor.jpg', title: 'Pediatrician' },
  { image: 'images/services/heart.jpg', title: 'Cardiologist' }
];

let gridHTML = '';
specialtisation.forEach((grid) => {
  gridHTML += `
    <div class="item">
      <div class="image_of_type">
        <img src="${grid.image}" class="service_image">
        <div class="text_in_grid">
          <br>
          <h2>${grid.title}</h2>
          <a href="index_offline-Appointment.html">
            <button class="booking_buttons">Book Offline Appointment</button>
          </a>
          <a href="index_online-Prescription.html">
            <button class="booking_buttons">Get Online Prescription</button>
          </a>
        </div>
      </div>
    </div>`;
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

  
  const checkAppointments = document.getElementById("my_appointments");
  if (checkAppointments) {
    checkAppointments.addEventListener("click", () => {
      const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
      let appointmentHTML = `
        <div class="appointment_box" id="appointmentList">
          <h1>Your Appointments</h1>
          ${appointments.map((data, index) => `
            <div class="summaryAppointment" data-index="${index}">
              <p><strong>${data.name}</strong> | ${data.age} | ${data.sex} | ${data.issue || data.doctor}</p>
              <p><strong>Booking:</strong> ${data.bookingTime}</p>
              <p><strong>Due:</strong> ${data.dueTime}</p>
              <div class="action_buttons">
                <button class="removeAppointment" data-index="${index}"><i class="fa-solid fa-xmark"></i></button>
              </div>
            </div>
          `).join("")}
        </div>
      `;
      const container = document.getElementById("appointmentContainer");
      if (container) container.innerHTML = appointmentHTML;

      document.querySelectorAll(".removeAppointment").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          const idx = parseInt(btn.getAttribute("data-index"));
          let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
          appointments.splice(idx, 1);
          localStorage.setItem("appointments", JSON.stringify(appointments));
          checkAppointments.click(); 
        });
      });
    });
  }

  let updateBell = document.getElementById("notification_bell");
  if (updateBell) {
    updateBell.addEventListener("click", () => {
      let updatesHTML = '';
      let dateNow = new Date();
      const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
      let found = false;
      appointments.forEach((data) => {
        if (!data.bookingTime) return;
        const bookingTime = new Date(data.bookingTime);
        const timeDiff = bookingTime.getTime() - dateNow.getTime();
        if (timeDiff <= 2 * 60 * 60 * 1000 && timeDiff >= 0) {
          found = true;
          updatesHTML += `
            <div class="updates-js-window">
              <p>🔔 You have an appointment in 2 hours!</p>
              <p><strong>${data.name}</strong> | ${data.issue}</p>
              <p>At: ${bookingTime.toLocaleString()}</p>
            </div>
          `;
        }
      });
      if (!found) {
        updatesHTML = `
          <div class="updates-js-window">
            <p>Updates from dr. will appear here</p>
          </div>
        `;
      }
      const updateWindow = document.getElementById("updateWindow");
      if (updateWindow) updateWindow.innerHTML = updatesHTML;
    });
  }


  const userInfo = JSON.parse(localStorage.getItem("signUpData"));
  const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
  const loggedInHTML = `
    <div class="accDisplay" id="accMenu">
      <h1>User Info</h1>
      <div class="row"><strong>Name:</strong> ${userInfo?.name || ''}</div>
      <div class="row"><strong>Email:</strong> ${userInfo?.email || ''}</div>
      <div class="row"><strong>Appointments:</strong> ${appointments.length}</div>
      <div class="row"><strong>Account Status:</strong> Verified</div>
      <div class="row">
        <button class="buttons" id="btnlogout">Logout</button>
      </div>
    </div>
  `;
  const accountBtn = document.getElementById('user_account');
  if (accountBtn) {
    accountBtn.addEventListener('click', () => {
      const isLoggedIn = localStorage.getItem("loggedIn") === "true";
      if (isLoggedIn) {
        document.querySelector('.accountWindow').innerHTML = loggedInHTML;

        setTimeout(() => {
          const logOutBtn = document.getElementById('btnlogout');
          if (logOutBtn) {
            logOutBtn.addEventListener('click', () => {
              localStorage.removeItem("loggedIn");
              location.reload(); 
            });
          }
        }, 0);
      }
    });
  }


  const isLoggedIn = localStorage.getItem("loggedIn") === "true";
  if (isLoggedIn) {
    const loginBtn = document.querySelector(".login_button");
    if (loginBtn) loginBtn.style.display = "none";
  }
});


document.addEventListener("click", function (e) {

  const modal = document.querySelector(".appointment_box");
  if (modal && !modal.contains(e.target) && e.target.id !== "my_appointments") {
    modal.remove();
  }

  const updateModal = document.querySelector(".updates-js-window");
  if (updateModal && !updateModal.contains(e.target) && e.target.id !== "notification_bell") {
    updateModal.remove();
  }

  const accModal = document.querySelector(".accDisplay");
  if (accModal && !accModal.contains(e.target) && e.target.id !== "user_account") {
    accModal.remove();
  }
});
