import axios from "axios";

const form = document.querySelector<HTMLFormElement>('.form');
const posts = document.querySelector('.js-posts');
const submitButton = document.querySelector<HTMLButtonElement>('.js-submit')

type Post = {
    fname: string,
    lname: string,
    email: string,
    gender: string,
    country: string,
}

const addPostsHTML = (post: Post) => {
    const postHTML = `
        <div>
        <h1>${post.fname} ${post.lname}</h1>
        <p>${post.email}</p>
        <p>${post.gender}</p>
        <p>${post.country}</p>
        </div>
        `;

        posts.innerHTML += postHTML;
}

axios.get('http://localhost:3004/posts').then((res) =>{
    console.log(res.data)

    res.data.forEach((post: Post) => {
        addPostsHTML(post);
    });
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    submitButton.disabled = true;

    const formData = new FormData(form);

    const finalData: {[key: string]: unknown} = {};

    for (const pair of formData.entries()) {
        finalData[pair[0]] = pair[1];
    }

    axios.post('http://localhost:3004/posts', finalData).then((res) => {
        console.log('success', res.data);
        const post: Post = res.data;

        addPostsHTML(post)

        form.reset()
        submitButton.disabled = false;
    })

    console.log(finalData)
})