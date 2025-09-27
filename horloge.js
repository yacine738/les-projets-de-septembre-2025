const { argv, env } = require('node:process');

const hour = argv[2] || env.hour;
const min = argv[3] || env.min;
const sec = argv[4] || env.sec;

const h = parseInt(hour, 10);
const m = parseInt(min, 10);
const s = parseInt(sec, 10);

const snoozeDelay = parseInt(argv[5] || env.snoozeDelay || '10', 10);
const snoozeTimes = parseInt(argv[6] || env.snoozeTimes || '3', 10);

const clock = setInterval(() => {
    console.clear();
    console.log(new Date().toLocaleTimeString('en-US', { hour12: true }));
}, 1000);

function wait(ms) {
    return new Promise((resolve, reject) => {
        if (ms < 0) {
            reject(new Error("Time travel not yet implemented"));
        } else {
            setTimeout(resolve, ms);
        }
    });
}

async function Alarm() {
    clearInterval(clock); // Arrêter l’horloge affichée
    console.log(new Date().toLocaleTimeString('en-US', { hour12: true }));
    for (let count = 1; count <= snoozeTimes; count++) {
        console.log(`Snooze #${count}`);
        try {
            await wait(snoozeDelay * 1000);
        } catch (err) {
            console.error("Erreur dans le délai de snooze : ", err);
            break;
        }
        console.log(new Date().toLocaleTimeString('en-US', { hour12: true }));
    }

    console.log("Alarme arrêtée.");
    process.exit(0);
}

function getDelayUntilAlarm(h, m, s) {
    const now = new Date();
    const target = new Date();

    target.setHours(h, m, s, 0);

    if (target <= now) {
        target.setDate(target.getDate() + 1);
    }

    return target - now;
}

wait(getDelayUntilAlarm(h, m, s))
    .then(Alarm)
    .catch(err => console.error("Erreur dans le délai avant alarme : ", err));
