window.onload = () => {
    tinymce.init({
        selector: 'textarea#tiny-mce-post-body',
        plugins: [
            'advlist autolink link image lists charmap print preview hr anchor pagebreak',
            'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
            'table emoticons template paste help code '
        ],
        toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | ' +
            'bullist numlist outdent indent | link image | print preview media fullscreen | ' +
            'forecolor backcolor emoticons | help | code',
        menu: {
            favs: { title: 'My Favorites', items: 'code visualaid | searchreplace | emoticons' }
        },
        menubar: 'favs file edit view insert format tools table help tools',
        automatic_uploads: true,
        images_upload_url: '/uploads/postimage',
        images_upload_handler: (blobInfo, success, failure) => {
            let headers = new Headers();
            headers.append('Accept', 'Application/JSON');

            let formData = new FormData();
            formData.append('post-image', blobInfo.blob(), blobInfo.filename());

            let req = new Request('/uploads/postimage', {
                method: 'POST',
                headers,
                mode: 'cors',
                body: formData
            })

            fetch(req)
                .then(response => response.json())
                .then(data => {
                    success(data.location)
                })
                .catch(() => failure('HTTP Error'));
        }
    })
}