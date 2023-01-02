let intervalId = null;

// Check if the user has already set a date and time and starts the countdown if so
window.addEventListener('DOMContentLoaded', () => {
  const mytime = localStorage.getItem('mytime')
  if (mytime) {
    document.querySelector('#time-date').value = mytime
    startCountdown(mytime)
  }
})

function verifyDate() {
  const mytime = document.querySelector('#time-date').value
  if (mytime === '') {
    document.getElementById('error-message').innerHTML = 'Please enter a date and time'
    setTimeout(() => {
      document.getElementById('error-message').innerHTML = ''
    }, 2000)
    return
  }

  if (new Date(mytime) < new Date()) {
    document.getElementById('error-message').innerHTML = 'Please enter a date and time in the future'
    setTimeout(() => {
      document.getElementById('error-message').innerHTML = ''
    }, 2000)
    return
  }
  localStorage.setItem('mytime', mytime)
  startCountdown(mytime)
}


const countdown = (mytime) => {
  const currentTimeInSeconds = Math.floor(Date.now() / 1000);
  const future = new Date(mytime).getTime() / 1000;

  const secondsLeftTillEnd = future - currentTimeInSeconds;

  if (secondsLeftTillEnd < 0) {
    clearInterval(intervalId);
    return;
  }
  if (secondsLeftTillEnd === 0 ) {
    document.querySelector('#ping').play()
  } else {

    const days = Math.floor(secondsLeftTillEnd / 86400);
    const secondsInCurrentDay = secondsLeftTillEnd % 86400;
    const hours = Math.floor(secondsInCurrentDay / 3600);
    const secondsInCurrentHour = secondsInCurrentDay % 3600;
    const minutes = Math.floor(secondsInCurrentHour / 60);
    const secondsLeft = secondsInCurrentHour % 60;
  
    // console.log(`${days} days, ${hours} hours, ${minutes} minutes, ${secondsLeft} seconds remaining`);
  
    document.querySelector('.digits-one').innerHTML = days
    document.querySelector('.digits-two').innerHTML = hours
    document.querySelector('.digits-three').innerHTML = minutes
    document.querySelector('.digits-four').innerHTML = secondsLeft
  }
};


function startCountdown(mytime) {
  intervalId = setInterval(() => {
    countdown(mytime);
  }, 1000);
  document.querySelector('#time-date').setAttribute('disabled', true)
  document.querySelector('.ctab-start').setAttribute('disabled', true)
  document.querySelector('.ctab-start').classList.toggle('active')
  document.querySelector('.ctab-reset').classList.toggle('active')
  document.querySelector('.ctab-reset').removeAttribute('disabled')
}


function resetCountdown() {
  localStorage.removeItem('mytime')
  clearInterval(intervalId)
  document.querySelector('#time-date').value = ''
  document.querySelector('.digits-one').innerHTML = '00'
  document.querySelector('.digits-two').innerHTML = '00'
  document.querySelector('.digits-three').innerHTML = '00'
  document.querySelector('.digits-four').innerHTML = '00'

  document.querySelector('#time-date').removeAttribute('disabled')
  document.querySelector('.ctab-start').removeAttribute('disabled')
  document.querySelector('.ctab-start').classList.toggle('active')
  document.querySelector('.ctab-reset').classList.toggle('active')
  document.querySelector('.ctab-reset').setAttribute('disabled', true)
}

document