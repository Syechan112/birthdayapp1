const phrases = [
    "Hallooww 😀",
    "Kita pembukaan dulu yaaa 😄",
    "Ekhem!! 😮‍💨",
    "Perkenalkan nama ku Sean!! 😎",
    "Aku adalah pembuat aplikasi ini 😇",
    "Aplikasi ini aku buat untuk mengucapkan 😊",
    "Selamat kepada seseorang yang bulan ini 😙",
    "Karena Telah menginjak usia baruu!! 😭",
    "Ini hadiah dari aku 😋",
    "Semoga kamu suka yaaa~",
    "Dan aku harap 😳",
    "Semoga dengan ini 😊",
    "Kamu bisa lebih percaya diri lagi!! 🫡",
    "Okeiii 🙊",
    "Oia, info penting sebelum lanjut",
    "Kamu perlu tau zodiak kamu dulu yaa!!",
    "Langsung ajaaa kita mulai! 😍",
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