window.onload = () => {
    const bookmarks = document.getElementsByClassName('bookmark');
    [...bookmarks].forEach(bookmark => {
        bookmark.style.cursor = 'pointer';
        bookmark.addEventListener('click', (e) => {
            let target = e.target.parentElement;

            let headers = new Headers();
            headers.set('Content-Type', 'application/json');

            let req = new Request(`/api/bookmarks/${target.dataset.post}`, {
                method: 'POST',
                headers,
                mode: 'cors'
            });

            fetch(req)
                .then(response => response.json())
                .then(data => {
                    if (data.bookmark) {
                        target.innerHTML = '<i class="fas fa-bookmark"></i>'
                    } else {
                        target.innerHTML = '<i class="far fa-bookmark"></i>'
                    }
                })
                .catch(error => {
                    console.error(e.response.data);
                    alert(e.response.data.error);
                })
        })
    })
}