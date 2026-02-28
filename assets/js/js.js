function submitForm() {

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let mobile = document.getElementById("mobile").value.trim();
    let location = document.getElementById("location").value;
    let message = document.getElementById("message").value.trim();
    let type = document.getElementById("type").value;

    let namePattern = /^[A-Za-z ]{3,}$/;
    let mobilePattern = /^[0-9]{10}$/;
    let emailPattern = /^[^\s@]+@[^\s@]+\.(com|in)$/;

    let valid = true;

    document.getElementById("nameError").innerText = "";
    document.getElementById("emailError").innerText = "";
    document.getElementById("mobileError").innerText = "";
    document.getElementById("locationError").innerText = "";
    document.getElementById("messageError").innerText = "";

    if (!namePattern.test(name)) {
        document.getElementById("nameError").innerText = "Enter valid name (min 3 letters)";
        valid = false;
    }

    if (!emailPattern.test(email)) {
        document.getElementById("emailError").innerText = "Invalid email (.com or .in)";
        valid = false;
    }

    if (!mobilePattern.test(mobile)) {
        document.getElementById("mobileError").innerText = "Invalid 10 digit number";
        valid = false;
    }

    if (location === "") {
        document.getElementById("locationError").innerText = "Select location";
        valid = false;
    }

    if (message.length < 10) {
        document.getElementById("messageError").innerText = "Message must be 10+ characters";
        valid = false;
    }

    if (!valid) return;

    let whatsappNumber = "91XXXXXXXXXX";

    let text =
        "*New Patient " + type + "*%0A" +
        "Name: " + name + "%0A" +
        "Email: " + email + "%0A" +
        "Contact: " + mobile + "%0A" +
        "Location: " + location + "%0A" +
        "Message: " + message;

    window.open("https://wa.me/" + whatsappNumber + "?text=" + text, "_blank");
}