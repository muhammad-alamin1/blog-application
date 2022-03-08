window.onload = () => {
    const comment = document.getElementById('comment');
    const commentHolder = document.getElementById('comment-holder');

    comment.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            if (e.target.value) {
                let postId = comment.dataset.post;
                let data = {
                    body: e.target.value
                }

                let req = postComment(`/api/comments/${postId}`, 'POST', data);
                fetch(req)
                    .then(response => response.json())
                    .then(data => {
                        let commentEle = createComment(data);
                        commentHolder.insertBefore(commentEle, commentHolder.children[0]);
                        e.target.value = '';
                    })
                    .catch(error => {
                        console.log(error);
                        alert(error.message);
                    })

            } else {
                alert('Please enter a valid comment.!');
            }
        }
    })

    commentHolder.addEventListener('keypress', (event) => {
        if (commentHolder.hasChildNodes(event.target)) {
            if (event.key === 'Enter') {
                let commentId = comment.dataset.post;
                let value = event.target.value;

                if (value) {
                    let data = {
                        body: value,
                    };

                    let req = postComment(`/api/comments/replies/${commentId}`, 'POST', data);

                    fetch(req)
                        .then(response => response.json())
                        .then(data => {
                            let replyEle = createReplyElement(data);
                            let parent = event.target.parentElement;
                            parent.previousElementSibling.appendChild(replyEle);
                            event.target.value = '';
                        })
                        .catch(error => {
                            console.log(error);
                            alert(error.message);
                        })
                } else {
                    alert('Please enter a valid comment.');
                }
            }
        }
    })
}

// post comment
const postComment = (url, method, body) => {
    let headers = new Headers();
    headers.append('Accept', 'application/JSON')
    headers.append('Content-Type', 'application/JSON');

    let req = new Request(url, {
        method,
        headers,
        body: JSON.stringify(body),
        mode: 'cors'
    });

    return req;
}

// create comment 
const createComment = (comment) => {
    let innerHTML = `
        <img src=${comment.user.profilePics} class="rounded-circle mx-3 my-3" style="width: 40px;" />
        <div class="media-body my-3">
            <p>${comment.body}</p>

            <div class="my-3>
            <input type="text" class="form-control" id="comment" name="reply" placeholder="Please enter comment" data-comment=${comment._id}>
            </div>
        </div>
    `

    let div = document.createElement("div");
    div.className = 'media border';
    div.innerHTML = innerHTML;

    return div;
}

// create reply element 
const createReplyElement = (reply) => {
    let innerHTML = `
        <img src="${reply.profilePics}" class="align-self-start mr-3 rounded-circle" style="width: 40px;" />
        <div class="media-body">
            <p>${reply.body}</p>
        </div>
    `;

    let div = document.createElement("div");
    div.className = 'media mt-3';
    div.innerHTML = innerHTML;

    return div;
}