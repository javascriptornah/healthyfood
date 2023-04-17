import confetti from "canvas-confetti";
import COLORS from "../data/colors";
export const shootFireworks = () => {
  const duration = 15 * 300;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.2, 0.4), y: Math.random() - 0.2 },
      })
    );
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.6, 0.8), y: Math.random() - 0.2 },
      })
    );
  }, 250);
};

export const capitalize = (string) => {
  let stringRes = string.split("");
  stringRes[0] = stringRes[0].toUpperCase();
  return stringRes.join("");
};

export const getHours = (hours) => {
  let timezone;
  let [hoursSplit, minutes] = hours.split(":");
  hoursSplit = Number(hoursSplit);
  if (Number(hoursSplit) < 12) {
    timezone = "AM";
  } else {
    timezone = "PM";
    if (hoursSplit == 12) {
    } else if (hoursSplit == 24) {
      hoursSplit = 12;
      timezone = "AM";
    } else {
      hoursSplit = hoursSplit - 12;
    }
  }

  return `${hoursSplit}:${minutes} ${timezone}`;
};
export const getRandomColor = () => {
  const colors = [
    COLORS.yellow,
    COLORS.lightBlue,
    COLORS.lightGreen,
    COLORS.lightOrange,
    COLORS.lightRed,
  ];
  return colors[Math.round(Math.random() * colors.length)];
};

export const fetchDaysDiff = (dateProp) => {
  const userDate = new Date(dateProp);
  const nowDate = new Date();
  const microSecondsDiff = nowDate.getTime() - userDate.getTime();
  const daysDiff = Math.round(microSecondsDiff / (1000 * 60 * 60 * 24));
  // if longer than an hour
  if (Math.round(microSecondsDiff / (1000 * 60)) > 59) {
    //if longer than a day
    if (Math.round(microSecondsDiff / (1000 * 60 * 60)) > 24) {
      return `${Math.round(microSecondsDiff / (1000 * 60 * 60 * 24))}d`;
    } else {
      // less than a day
      return `${Math.round(microSecondsDiff / (1000 * 60 * 60))}h`;
    }
  } else {
    // if less than a minute ago
    if (Math.round(microSecondsDiff / 1000) < 59) {
      return "JUST NOW";
    }
    // less than an hour
    return `${Math.round(microSecondsDiff / (1000 * 60))}m`;
  }
};

export const fetchAddresses = async (address) => {
  let res = await fetch("/api/location/getAddress", {
    method: "POST",
    body: address,
  });
  let resJson = await res.json();
  return resJson;
};
