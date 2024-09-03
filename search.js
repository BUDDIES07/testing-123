function searchPosts() {
    const searchQuery = document.getElementById('searchBar').value.toLowerCase();
    const postContainer = document.getElementById('postContainer');
    const posts = JSON.parse(localStorage.getItem('posts')) || [];

    // Clear current posts
    postContainer.innerHTML = "";

    // Filter and display posts
    posts.forEach((post) => {
        if (post.title.toLowerCase().includes(searchQuery) || post.content.toLowerCase().includes(searchQuery)) {
            const postElement = document.createElement('div');
            postElement.classList.add('post');

            if (post.title) {
                const titleElement = document.createElement('h3');
                titleElement.classList.add('post-title');
                titleElement.innerText = post.title;
                postElement.appendChild(titleElement);
            }

            if (post.image) {
                const imageElement = document.createElement('img');
                imageElement.src = post.image;
                imageElement.alt = 'Post Image';
                postElement.appendChild(imageElement);
            }

            if (post.content) {
                const contentElement = document.createElement('p');
                contentElement.classList.add('post-content');
                contentElement.innerText = post.content;
                postElement.appendChild(contentElement);
            }

            postContainer.appendChild(postElement);
        }
    });
}