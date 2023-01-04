let intervalId = null;

// Check if the user has already set a date and time and starts the countdown if so
window.addEventListener('DOMContentLoaded', () => {
  const mytime = localStorage.getItem('mytime')
  const title = localStorage.getItem('title')
  if (mytime) {
    document.querySelector('#time-date').value = mytime
    document.querySelector('#counter-title').value = title
    startCountdown(mytime)
  }
})

function verifyDate() {
  const timeSelected = document.querySelector('#time-date').value
  const title = document.querySelector('#counter-title').value
  if (timeSelected === '') {
    document.getElementById('error-message').innerHTML = 'Please enter a date and time'
    setTimeout(() => {
      document.getElementById('error-message').innerHTML = ''
    }, 2000)
    return
  }

  if (new Date(timeSelected) < new Date()) {
    document.getElementById('error-message').innerHTML = 'Please enter a date and time in the future'
    setTimeout(() => {
      document.getElementById('error-message').innerHTML = ''
    }, 2000)
    return
  }

  if (title === '') {
    document.getElementById('error-message').innerHTML = 'Please enter a title'
    setTimeout(() => {
      document.getElementById('error-message').innerHTML = ''
    }, 2000)
    return
  }

  localStorage.setItem('mytime', timeSelected)
  localStorage.setItem('title', title)
  startCountdown(timeSelected)
}


const countdown = (mytime) => {
  const currentTimeInSeconds = Math.floor(Date.now() / 1000);
  const future = new Date(mytime).getTime() / 1000;

  const secondsLeftTillEnd = future - currentTimeInSeconds;

  if (secondsLeftTillEnd < 0) {
    clearInterval(intervalId);
    return;
  } else {
    if (secondsLeftTillEnd === 0) {
      document.querySelector('#ping').play()
    }
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
  

  
  
  const countTitleInput = document.querySelector('#counter-title')
  const countTitleDisplay = document.querySelector('.countdown-title')

  countTitleInput.setAttribute('disabled', true)
  document.querySelector('#time-date').setAttribute('disabled', true)
  document.querySelector('.ctab-start').setAttribute('disabled', true)
  document.querySelector('.ctab-start').classList.toggle('active')
  document.querySelector('.ctab-reset').classList.toggle('active')
  document.querySelector('.ctab-reset').removeAttribute('disabled')


  countTitleDisplay.innerHTML = countTitleInput.value;
}


function resetCountdown() {
  localStorage.removeItem('mytime')
  clearInterval(intervalId)
  document.querySelector('#time-date').value = ''
  document.querySelector('.digits-one').innerHTML = '00'
  document.querySelector('.digits-two').innerHTML = '00'
  document.querySelector('.digits-three').innerHTML = '00'
  document.querySelector('.digits-four').innerHTML = '00'

  document.querySelector('#counter-title').removeAttribute('disabled')
  document.querySelector('#time-date').removeAttribute('disabled')
  document.querySelector('.ctab-start').removeAttribute('disabled')
  document.querySelector('.ctab-start').classList.toggle('active')
  document.querySelector('.ctab-reset').classList.toggle('active')
  document.querySelector('.ctab-reset').setAttribute('disabled', true)
}

document