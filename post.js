let currentPage = 1;
const postsPerPage = 10;

function displayPosts(page = 1) {
    const postContainer = document.getElementById('postContainer');
    postContainer.innerHTML = ""; // Clear existing posts

    const posts = JSON.parse(localStorage.getItem('posts')) || [];

    if (posts.length === 0) return; // Exit if there are no posts

    // Sort posts by date in descending order (most recent first)
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Calculate total number of pages
    const totalPages = Math.ceil(posts.length / postsPerPage);
    
    // Get posts for the current page
    const start = (page - 1) * postsPerPage;
    const end = start + postsPerPage;
    const postsToShow = posts.slice(start, end);

    postsToShow.forEach(post => {
        // Create a div for each post
        const postElement = document.createElement('div');
        postElement.classList.add('post');

        // Add title to the post
        

        // Add author name to the post
     

        // Add image to the post if it exists
        if (post.image) {
            const imageElement = document.createElement('img');
            imageElement.src = post.image;
            imageElement.alt = 'Post Image'; // Add a default alt text or customize it as needed
            postElement.appendChild(imageElement);
        }
        if (post.title) {
            const titleElement = document.createElement('h3');
            titleElement.classList.add('post-title');
            titleElement.innerText = post.title;
            postElement.appendChild(titleElement);
        }
        // Add text content to the post
        if (post.content) {
            const contentElement = document.createElement('p');
            contentElement.classList.add('post-content');
            contentElement.innerText = post.content;
            postElement.appendChild(contentElement);
        }
        if (post.author) {
            const authorElement = document.createElement('p');
            authorElement.classList.add('post-author');
            authorElement.innerText = `By: ${post.author}`;
            postElement.appendChild(authorElement);
        }
        // Append the post to the post container
        postContainer.appendChild(postElement);
    });

    // Create pagination controls
    createPaginationControls(totalPages, page);
}

function createPaginationControls(totalPages, currentPage) {
    const paginationContainer = document.getElementById('paginationContainer');
    paginationContainer.innerHTML = ""; // Clear existing pagination

    // Create Previous button
    if (currentPage > 1) {
        const prevButton = document.createElement('button');
        prevButton.innerText = 'Previous';
        prevButton.onclick = () => displayPosts(currentPage - 1);
        paginationContainer.appendChild(prevButton);
    }

    // Create page number buttons
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.innerText = i;
        pageButton.classList.add(i === currentPage ? 'active' : '');
        pageButton.onclick = () => displayPosts(i);
        paginationContainer.appendChild(pageButton);
    }

    // Create Next button
    if (currentPage < totalPages) {
        const nextButton = document.createElement('button');
        nextButton.innerText = 'Next';
        nextButton.onclick = () => displayPosts(currentPage + 1);
        paginationContainer.appendChild(nextButton);
    }
}

// Display the posts on page load
window.onload = function() {
    displayPosts(currentPage);
};
