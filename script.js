const passInput = document.querySelector("#inputPasswordId");
const lenInput = document.querySelector("#inputLengthId");
const infoLength = document.querySelector('label[for="inputLengthId"]');
const btnGerar = document.querySelector("#btnGerar");

const chkMin = document.querySelector("#chkMin");
const chkMai = document.querySelector("#chkMai");
const chkNum = document.querySelector("#chkNum");
const chkSim = document.querySelector("#chkSim");

const strengthBox = document.querySelector("#passwordStrength");

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const symbols = ["!", "@", "#", "$", "%"];

const caracters = Array.from(Array(26)).map((_, i) => i + 97);
const LowercaseCaracters = caracters.map((item) => String.fromCharCode(item));
const UppercaseCaracters = LowercaseCaracters.map((item) =>
    item.toUpperCase()
);

infoLength.innerHTML = lenInput.value;

lenInput.addEventListener("change", () => {
    infoLength.innerHTML = lenInput.value;
});

btnGerar.addEventListener("click", () => {
    generatePassword(
        chkNum.checked,
        chkSim.checked,
        chkMin.checked,
        chkMai.checked,
        lenInput.value
    );
});

const generatePassword = (hasNum, hasSim, hasMin, hasMax, Length) => {
    const newArray = [
        ...(hasNum ? numbers : []),
        ...(hasSim ? symbols : []),
        ...(hasMin ? LowercaseCaracters : []),
        ...(hasMax ? UppercaseCaracters : [])
    ];

    if (newArray.length === 0) return;

    let password = "";

    for (let i = 0; i < Length; i++) {
        const randomIndex = Math.floor(Math.random() * newArray.length);
        password += newArray[randomIndex];
    }

    passInput.value = password;

    checkStrength(password, hasNum, hasSim, hasMin, hasMax);
};


function checkStrength(password, num, sim, min, mai) {
    let score = 0;

    
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (password.length >= 16) score++;

    
    if (num) score++;
    if (sim) score++;
    if (min) score++;
    if (mai) score++;

    
    let strength = "";
    let color = "";

    if (score <= 3) {
        strength = "Senha Fraca";
        color = "red";
    } else if (score <= 5) {
        strength = "Senha Moderada";
        color = "orange";
    } else {
        strength = "Senha Forte";
        color = "green";
    }

    strengthBox.innerHTML = strength;
    strengthBox.style.color = color;
    strengthBox.style.fontWeight = "bold";
    strengthBox.style.marginTop = "2px";
}

