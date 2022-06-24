const wakeLockCheckbox = document.querySelector('#wakeLockCheckbox');
const statusDiv = document.querySelector('#statusDiv');
const reaquireCheckbox = document.querySelector('#reacquireCheckbox');
const fullScreenButton = document.querySelector('#fullScreenButton');
document.querySelector('.talert-box-container').style.display = "none";
var pin = document.querySelector('#pin').value;
var pwd = document.querySelector('#pwd').value;
document.querySelector('#fullScreenButton').style.display = "none";
document.querySelector('button').style.display = "none";
document.querySelector('#pwd-cont').style.display = "none";
document.querySelector('.disabled').style.display = "none";


window.addEventListener('load', function () {
  if (localStorage.getItem("imppin") != "") {
    document.querySelector('#pwd-cont').style.display = "block";
    document.querySelector('#pwd-txt').innerHTML = "Please Enter Your Pin";
    document.querySelector('#pin-cont').style.visibility = "hidden";
    document.querySelector('#pin-cont').style.display = "none";

    // verifyPin()


  }
  else {
    document.querySelector('.talert-box-container').style.display = "none";
    document.querySelector('#fullScreenButton').style.display = "none";
    document.querySelector('button').style.display = "none";
    document.querySelector('#pwd-cont').style.display = "none";
    document.querySelector('.disabled').style.display = "none";

  }

})
function clearpin() {
  alert("Your saved audio & video will be deleted!")
  setTimeout(hum, 000)
  function hum() {
  localStorage.clear()
  show()
  window.location.reload();
  }
}

function show() {
  if (typeof (Storage) !== "undefined") {
    localStorage.setItem("imppin", document.querySelector('#pin').value);
  } else {
    document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
  }
  var pin = document.querySelector('#pin').value;

  if (pin.length === 4) {
    // document.querySelector('.disabled').disabled = false;
    document.querySelector('button').style.display = "block";
    document.querySelector('.disabled').style.display = "block";
    document.querySelector('#pin-cont').style.visibility = "hidden";
    document.querySelector('#pin-cont').style.display = "none";
    document.querySelector('#fullScreenButton').style.display = "block";
    document.querySelector('.talert-box-container').style.display = "block";
  }
  else {
    const pintxt = document.querySelector('#pin-txt');
    document.querySelector('#pin-txt').innerHTML = "Please enter 4 number pin!";
    pintxt.style.color = "red";
  }
}


fullScreenButton.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
    fullScreenButton.innerHTML = "Exit full screen";
    document.querySelector('.disabled').style.display = "none";
    // document.querySelector('.disabled').disabled = true;
    document.querySelector('#pwd-cont').style.display = "block";
    document.querySelector('.talert-box-container').style.display = "none";
  }
  else {
    var pin = document.querySelector('#pin').value;
    var pwd = document.querySelector('#pwd').value;
    if (pwd === localStorage.getItem("imppin") && pwd != "") {
      document.exitFullscreen();
      document.querySelector('#pwd').value = "";
      fullScreenButton.textContent = 'Enter Full Screen';
      document.querySelector('.disabled').style.display = "block";
      // document.querySelector('.disabled').disabled = false;
      document.querySelector('#pwd-txt').style.display = "none";
      document.querySelector('.talert-box-container').style.display = "block";

    }
    else {
      const pintxt = document.querySelector('#pwd-txt');
      document.querySelector('#pwd-txt').innerHTML = "Invalid Pin!";
      pintxt.style.color = "red";
    }


  }
});

if ('WakeLock' in window && 'request' in window.WakeLock) {
  let wakeLock = null;

  const requestWakeLock = () => {
    const controller = new AbortController();
    const signal = controller.signal;
    window.WakeLock.request('screen', { signal })
      .catch((e) => {
        if (e.name === 'AbortError') {
          wakeLockCheckbox.checked = false;
          statusDiv.textContent = 'Wake Lock was aborted';
          console.log('Wake Lock was aborted');
        } else {
          statusDiv.textContent = `${e.name}, ${e.message}`;
          console.error(`${e.name}, ${e.message}`);
        }
      });
    wakeLockCheckbox.checked = true;
    statusDiv.textContent = 'Wake Lock is active';
    console.log('Wake Lock is active');
    return controller;
  };

  wakeLockCheckbox.addEventListener('change', () => {
    if (wakeLockCheckbox.checked) {
      wakeLock = requestWakeLock();
    } else {
      wakeLock.abort();
      wakeLock = null;
    }
  });

  const handleVisibilityChange = () => {
    if (wakeLock !== null && document.visibilityState === 'visible') {
      wakeLock = requestWakeLock();
    }
  };

  reaquireCheckbox.addEventListener('change', () => {
    if (reaquireCheckbox.checked) {
      document.addEventListener('visibilitychange', handleVisibilityChange);
      document.addEventListener('fullscreenchange', handleVisibilityChange);
    } else {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('fullscreenchange', handleVisibilityChange);
    }
  });
} else if ('wakeLock' in navigator && 'request' in navigator.wakeLock) {
  let wakeLock = null;

  const requestWakeLock = async () => {
    try {
      wakeLock = await navigator.wakeLock.request('screen');
      wakeLock.addEventListener('release', (e) => {
        console.log(e);
        wakeLockCheckbox.checked = false;
        statusDiv.textContent = 'Wake Lock was released';
        console.log('Wake Lock was released');
      });
      wakeLockCheckbox.checked = true;
      statusDiv.textContent = 'Wake Lock is active';
      console.log('Wake Lock is active');
    } catch (e) {
      wakeLockCheckbox.checked = false;
      statusDiv.textContent = `${e.name}, ${e.message}`;
      console.error(`${e.name}, ${e.message}`);
    }
  };

  wakeLockCheckbox.addEventListener('change', () => {
    if (wakeLockCheckbox.checked) {
      requestWakeLock();
    } else {
      wakeLock.release();
      wakeLock = null;
    }
  });

  const handleVisibilityChange = () => {
    if (wakeLock !== null && document.visibilityState === 'visible') {
      requestWakeLock();
      document.documentElement.requestFullscreen();
    }
  };


  reaquireCheckbox.addEventListener('change', () => {
    if (reaquireCheckbox.checked) {
      document.addEventListener('visibilitychange', handleVisibilityChange);
      document.addEventListener('fullscreenchange', handleVisibilityChange);
    } else {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('fullscreenchange', handleVisibilityChange);
    }
  });
} else {
  statusDiv.textContent = 'Wake Lock API not supported.';
  console.error('Wake Lock API not supported.');
}

function verifyPin() {
  var pin = document.querySelector('#pin').value;
  var pwd = document.querySelector('#pwd').value;
  if (pwd === localStorage.getItem("imppin") && pwd != "") {
      document.querySelector('button').style.display = "block";
      document.querySelector('.disabled').style.display = "block";
      document.querySelector('#pin-cont').style.visibility = "hidden";
      document.querySelector('#pin-cont').style.display = "none";
      document.querySelector('#fullScreenButton').style.display = "block";
      document.querySelector('.talert-box-container').style.display = "block";
      document.querySelector('#pwd').value = "";
      document.querySelector('#pwd-cont').style.display = "none";

    }
    else {
      alert("You Entered Wrong Pin");
       window.location.reload();
    }
  }

