document.addEventListener("DOMContentLoaded", () => {
  // ==========================================================================
  // FIREBASE CONFIGURATION (SUDAH TERHUBUNG KE DATABASE LIVE ANDA)
  // ==========================================================================
  const firebaseConfig = {
    apiKey: "AIzaSyCHFepInaHIas3vGWs68t_OCUkmA2iDN0I",
    authDomain: "undangan-pelantikna-ipnu-ippnu.firebaseapp.com",
    databaseURL:
      "https://undangan-pelantikna-ipnu-ippnu-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "undangan-pelantikna-ipnu-ippnu",
    storageBucket: "undangan-pelantikna-ipnu-ippnu.firebasestorage.app",
    messagingSenderId: "1022984760906",
    appId: "1:1022984760906:web:263d035c867f85abcc00b3",
    measurementId: "G-B66VWY6WZJ",
  };

  // Inisialisasi Firebase & Referensi Database
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
  const rsvpRef = database.ref("rsvp_wishes");

  // ==========================================================================
  // 1. AMBIL NAMA TAMU DARI URL (?to=Nama+Tamu)
  // ==========================================================================
  const to = new URLSearchParams(window.location.search).get("to");
  if (to) {
    document.getElementById("nama-tamu").innerText = decodeURIComponent(to);
  }

  // ==========================================================================
  // 2. NAVIGASI ALUR 6 HALAMAN DAN SISTEM AUDIO
  // ==========================================================================
  const btnOpen = document.getElementById("btn-open");
  const btnToPage3 = document.getElementById("btn-to-page3");
  const btnBackToPage2 = document.getElementById("btn-back-to-page2");
  const btnToPage4 = document.getElementById("btn-to-page4");
  const btnBackToPage3 = document.getElementById("btn-back-to-page3");
  const btnToPage5 = document.getElementById("btn-to-page5");
  const btnBackToPage4 = document.getElementById("btn-back-to-page4");
  const btnToPage6 = document.getElementById("btn-to-page6");
  const btnBackToPage5 = document.getElementById("btn-back-to-page5");

  const page1 = document.getElementById("page-1");
  const page2 = document.getElementById("page-2");
  const page3 = document.getElementById("page-3");
  const page4 = document.getElementById("page-4");
  const page5 = document.getElementById("page-5");
  const page6 = document.getElementById("page-6");

  const bgMusic = document.getElementById("bg-music");
  const musicToggle = document.getElementById("music-toggle");
  let isMusicPlaying = false;

  // Halaman 1 -> Halaman 2 (Memicu putar musik)
  btnOpen.addEventListener("click", () => {
    page1.classList.add("hide-up");
    page2.classList.remove("hidden");
    page2.classList.add("show-up");

    bgMusic
      .play()
      .then(() => {
        isMusicPlaying = true;
        musicToggle.classList.remove("hidden-btn");
      })
      .catch((error) => {
        console.log("Autoplay diblokir browser, tombol manual aktif.", error);
        musicToggle.classList.remove("hidden-btn");
        musicToggle.innerHTML = '<i class="fas fa-music"></i>';
      });
  });

  // Kontrol Klik Manual Play / Pause Musik
  musicToggle.addEventListener("click", () => {
    if (isMusicPlaying) {
      bgMusic.pause();
      musicToggle.innerHTML = '<i class="fas fa-music"></i>';
    } else {
      bgMusic.play().catch((e) => console.log(e));
      musicToggle.innerHTML = '<i class="fas fa-disc fa-spin"></i>';
    }
    isMusicPlaying = !isMusicPlaying;
  });

  // Alur Navigasi Maju Mundur Halaman
  btnToPage3.addEventListener("click", () => {
    page2.classList.add("hide-up");
    page3.classList.remove("hidden");
    page3.classList.add("show-up");
  });

  btnBackToPage2.addEventListener("click", () => {
    page2.classList.remove("hide-up");
    page3.classList.add("hidden");
    page3.classList.remove("show-up");
  });

  btnToPage4.addEventListener("click", () => {
    page3.classList.add("hide-up");
    page4.classList.remove("hidden");
    page4.classList.add("show-up");
  });

  btnBackToPage3.addEventListener("click", () => {
    page3.classList.remove("hide-up");
    page4.classList.add("hidden");
    page4.classList.remove("show-up");
  });

  btnToPage5.addEventListener("click", () => {
    page4.classList.add("hide-up");
    page5.classList.remove("hidden");
    page5.classList.add("show-up");
  });

  btnBackToPage4.addEventListener("click", () => {
    page4.classList.remove("hide-up");
    page5.classList.add("hidden");
    page5.classList.remove("show-up");
  });

  btnToPage6.addEventListener("click", () => {
    page5.classList.add("hide-up");
    page6.classList.remove("hidden");
    page6.classList.add("show-up");
  });

  btnBackToPage5.addEventListener("click", () => {
    page5.classList.remove("hide-up");
    page6.classList.add("hidden");
    page6.classList.remove("show-up");
  });

  // ==========================================================================
  // AUTO SLIDER PAGE 3 (geser otomatis, berhenti saat gambar ditekan)
  // ==========================================================================
  const sliderTrack = page3.querySelector(".slider-track");
  const sliderItems = page3.querySelectorAll(".slide-item");

  let sliderTimer = null;
  let sliderPaused = false;
  let sliderPressed = false;

  const SLIDE_INTERVAL_MS = 4000;

  const stopPage3Slider = () => {
    if (sliderTimer) {
      clearInterval(sliderTimer);
      sliderTimer = null;
    }
  };

  const startPage3Slider = () => {
    if (!sliderTrack) return;
    if (sliderTimer) return;

    sliderPaused = false;
    sliderPressed = false;

    sliderTrack.scrollLeft = 0;

    sliderTimer = setInterval(() => {
      if (sliderPaused || sliderPressed) return;
      if (!sliderItems.length) return;

      const firstItem = sliderItems[0];
      const gap = parseFloat(getComputedStyle(sliderTrack).gap) || 0;
      const itemFullWidth = firstItem.getBoundingClientRect().width + gap;
      const currentIndex = Math.round(sliderTrack.scrollLeft / itemFullWidth);
      const nextIndex = (currentIndex + 1) % sliderItems.length;

      const nextItem = sliderItems[nextIndex];
      if (!nextItem) return;

      const target =
        nextItem.offsetLeft -
        (sliderTrack.clientWidth - nextItem.getBoundingClientRect().width) / 2;

      sliderTrack.scrollLeft = Math.max(
        0,
        Math.min(target, sliderTrack.scrollWidth - sliderTrack.clientWidth),
      );
    }, SLIDE_INTERVAL_MS);
  };

  const pausePage3Slider = () => {
    sliderPaused = true;
  };

  const resumePage3Slider = () => {
    sliderPaused = false;
  };

  sliderItems.forEach((item) => {
    item.addEventListener("pointerdown", () => {
      sliderPressed = true;
      pausePage3Slider();
    });

    item.addEventListener("pointerup", () => {
      sliderPressed = false;
      resumePage3Slider();
    });

    item.addEventListener("pointercancel", () => {
      sliderPressed = false;
      resumePage3Slider();
    });

    item.addEventListener("pointerleave", () => {
      if (sliderPressed) {
        sliderPressed = false;
        resumePage3Slider();
      }
    });
  });

  btnToPage3.addEventListener("click", () => {
    setTimeout(startPage3Slider, 200);
  });

  btnBackToPage2.addEventListener("click", stopPage3Slider);
  btnToPage4.addEventListener("click", stopPage3Slider);

  // ==========================================================================
  // 3. LOGIKA COUNTDOWN (Target: 31 Mei 2026 08:00:00 WIB)
  // ==========================================================================
  const targetDate = new Date("May 31, 2026 08:00:00").getTime();

  const updateTimer = () => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      document.getElementById("countdown").innerHTML =
        "<h3 style='color:white; font-size:1.2rem;'>ACARA SEDANG BERLANGSUNG</h3>";
      return;
    }

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = d.toString().padStart(2, "0");
    document.getElementById("hours").innerText = h.toString().padStart(2, "0");
    document.getElementById("minutes").innerText = m
      .toString()
      .padStart(2, "0");
    document.getElementById("seconds").innerText = s
      .toString()
      .padStart(2, "0");
  };

  setInterval(updateTimer, 1000);
  updateTimer();

  // ==========================================================================
  // 4. MENAMPILKAN UCAPAN SECARA REAL-TIME DARI FIREBASE CLOUD
  // ==========================================================================
  const wishesWall = document.getElementById("wishes-wall");

  rsvpRef.on("child_added", (snapshot) => {
    const data = snapshot.val();
    if (!data) return;

    const badgeClass =
      data.status === "Hadir" || data.status === "Rekan/Rekanita Akan Hadir"
        ? "hadir"
        : "tidak-hadir";

    const wishCard = document.createElement("div");
    wishCard.className = "wish-card";
    wishCard.innerHTML = `
      <strong>${data.name ?? "(Tanpa Nama)"}</strong>
      <span class="status-badge ${badgeClass}">${data.status ?? ""}</span>
      <p>${data.message ?? ""}</p>
    `;
    wishesWall.insertBefore(wishCard, wishesWall.firstChild);
  });

  // ==========================================================================
  // 5. MENGIRIM DATA RSVP & UCAPAN KE DATABASE CLOUD FIREBASE
  // ==========================================================================
  const rsvpForm = document.getElementById("rsvp-form");

  rsvpForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputName = document.getElementById("form-name").value;
    const selectStatus = document.getElementById("form-status").value;
    const inputMessage = document.getElementById("form-message").value;

    rsvpRef
      .push({
        name: inputName,
        status: selectStatus,
        message: inputMessage,
        timestamp: Date.now(),
      })
      .then(() => {
        rsvpForm.reset();
        alert(
          "Terima kasih! Ucapan & konfirmasi kehadiran Anda berhasil dikirim.",
        );
      })
      .catch((error) => {
        console.error("Firebase submit error:", error);
        alert("Gagal mengirim ucapan, periksa koneksi internet Anda.");
      });
  });
});
