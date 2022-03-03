window.onload = function() {
    let baseCropping = $('#cropped-image').croppie({
        viewport: {
            width: 200,
            height: 200
        },
        boundary: {
            width: 300,
            height: 300
        },
        showZoomer: true
    })

    function readableFile(file) {
        let reader = new FileReader()
        reader.onload = function(event) {
            baseCropping.croppie('bind', {
                url: event.target.result
            }).then(() => {
                $('.cr-slider').attr({
                    'min': 0.5000,
                    'max': 1.5000
                })
            })
        }
        reader.readAsDataURL(file);
    }
    $('#profilePicsFile').on('change', function(e) {
        if (this.files[0]) {
            readableFile(this.files[0]);
            $('#crop-modal').modal('show')
        }
    })

    $('#cancel-cropping').on('click', function() {
        $('#crop-modal').modal('hide');
        setTimeout(function() {
            baseCropping.croppie('destroy')
        }, 1000)
    })

    function generateFilename(name) {
        const types = /(.jpeg|.jpg|.png|.gif)/
        return name.replace(types, '.jpg');
    }

    $('#upload-image').on('click', function() {
        baseCropping.croppie('result', 'blob')
            .then(blob => {
                console.log(blob)
                let formData = new FormData();
                let file = document.getElementById('profilePicsFile').files[0];
                let name = generateFilename(file.name);
                formData.append('profilePics', blob, name);

                return fetch(`/uploads/profilePics`, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                        },
                        mode: 'cors',
                        body: JSON.stringify(formData),
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        document.getElementById('removeProfilePics').style.display = 'block';
                        document.getElementById('profilePics').src = data.profilePics;
                        document.getElementById('profilePicsForm').reset();

                        $('#crop-modal').modal('hide');
                        setTimeout(function() {
                            baseCropping.croppie('destroy')
                        }, 1000)
                    })
                    .catch(err => {
                        console.error(err);
                    })
            })

    })


}