function updateActivityTime(startTimeInSeconds) {
    const currentTime = new Date().getTime() / 1000;
    const elapsedSeconds = Math.floor(currentTime - startTimeInSeconds);
    const formattedTime = convertSecondsToTime(elapsedSeconds);
  
    document.querySelector(".subText:last-child").textContent = `${formattedTime}`;
  }
  
  function convertSecondsToTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours}:${minutes}:${remainingSeconds} elapsed`;
  }
  