document.addEventListener('DOMContentLoaded', function() {
    const videoElement = document.getElementById('main-video');
    const videoSource = document.getElementById('video-source');
    const videoTitle = document.getElementById('video-title');
    const videoDescription = document.getElementById('video-description');
    const opSegment = document.getElementById('op-segment');
    const playlistElement = document.getElementById('playlist');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    let videos = [];

    function loadVideo(index) {
        const video = videos[index];
        videoSource.src = video.src;
        videoElement.load();
        videoTitle.textContent = video.title;
        videoDescription.textContent = video.description;
        opSegment.textContent = video.opSegment;
        document.body.style.backgroundImage = `url(${video.background})`;
    }

    function fetchVideos() {
        // 添加时间戳参数以避免缓存
        const url = `videos.json?timestamp=${new Date().getTime()}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                videos = data; // 更新全局视频列表
                displayVideos(videos);
                // Load the first video by default
                loadVideo(0);
            })
            .catch(error => console.error('Error fetching video data:', error));
    }

    function displayVideos(videosToDisplay) {
        playlistElement.innerHTML = ''; // 清空播放列表

        if (videosToDisplay.length === 0) {
            const noResultsMessage = document.createElement('p');
            noResultsMessage.className = 'no-results';
            noResultsMessage.textContent = 'No videos found';
            playlistElement.appendChild(noResultsMessage);
        } else {
            videosToDisplay.forEach((video, index) => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <img src="${video.thumbnail}" alt="${video.title}">
                    <div>
                        <h4>${video.title}</h4>
                    </div>
                `;
                listItem.addEventListener('click', () => loadVideo(index));
                playlistElement.appendChild(listItem);
            });
        }
    }

    function searchVideos() {
        const keyword = searchInput.value.toLowerCase();
        const filteredVideos = videos.filter(video =>
            video.title.toLowerCase().includes(keyword)
        );
        displayVideos(filteredVideos);
    }

    searchButton.addEventListener('click', searchVideos);
    searchInput.addEventListener('input', searchVideos); // 实时搜索

    fetchVideos();

    // 如果需要频繁更新，可以设置定时器定期刷新视频数据
    // setInterval(fetchVideos, 60000); // 每分钟刷新一次
});
