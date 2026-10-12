"use strict";

// задания 1 2 3
document.querySelectorAll(".basic").forEach(function (form) {
    const message = form.querySelector(".message");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        message.textContent = "Form submitted successfully. Demo only.";
        message.className = "message mt-3 text-success";
        message.hidden = false;
    });

    form.addEventListener("input", function () {
        message.hidden = true;
    });
});

// то что проверяет поля и бустрап классы
function validateForm(form) {
    if (form.id === "form4") {
        const password = document.getElementById("password");
        const confirmation = document.getElementById("confirmPassword");

        if (password.value === confirmation.value) {
            confirmation.setCustomValidity("");
        } else {
            confirmation.setCustomValidity("Passwords must match.");
        }
    }

    const fields = form.querySelectorAll("input, textarea, select");

    fields.forEach(function (field) {
        if (field.type === "checkbox") {
            return;
        }

        const valid = field.checkValidity();

        if (valid) {
            field.classList.add("is-valid");
            field.classList.remove("is-invalid");
        } else {
            field.classList.add("is-invalid");
            field.classList.remove("is-valid");
        }

        field.setAttribute("aria-invalid", String(!valid));
    });

    return form.checkValidity();
}

// 3 и 4 таски
document.querySelectorAll(".check").forEach(function (form) {
    const message = form.querySelector(".message");
    let submitted = false;

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        submitted = true;

        if (validateForm(form)) {
            message.textContent = "All fields are valid. Demo submission completed.";
            message.className = "message mt-3 text-success";
        } else {
            message.textContent = "Please correct the highlighted fields.";
            message.className = "message mt-3 text-danger";

            const firstInvalid = form.querySelector(".is-invalid");

            if (firstInvalid) {
                firstInvalid.focus();
            }
        }

        message.hidden = false;
    });

    form.addEventListener("input", function () {
        message.hidden = true;

        if (submitted) {
            validateForm(form);
        }
    });

    form.addEventListener("reset", function () {
        submitted = false;
        message.hidden = true;

        const fields = form.querySelectorAll("input, textarea, select");

        fields.forEach(function (field) {
            field.classList.remove("is-valid", "is-invalid");
            field.removeAttribute("aria-invalid");
            field.setCustomValidity("");
        });
    });
});