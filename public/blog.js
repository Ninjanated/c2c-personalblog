document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/posts')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(posts => {
            const blogPostsContainer = document.getElementById('blog-posts');
            
            if (posts.length === 0) {
                blogPostsContainer.innerHTML = '<p>No blog posts found.</p>';
                return;
            }
            
            posts.forEach(post => {
                if (!post.filename || !post.title) {
                    console.error('Invalid post data:', post);
                    return;
                }

                const postElement = document.createElement('div');
                postElement.className = 'blog-post';
                postElement.innerHTML = `
                    <h2>${post.title}</h2>
                    <p>${post.excerpt}</p>
                    <a href="/posts/${encodeURIComponent(post.filename)}">Read more</a>
                `;
                blogPostsContainer.appendChild(postElement);
            });
        })
        .catch(error => {
            console.error('Error fetching blog posts:', error);
            document.getElementById('blog-posts').innerHTML = 
                '<p>Error loading blog posts. Please try again later.</p>';
        });
}); 