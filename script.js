const form = document.getElementById("form")
const result = document.getElementById("result")

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    var contact = formData.get("contact").trim(); // Trim to remove extra spaces

    // Contact validation: Check length and if it's a number
    if (contact.length < 10 || isNaN(contact)) {
        result.innerHTML = "Please enter a valid contact number (10-15 digits).";
        result.style.color = "red";
        return; // Stop form submission
    }

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'accept': 'application/json'
        },
        body: json
    })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = json.message;

            }
            else {
                console.log(response);
                result.innerHTML = json.message;
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "Something went wrong";
        })

        .then(function () {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 3000);
            alert("FORM SUBMITTED SUCCESFULLY");
        });

});
