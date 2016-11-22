var uploader = document.getElementById('uploader');
var fileButton = document.getElementById('fileButton');

//ouvir o elemento change
fileButton.addEventListener('change', function (e) {
    //obter o arquivo
    var file = e.target.files[0];

    //referenciar o storage
    var storageRef = firebase.storage().ref('arquivos/' + file.name);

    //enviar o arquivo
    var task = storageRef.put(file);

    //atualizar o progress bar
    task.on('state_changed',
        function progress(snapshot) {
            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes * 100)
            uploader.value = percentage;
        },
        function error(err) {
            console.log(err);
        },
        function complete() {
            alert('Envio Completo')
        })
});