window.onload = () => {
    const likeBtn = document.getElementById('likeBtn');
    const dislikeBtn = document.getElementById('dislikeBtn');

    // like btn 
    likeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        let postId = likeBtn.dataset.post;
        reqLikeDislike('likes', postId)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                let likeText = data.liked ? 'Liked' : 'Like';
                likeText += ` ( ${data.totalLikes} )`;

                let dislikeText = `Dislike (${data.totalDislikes})`;

                likeBtn.innerHTML = likeText;
                dislikeBtn.innerHTML = dislikeText;
            })
            .catch(e => {
                console.log(e);
                alert(e.message);
            })
    })

    // dislike btn 
    dislikeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        let postId = likeBtn.dataset.post;
        reqLikeDislike('dislikes', postId)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                let dislikeText = data.disliked ? 'Disliked' : 'Dislike';
                dislikeText += ` ( ${data.totalDislikes} )`;

                let likeText = `Dislike (${data.totalLikes})`;

                likeBtn.innerHTML = likeText;
                dislikeBtn.innerHTML = dislikeText;
            })
            .catch(e => {
                console.log(e);
                alert(e.message);
            })
    })

    const reqLikeDislike = (name, postId) => {
        let headers = new Headers();
        headers.append('Accept', 'application/JSON')
        headers.append('Content-Type', 'application/JSON');

        let req = new Request(`/api/${name}/${postId}`, {
            method: 'GET',
            headers,
            mode: 'cors'
        });

        return fetch(req)

    }
}