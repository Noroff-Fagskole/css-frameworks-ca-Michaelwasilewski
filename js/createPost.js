import {getToken} from "./utils/storage";
import { CREATE_POST_URL } from "./settings/api";


const createPostForm = document.querySelector("#post-form");
console.log(createPostForm);
const postTitle = document.querySelector("#post-title");
console.log(postTitle)
const posttitleError = document.querySelector("#titleError");
console.log(posttitleError)
const createPost = document.querySelector("#message");
console.log(createPost);
const postMessageError = document.querySelector("#postMessageError");
console.log(postMessageError)

createPostForm.addEventListener("submit", function (event){
    event.preventDefault();
    let isPostTitle = false;
    if(postTitle.value.trim().length > 0){
        posttitleError.classList.add("hidden");
        isPostTitle = true;
    } else {
        posttitleError.classList.remove("hidden");
    }

    let isCreatePost = false;
    if(createPost.value.trim().length > 0){
        postMessageError.classList.add("hidden");
        isCreatePost = true;
    } else {
        postMessageError.classList.remove("hidden");
    }

    let isFormValid = isPostTitle && isCreatePost;

    if(isFormValid) {
        console.log("Woop WOopp! U did it")
        console.log(postTitle.value);
        console.log(createPost.value);
        const postData = {
            "title": postTitle.value,
            "body": createPost.value
        };
        console.log("postData: ", postData);
        const accessToken = getToken();
        console.log("acceccToken: ", accessToken);
        console.log("CREATE_POST_URL", CREATE_POST_URL);
        (async function createPost(){
            const response = await fetch (CREATE_POST_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify(postData)
            })
            console.log("create post response: ", response)
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                console.log("Create post success!")
                location.href ="/home.html"
            } else {
                const err = await response.json();
                const message = "Creating post failed :(";
                throw new Error(message);
            }
            createPostForm.reset();
        })().catch(err => {
            console.log(err);
        });
    } else {
        console.log("FAILED!")
    }

})