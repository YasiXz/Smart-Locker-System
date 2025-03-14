

  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
  import { getAnalytics} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";
  import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js"; // Import Firebase Database functions

  const firebaseConfig = {
    apiKey: "AIzaSyDUkGbr4eDroN65udPmsM18n2LuqiGfmHo",
    authDomain: "smart-locker-system-28542.firebaseapp.com",
    projectId: "smart-locker-system-28542",
    storageBucket: "smart-locker-system-28542.appspot.com",
    messagingSenderId: "911181927124",
    appId: "1:911181927124:web:0f9cad92233eddd815e141",
    measurementId: "G-2FQ18BTDKY"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics();
  const db = getDatabase(app);

  

document.getElementById('bookLockerBtn').addEventListener('click', function() {
    // Generate a random password
    const password = generatePassword(12);

    // Display the password
    const passwordContainer = document.getElementById('passwordContainer');
    const passwordEl = document.getElementById('generatedPassword');
    passwordEl.textContent = password;
    passwordContainer.classList.remove('hidden');

    // Generate QR code with the password as payload
    const qrCodeContainer = document.getElementById('qrCodeContainer');
    const qrCanvas = document.getElementById('qrCode');
    const downloadLink = document.getElementById('downloadLink');

    const qr = new QRious({
        element: qrCanvas,
        value: password,
        size: 200
    });

    qrCodeContainer.classList.remove('hidden');
    downloadLink.href = qrCanvas.toDataURL("image/jpeg");

    if (password) {
        // Update Firebase with the new password and available lockers
        updateFirebase(password);
    }

    // Start countdown
    startCountdown(120); // 60 seconds countdown for testing
});

let availableLocker = 10;

function generatePassword(length) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";

    if (availableLocker > 0) {
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        availableLocker--;
        document.getElementById('randomIndex').textContent = availableLocker;
        return password;
    } else {
        document.getElementById('status').textContent = "No Available lockers";
        return null;
    }
}

// Function to update Firebase with the new password for a specific locker
function updateFirebase(password) {
    const lockerRef = ref(db, `lockers/`); // Reference for all lockers

    set(lockerRef, {  // Directly update the password for the lockers
        Password: password
    })
    .then(() => {
        console.log(`Password saved for Locker.`);
    })
    .catch((error) => {
        console.error('Error updating Firebase:', error);
    });
}

// Function to start countdown and reset all passwords when time's up
function startCountdown(duration) {
    const countdownEl = document.getElementById('countdown');
    const timerEl = document.getElementById('timer');
    let time = duration;

    countdownEl.classList.remove('hidden');

    const interval = setInterval(() => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        timerEl.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        if (time <= 0) {
            // Reset all passwords when the time is up
            resetAllPasswords(); // Call reset function immediately

            // Clear the interval after resetting the passwords
            clearInterval(interval);
            timerEl.textContent = "Time's up!";
        }

        time--;
    }, 1000);
}

// Function to reset all passwords for lockers when time is up
function resetAllPasswords() {
    const lockerRef = ref(db, `lockers/`); // Reference for all lockers

    // Update the password field to null for all lockers
    set(lockerRef, { Password: null })
    .then(() => {
        console.log(`All passwords reset to null.`);
    })
    .catch((error) => {
        console.error('Error resetting passwords:', error);
    });
}

