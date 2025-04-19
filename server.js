const express = require('express');
const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static('public'));
app.use(express.static('posts'));

// Set view engine to HTML
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/blog', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'blog.html'));
});

// API endpoint to get all blog posts
app.get('/api/posts', (req, res) => {
    const postsDir = path.join(__dirname, 'posts');
    fs.readdir(postsDir, (err, files) => {
        if (err) {
            console.error('Error reading posts directory:', err);
            res.status(500).json({ error: 'Error reading posts directory' });
            return;
        }

        const posts = files
            .filter(file => file.endsWith('.md'))
            .map(file => {
                try {
                    const content = fs.readFileSync(path.join(postsDir, file), 'utf8');
                    const title = content.split('\n')[0].replace('#', '').trim();
                    const excerpt = content.split('\n')[1] || '';
                    return {
                        filename: file,
                        title: title,
                        excerpt: excerpt
                    };
                } catch (error) {
                    console.error(`Error reading file ${file}:`, error);
                    return null;
                }
            })
            .filter(post => post !== null);

        res.json(posts);
    });
});

app.get('/posts/:filename', (req, res) => {
    const filename = req.params.filename;
    if (!filename) {
        res.status(400).send('Filename is required');
        return;
    }

    const filePath = path.join(__dirname, 'posts', filename);
    
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading post:', err);
            res.status(404).send('Post not found');
            return;
        }
        
        try {
            const html = marked(data);
            res.send(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>${filename}</title>
                    <link rel="stylesheet" href="/styles.css">
                </head>
                <body>
                    <nav>
                        <div class="nav-container">
                            <a href="/">Home</a>
                            <a href="/blog">Blog</a>
                        </div>
                    </nav>
                    <main>
                        <div class="container">
                            ${html}
                        </div>
                    </main>
                    <footer>
                        <p>&copy; 2024 Clinician to Coder</p>
                    </footer>
                </body>
                </html>
            `);
        } catch (error) {
            console.error('Error processing markdown:', error);
            res.status(500).send('Error processing post');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
}); 