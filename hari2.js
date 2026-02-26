document.addEventListener('DOMContentLoaded', function() {

    // ============================
    // 🔐 CEK LOGIN USER (INI YANG PENTING)
    // ============================

    const nama = localStorage.getItem("nama");

    if (!nama) {
        window.location.href = "index.html";
        return;
    }

    // ============================
    // 🔒 CEK KELOMPOK USIA
    // ============================

    const kelompok = localStorage.getItem("kelompokUsia");

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
        item.classList.remove("locked-exercise");

        if (index === currentIndex) {

            // latihan aktif
            item.classList.add("active-exercise");

            item.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        } 
            else if (index > currentIndex) {

                // latihan masa depan dikunci
                item.classList.add("locked-exercise");

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
                let unlockedDay = parseInt(localStorage.getItem("unlockedDay")) || 2;
                let currentDay = parseInt(localStorage.getItem("currentDay")) || 2;

                if (currentDay >= unlockedDay) {
                    localStorage.setItem("unlockedDay", currentDay + 1);
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
