const phrases = [
"GILAAA LOOE!!",
"TAMBAH UMMUR JUGA LOOE",
"SELAMAT ULANG TAHUN LOOE",
"GUE HARAP SEHAT SELALU LOOE",
"DAH LANGSUNG MULAI AJA DEH"
];

let currentPhraseIndex = 0;
const textDisplay = document.getElementById("textDisplay");
const startButton = document.getElementById("startButton");
const nextButton = document.getElementById("nextButton");

startButton.addEventListener("click", () => {
    startButton.classList.add("hidden");
    textDisplay.classList.remove("hidden");
    displayPhrase();
});

function displayPhrase() {
    if (currentPhraseIndex < phrases.length) {
        textDisplay.textContent = "";
        const phrase = phrases[currentPhraseIndex];
        let index = 0;

        const typingEffect = setInterval(() => {
            if (index < phrase.length) {
                textDisplay.textContent += phrase.charAt(index);
                index++;
            } else {
                clearInterval(typingEffect);
                setTimeout(() => {
                    deletePhrase(phrase);
                }, 3000); // Jeda 3 detik setelah teks selesai
            }
        }, 100); // Kecepatan pengetikan
    }
}

function deletePhrase(phrase) {
    let index = phrase.length;

    const deletingEffect = setInterval(() => {
        if (index > 0) {
            textDisplay.textContent = phrase.substring(0, index);
            index--;
        } else {
            clearInterval(deletingEffect);
            currentPhraseIndex++;
            textDisplay.textContent = ""; // Menghapus teks terakhir
            if (currentPhraseIndex < phrases.length) {
                setTimeout(displayPhrase, 1000); // Jeda 1 detik sebelum menampilkan teks berikutnya
            } else {
                nextButton.classList.remove("hidden");
            }
        }
    }, 100); // Kecepatan penghapusan
}

// button end
document.getElementById("nextButton").addEventListener("click", function() {
    window.location.href = "/page/page.html";
});