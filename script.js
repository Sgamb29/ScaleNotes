

class Scale {
    greenBackground = " greenBackground";
    rootBackground = " darkGreen";
    majorScaleSteps = [2, 2, 1, 2, 2, 2, 1];
    minorScaleSteps = [2, 1, 2, 2, 1, 2, 2];
    pentatonicSteps = [2, 2, 3, 2, 3];
    minorPentatonicSteps = [3, 2, 2, 3, 2];
    steps = [];
    // Roots and steps: list of root notes and list of steps for scale (half/whole)
    constructor(roots) {
        this.roots = roots;
    }

    refreshColors() {
        for (let i = 6; i > 0; i--) {
            for (let y = 0; y < 13; y++) {
                const id = `${i}-${y}`;
                document.getElementById(id).classList = "note";
            }
        }
    }

    displayScale(type) {
        this.refreshColors();
        switch (type) {
            case "major":
                this.steps = this.majorScaleSteps;
                break;
            case "minor":
                this.steps = this.minorScaleSteps;
                break;
            case "pentatonic":
                this.steps = this.pentatonicSteps;
                break;
            case "minor pentatonic":
                this.steps = this.minorPentatonicSteps;
                break;
            default:
                this.steps = this.majorScaleSteps;
                break;

        }
        this.roots.forEach((n) => {
            document.getElementById(n).classList = document.getElementById(n).classList + this.rootBackground; 
            let fretNum = n.split("-")[1];
            let stringNum = n.split("-")[0];
            let nextNote = parseInt(fretNum);
            this.steps.forEach((s) => {
                nextNote = nextNote + s;
                if (nextNote > 12) {
                    nextNote = nextNote - 12;
                }
                let nextId = stringNum + "-" + nextNote.toString();
                document.getElementById(nextId).classList = document.getElementById(nextId).classList + this.greenBackground; 
                if (nextNote === 12) {
                    const open = stringNum + "-" + "0";
                    document.getElementById(open).classList = document.getElementById(open).classList + this.greenBackground;
                }
            })
        })
    }
}


// Root notes of the scales;
const cRoots = ["6-8", "5-3", "4-10", "3-5", "2-1", "1-8"];
const dRoots = ["6-10", "5-5", "4-12", "4-0", "3-7", "2-3", "1-10"];
const eRoots = ["6-0", "6-12", "5-7", "4-2", "3-9", "2-5", "1-0", "1-12"];
const fRoots = ["6-1", "5-8", "4-3", "3-10", "2-6", "1-1"];
const gRoots = ["6-3", "5-10", "4-5", "3-0", "3-12", "2-8", "1-3"];
const aRoots = ["6-5", "5-0", "5-12", "4-7", "3-2", "2-10", "1-5"];
const bRoots = ["6-7", "5-2", "4-9", "3-4", "2-0", "2-12", "1-7"];

const cKey = new Scale(cRoots);
const dKey = new Scale(dRoots);
const eKey = new Scale(eRoots);
const fKey = new Scale(fRoots);
const gKey = new Scale(gRoots);
const aKey = new Scale(aRoots);
const bKey = new Scale(bRoots);


const maj = "major";
const min = "minor";
const penta = "pentatonic";
const minPenta = "minor pentatonic";
// Used for final display
let KEY = cKey;
let SCALETYPE = maj;
let NOTE = "C";

function changeSelectedButton() {
    const buttons = document.querySelectorAll("button");
    buttons.forEach((b) => {
        b.classList = "note name";
    })
    buttons.forEach((b) => {
       if (b.innerText == NOTE) {
            b.classList = b.classList + " greenBackground";
       } 
       if (b.innerText.toUpperCase() == SCALETYPE.toUpperCase()) {
            b.classList = b.classList + " greenBackground";
       }
    })
}

function changeKey(note) {
    switch (note) {
        case 'C':
            KEY = cKey;
            NOTE = "C";
            break;
        case 'D':
            KEY = dKey;
            NOTE = "D";
            break;
        case 'E':
            KEY = eKey;
            NOTE = "E";
            break;
        case 'F':
            KEY = fKey;
            NOTE = "F";
            break;
        case 'G':
            KEY = gKey;
            NOTE = "G";
            break;
        case 'A':
            KEY = aKey;
            NOTE = "A";
            break;
        case 'B':
            KEY = bKey;
            NOTE = "B";
            break;
        default:
            KEY = cKey;
            NOTE = "C";
            break;
    }
    changeSelectedButton();
    display();
}

function changeType(type) {
    switch (type) {
        case "major":
            SCALETYPE = maj;
            break;
        case "minor":
            SCALETYPE = min;
            break;
        case "pentatonic":
            SCALETYPE = penta;
            break;
        case "minor pentatonic":
            SCALETYPE = minPenta;
            break;
        default:
            SCALETYPE = maj;
            break;
    }

    changeSelectedButton();
    display();
}

function changeSelectedButton() {
    const buttons = document.querySelectorAll("button");
    buttons.forEach((b) => {
        b.classList = "note name opts";
    })
    buttons.forEach((b) => {
       if (b.innerText == NOTE) {
            b.classList = b.classList + " greenBackground";
       } 
       if (b.innerText.toUpperCase() == SCALETYPE.toUpperCase()) {
            b.classList = b.classList + " greenBackground";
       }
    })
}

function display() {
    KEY.displayScale(SCALETYPE);

}

changeSelectedButton();
display();

// Wake lock logic
const screenWake = document.getElementById("screenWake");

let isSupported = false;
let wakeLock = null;
const wakeLabel = document.getElementById("wakeLabel");


screenWake.addEventListener("click", async () =>{
    if (wakeLock === null) {
        if ("wakeLock" in navigator) {
            isSupported = true;

            try { 
                wakeLock = await navigator.wakeLock.request("screen");           
                wakeLabel.innerText = "Wake Lock is active!";
                screenWake.style.backgroundColor = "lightGreen";
              } catch (err) {
                console.log(`${err.name}, ${err.message}`);
                wakeLabel.innerText = "Wake Lock error, might be battery settings."
              }

        } else {
            isSupported = false;
            document.getElementById("wakeLabel").innerText = "Wake Lock Not Supported";
        }
    } else {
        wakeLock.release().then(() => {
            wakeLock = null;
            screenWake.style.backgroundColor = "lightGrey";
            wakeLabel.innerText = "";
          });
    }
})
