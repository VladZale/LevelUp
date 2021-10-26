"use strict";

const popupError = document.querySelector(".popup__error");
const popupErrorSend = document.querySelector(".popup__error-send");
const popupSending = document.querySelector(".popup__sending");
const popupSuccessSend = document.querySelector(".popup__success-send");

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form");
    form.addEventListener("submit", formSend);

    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);

        let formData = new FormData(form);

        if (error === 0) {
            popupSending.classList.add("open popup-link");
            body.classList.add("_lock");
            let response = await fetch("sendmail.php", {
                method: "POST",
                body: formData,
            });
            if (response.ok) {
                formPreview.innerHTML = "";
                form.reset();
                popupSending.classList.remove("open");
                popupSuccessSend.classList.add("open");
                body.classList.add("_lock");
            } else {
                popupErrorSend.classList.add("open");
                body.classList.add("_lock");
                popupSending.classList.remove("open");
            }
        } else {
            popupError.classList.add("open");
            body.classList.add("_lock");
        }
    }

    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll("._req");

        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            formRemoveError(input);

            if (input.classList.contains("_phone")) {
                if (phoneTest(input)) {
                    console.log("hello");
                    formAddError(input);
                    error++;
                }
            } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
                formAddError(input);
                error++;
            } else {
                if (input.value === "") {
                    formAddError(input);
                    error++;
                }
            }
        }
        return error;
    }

    function formAddError(input) {
        input.parentElement.classList.add("_error");
        input.classList.add("_error");
    }
    function formRemoveError(input) {
        input.parentElement.classList.remove("_error");
        input.classList.remove("_error");
    }
    function phoneTest(input) {
        return (input.value = value.replace("/[^1-9]/g", " "));
    }

});
