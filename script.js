

class Scale {
    greenBackground = " greenBackground";
    rootBackground = " darkGreen";
    // Steps for building the scales from roots
    majorScaleSteps = [2, 2, 1, 2, 2, 2, 1];
    minorScaleSteps = [2, 1, 2, 2, 1, 2, 2];
    pentatonicSteps = [2, 2, 3, 2, 3];
    minorPentatonicSteps = [3, 2, 2, 3, 2];
    steps = [];
    // Initial roots to build off of and initial variables
    cRoots = ["6-8", "5-3", "4-10", "3-5", "2-1", "1-8"];
    newScaleRoots = [];
    stepsFromC;

    // Uses the note names' steps from C to generate the root notes
    setScaleKey(noteName) {
        switch (noteName) {
            case "C":
                this.stepsFromC = 0;
                break;
            case "C#":
                this.stepsFromC = 1;
                break;
            case "D":
                this.stepsFromC = 2;
                break;
            case "Eb":
                this.stepsFromC = 3;
                break;
            case "E":
                this.stepsFromC = 4;
                break;
            case "F":
                this.stepsFromC = 5;
                break;
            case "F#":
                this.stepsFromC = 6;
                break;
            case "G":
                this.stepsFromC = 7;
                break;
            case "Ab":
                this.stepsFromC = 8;
                break;
            case "A":
                this.stepsFromC = 9;
                break;
            case "Bb":
                this.stepsFromC = 10;
                break;
            case "B":
                this.stepsFromC = 11;
                break;
            default:
                this.stepsFromC = 0;
                break;
        }
    }

    setScaleType(type) {
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
    }

    refreshColors() {
        for (let i = 6; i > 0; i--) {
            for (let y = 0; y < 13; y++) {
                const id = `${i}-${y}`;
                document.getElementById(id).classList = "note";
            }
        }
    }

    displayScale() {
        // Inital setup / reset variables
        this.refreshColors();
        this.newScaleRoots = [];
        this.generateRoots();

        this.newScaleRoots.forEach((n) => {
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

    generateRoots() {
        this.cRoots.forEach((r) => {
            const str = r.split("-")[0];
            const fret = r.split("-")[1];
            let newRoot = parseInt(fret) + this.stepsFromC;
            let extraRoot = "";
            if (newRoot > 12) {
                newRoot = newRoot - 12;
            }
            if (newRoot === 12) {
                extraRoot = str + "-0";
            }
            const newRootStr = `${str}-${newRoot}`;
            this.newScaleRoots.push(newRootStr);
            if (extraRoot !== "") {
                this.newScaleRoots.push(extraRoot);
            }
        })

    }
}


const scale = new Scale();

// Used for changing scale type
const maj = "major";
const min = "minor";
const penta = "pentatonic";
const minPenta = "minor pentatonic";
// Used for display
let SCALETYPE = maj;
let NOTE = "C";

// Update button color if it's the current selected button
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
            NOTE = "C";
            break;
        case 'C#':
            NOTE = "C#";
            break;
        case 'D':
            NOTE = "D";
            break;
        case 'Eb':
            NOTE = "Eb";
            break;
        case 'E':
            NOTE = "E";
            break;
        case 'F':
            NOTE = "F";
            break;
        case 'F#':
            NOTE = "F#";
            break;
        case 'G':
            NOTE = "G";
            break;
        case 'Ab':
            NOTE = "Ab";
            break;
        case 'A':
            NOTE = "A";
            break;
        case 'Bb':
            NOTE = "Bb";
            break;
        case 'B':
            NOTE = "B";
            break;
        default:
            NOTE = "C";
            break;
    }
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
    changeSelectedButton();
    scale.setScaleKey(NOTE);
    scale.setScaleType(SCALETYPE);
    scale.displayScale()
}

// Initial Display
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