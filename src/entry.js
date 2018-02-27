import css from './scss/style.scss';

document.addEventListener("DOMContentLoaded", () => {

    document.querySelector(".songs-list").innerHTML = '<div class="loading">Cargando...</div>';

    fetch('http://localhost:3001/songs/').then((response) => {
        if (response.ok) {
            response.json().then(data => {
                let html = "";
                if (data.length == 0) {
                    html = '<div class="info">No hay ninguna canción</div>';
                } else {
                    for (let song of data) {
                        html += `<article class="song">
                            <div class="cover">
                                <img src="${song.cover}" alt="${song.artist} - ${song.title}">
                            </div>
                            <div class="info">
                                <div class="title">${song.title}</div>
                                <div class="artist">${song.artist}</div>
                            </div>
                        </article>`;
                    }
                }
                document.querySelector(".songs-list").innerHTML = html;
            });
        } else {
            console.error("ERROR EN LA PETICION", response);
            document.querySelector(".songs-list").innerHTML = '<div class="error">Se ha producido un error</div>';
        }
    }).catch((error) => {
        console.error("ERROR RETRIEVING SONGS", error);
        document.querySelector(".songs-list").innerHTML = '<div class="error">Se ha producido un error</div>';
    });
});
