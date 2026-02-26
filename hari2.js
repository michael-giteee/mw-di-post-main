document.addEventListener('DOMContentLoaded', function() {

    // ============================
    // 🔐 CEK LOGIN
    // ============================

    const nama = localStorage.getItem("nama");

    if (!nama) {
        window.location.href = "index.html";
        return;
    }

    // ============================
    // AMBIL SEMUA LATIHAN
    // ============================

    const allExercises = document.querySelectorAll(".exercise-item");
    let exercises = Array.from(allExercises);

    const continueBtn = document.querySelector(".continue-btn");
    const restartBtn = document.querySelector(".restart-btn");
    const progressText = document.querySelector(".small-text");

    // ============================
    // TIMER ELEMENT
    // ============================

    let timerDisplay = document.getElementById("timerDisplay");
    let startMissionBtn = document.getElementById("startMissionBtn");
    let finishMissionBtn = document.getElementById("finishMissionBtn");

    let timer = 60; // default 60 detik
    let timerInterval = null;

    // ============================
    // LOAD PROGRESS
    // ============================

    let currentIndex = parseInt(localStorage.getItem("exerciseProgress")) || 0;

    // ============================
    // UPDATE UI
    // ============================

    function updateActiveExercise() {

        exercises.forEach((item, index) => {

            item.classList.remove("active-exercise");
            item.classList.remove("locked-exercise");

            if (index === currentIndex) {

                item.classList.add("active-exercise");

                item.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }
            else if (index > currentIndex) {

                item.classList.add("locked-exercise");

            }

        });

        let progress = Math.round(((currentIndex) / exercises.length) * 100);

        if (progressText) {
            progressText.textContent = `Progress ${progress}%`;
        }

    }

    // ============================
    // TIMER FUNCTION
    // ============================

    function startTimer(duration) {

        clearInterval(timerInterval);

        timer = duration;

        timerInterval = setInterval(() => {

            timer--;

            if (timerDisplay) {
                timerDisplay.textContent = timer + " detik";
            }

            if (timer <= 0) {

                clearInterval(timerInterval);

                missionComplete();

            }

        }, 1000);

    }

    // ============================
    // MISI SELESAI
    // ============================

    function missionComplete() {

        alert("Misi telah selesai! 🎉");

        currentIndex++;

        localStorage.setItem("exerciseProgress", currentIndex);

        updateActiveExercise();

        // kalau semua selesai
        if (currentIndex >= exercises.length) {

            alert("Semua latihan selesai!");

            // unlock hari selanjutnya
            let unlockedDay = parseInt(localStorage.getItem("unlockedDay")) || 2;
            let currentDay = parseInt(localStorage.getItem("currentDay")) || 2;

            if (currentDay >= unlockedDay) {
                localStorage.setItem("unlockedDay", currentDay + 1);
            }

            window.location.href = "programlatihan.html";

        }

    }

    // ============================
    // START BUTTON
    // ============================

    if (startMissionBtn) {

        startMissionBtn.addEventListener("click", function() {

            startTimer(60); // 60 detik
        });

    }

    // ============================
    // FINISH BUTTON
    // ============================

    if (finishMissionBtn) {

        finishMissionBtn.addEventListener("click", function() {

            clearInterval(timerInterval);

            missionComplete();

        });

    }

    // ============================
    // VIDEO FIX (FULL PLAY)
    // ============================

    const videos = document.querySelectorAll("video");

    videos.forEach(video => {

        video.addEventListener("click", function() {

            if (video.requestFullscreen) {
                video.requestFullscreen();
            }

        });


            // ============================
            // 🎯 MISSION TIMER SYSTEM
            // ============================

            const timerSelect = document.getElementById("timerSelect");
            const timerDisplay = document.getElementById("timerDisplay");
            const startMissionBtn = document.getElementById("startMissionBtn");
            const finishMissionBtn = document.getElementById("finishMissionBtn");

            let timerInterval = null;
            let timeLeft = 60;

            function updateTimerDisplay() {

                const minutes = Math.floor(timeLeft / 60);
                const seconds = timeLeft % 60;

                timerDisplay.textContent =
                    minutes + ":" + seconds.toString().padStart(2, "0");

            }

            function unlockNextExercise() {

                if (currentIndex < exercises.length - 1) {

                    currentIndex++;
                    updateActiveExercise();

                    alert("Latihan berikutnya terbuka! 🔓");

                } else {

                    alert("Semua latihan selesai! 🎉");

                    let unlockedDay = parseInt(localStorage.getItem("unlockedDay")) || 2;
                    let currentDay = parseInt(localStorage.getItem("currentDay")) || 2;

                    if (currentDay >= unlockedDay) {
                        localStorage.setItem("unlockedDay", currentDay + 1);
                    }

                }

            }

            if (startMissionBtn) {

            startMissionBtn.addEventListener("click", function() {

                // ✅ STOP interval lama dulu
                if (timerInterval !== null) {
                    clearInterval(timerInterval);
                    timerInterval = null;
                }

                isTimerRunning = true;

                // ambil waktu dari dropdown
                timeLeft = parseInt(timerSelect.value);

                updateTimerDisplay();

                // ✅ interval stabil 1 detik
                timerInterval = setInterval(() => {

                    if (!isTimerRunning) return;

                    timeLeft--;

                    updateTimerDisplay();

                    if (timeLeft <= 0) {

                        // ✅ stop total
                        clearInterval(timerInterval);
                        timerInterval = null;
                        isTimerRunning = false;

                        alert("🎉 Misi selesai!");

                        unlockNextExercise();

                    }

                }, 1000);

            });

        }

            if (finishMissionBtn) {

            finishMissionBtn.addEventListener("click", function() {

                if (!isTimerRunning) return;

                clearInterval(timerInterval);
                timerInterval = null;
                isTimerRunning = false;

                alert("🎉 Misi selesai!");

                unlockNextExercise();

            });

        }

            // unlock latihan berikutnya
            function unlockNextExercise() {

                let unlockedDay =
                    parseInt(localStorage.getItem("unlockedDay")) || 2;

                let currentDay =
                    parseInt(localStorage.getItem("currentDay")) || 2;

                if (currentDay >= unlockedDay) {

                    localStorage.setItem(
                        "unlockedDay",
                        currentDay + 1
                    );

                }

            }
    });

    // ============================
    // INIT
    // ============================


    
    updateActiveExercise();

    

});
