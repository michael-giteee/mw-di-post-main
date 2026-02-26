document.addEventListener('DOMContentLoaded', function() {

    // ============================
    // 🔒 CEK KELOMPOK USIA
    // ============================

    const kelompok = localStorage.getItem("kelompokUsia");

    if (!kelompok) {
        window.location.href = "index.html";
        return;
    }

    const allExercises = document.querySelectorAll(".exercise-item");
    let exercises = Array.from(allExercises);

    // ============================
    // 🧠 MODE KELOMPOK 2 (Senior)
    // ============================

    if (kelompok === "kelompok2") {

        const title = document.querySelector("h1");

        if (title) {
            title.textContent = "Hari 2 - Program Senior";
        }

        document.body.classList.add("senior-mode");

        exercises.forEach((item, index) => {

            if (index >= 5) {
                item.style.display = "none";
            }

        });

        exercises = exercises.slice(0, 5);
    }


    // ============================
    // ▶️ SISTEM LANJUTKAN LATIHAN
    // ============================

    const continueBtn = document.querySelector(".continue-btn");
    const restartBtn = document.querySelector(".restart-btn");
    const progressText = document.querySelector(".small-text");

    let currentIndex = 0;

    function updateActiveExercise() {

        exercises.forEach((item, index) => {

            item.classList.remove("active-exercise");

            if (index === currentIndex) {

                item.classList.add("active-exercise");

                item.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }

        });

        let progress = Math.round(((currentIndex + 1) / exercises.length) * 100);

        if (progressText) {
            progressText.textContent = `Pemanasan ${progress}%`;
        }

    }


    // ============================
    // ▶️ CONTINUE BUTTON
    // ============================

    if (continueBtn) {

        continueBtn.addEventListener("click", function () {

            if (currentIndex < exercises.length - 1) {

                currentIndex++;
                updateActiveExercise();

            } else {

                // ============================
                // ✅ LATIHAN SELESAI
                // ============================

                alert("Latihan selesai! 🎉");

                // ambil hari sekarang
                let currentDay = parseInt(localStorage.getItem("currentDay")) || 1;

                let selectedDay = parseInt(localStorage.getItem("selectedDay")) || 1;

                // buka hari berikutnya
                if (selectedDay >= currentDay) {

                    localStorage.setItem("currentDay", selectedDay + 1);

                }

                // kembali ke halaman program latihan
                window.location.href = "programlatihan.html";

            }

        });

    }


    // ============================
    // 🔁 RESTART BUTTON
    // ============================

    if (restartBtn) {

        restartBtn.addEventListener("click", function () {

            currentIndex = 0;

            updateActiveExercise();

        });

    }


    // ============================
    // ▶️ INIT
    // ============================

    updateActiveExercise();

});
