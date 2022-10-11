const {resolve} = require('path');

export default {
    build: {
        rollupOptions: {
            input: {
                home: resolve(__dirname, 'home.html'),
                signUp: resolve(__dirname, 'index.html'),
                logIn: resolve(__dirname, 'login.html'),
                createPost: resolve(__dirname, 'create-post.html'),
                // singlePost: resolve(__dirname, 'single-post.html'),
                // editPost: resolve(__dirname, 'edit-post.html'),
            },
        },
    },
};
