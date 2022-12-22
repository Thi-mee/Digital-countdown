

const countdown = () => {
  const mytime = document.querySelector('#time-date').value
  const currentTimeInSeconds = Math.floor(Date.now() / 1000);
  const future = new Date(mytime).getTime() / 1000;

  const secondsLeftTillEnd = future - currentTimeInSeconds;


  const days = Math.floor(secondsLeftTillEnd / 86400);
  const secondsInCurrentDay = secondsLeftTillEnd % 86400;
  const hours = Math.floor(secondsInCurrentDay / 3600);
  const secondsInCurrentHour = secondsInCurrentDay % 3600;
  const minutes = Math.floor(secondsInCurrentHour / 60);
  const secondsLeft = secondsInCurrentHour % 60;

  console.log(`${days} days, ${hours} hours, ${minutes} minutes, ${secondsLeft} seconds remaining`);

  document.querySelector('.digits-one').innerHTML = days
  document.querySelector('.digits-two').innerHTML = hours
  document.querySelector('.digits-three').innerHTML = minutes
  document.querySelector('.digits-four').innerHTML = secondsLeft

};

// countdown(86400 * 3 + 3600 * 2 + 60 * 45 + 30); // Outputs: "3 days, 2 hours, 45 minutes, 30 seconds remaining"

function startCountdown() {
  setInterval(() => {
    countdown();
  }, 1000);
}
// setTimeout(() => {
//   console.log('Happy Christmas!');
// }, secondsLeft * 1000);