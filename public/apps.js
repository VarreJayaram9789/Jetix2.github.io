document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.querySelector('#searchInput');
  const timestampsList = document.querySelector('#timestampsList');
  const videoPlayer = document.querySelector('#videoPlayer');

  searchInput.addEventListener('input', function () {
    const keyword = this.value;

    // Make a fetch request to the server for timestamp search
    fetch('http://localhost:3001/api/search?keyword=${keyword}')
      .then(response => response.json())
      .then(data => {
        timestampsList.innerHTML = '';

        data.forEach(timestamp => {
          const listItem = document.createElement('li');
          listItem.setAttribute('data-timestamp', timestamp.timestamp);
          listItem.textContent = timestamp.keyword;
          timestampsList.appendChild(listItem);
        });

        // Handle click events on timestamp items
        timestampsList.addEventListener('click', function (event) {
          if (event.target.tagName === 'LI') {
            const timestamp = event.target.dataset.timestamp;
            videoPlayer.currentTime = timestamp;
          }
        });
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred during timestamp search');
      });
  });
});