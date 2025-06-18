function generatePDF() {
  const element = document.querySelector('.form_booking_appointment');
  html2pdf().from(element).save('Appointment-Details.pdf');
}
const form = document.querySelector('form');

form?.addEventListener("submit", function (e) {
  e.preventDefault();

  const now = new Date();
  const bookingTime = now.toLocaleString();
  const dueTime = new Date(now.getTime() + 2 * 60 * 60 * 1000).toLocaleString();

  const data = {
    name: document.getElementById("name").value,
    age: document.getElementById("age").value,
    sex: document.getElementById("sex").value,
    issue: document.getElementById("issue").value,
    mobile: document.getElementById("mobile").value,
    email: document.getElementById("email").value,
    description: document.querySelector("textarea[name='issue']").value,
    bookingTime,
    dueTime
  };

  let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
  appointments.unshift(data);
  localStorage.setItem("appointments", JSON.stringify(appointments));

  alert("Appointment saved successfully!");
  window.location.href = "index.html";
});
