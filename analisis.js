async function analizarComentario(comment) {
    console.log("has de cuenta que analice: " + comment.comentario)
    let result;
    result = await $.ajax({
        headers: {
        },
        'url': 'http://192.168.100.29:3000/api/comentario',
        'type': 'POST',
        'data': comment,
        'dataType': 'json'
    })
    return result;
}

async function analizar() {
    let comentarios = document.getElementById("comentarios").value.split("\n")
    let analizado
    let enojo = 0, disgusto = 0, miedo = 0, felicidad = 0, tristeza = 0
    for (let i = 0; i < comentarios.length; i++) {
        data = {
            comentario: comentarios[i]
        }
        analizado = await analizarComentario(data)
        for (let j = 0; j < analizado.length; j++) {
            switch (analizado[j].tone_name) {
                case "Anger":
                    enojo += analizado[j].score;
                    break;
                case "Disgust":
                    disgusto += analizado[j].score;
                    break;
                case "Fear":
                    miedo += analizado[j].score;
                    break;
                case "Joy":
                    felicidad += analizado[j].score;
                    break;
                case "Sadness":
                    tristeza += analizado[j].score;
                    break;
            }
        }
    }

    document.getElementById("txtEnojo").innerHTML = ((enojo / comentarios.length) * 100).toFixed(2) + "%"
    document.getElementById("txtDisgusto").innerHTML = ((disgusto / comentarios.length) * 100).toFixed(2) + "%"
    document.getElementById("txtMiedo").innerHTML = ((miedo / comentarios.length) * 100).toFixed(2) + "%"
    document.getElementById("txtFelicidad").innerHTML = ((felicidad / comentarios.length) * 100).toFixed(2) + "%"
    document.getElementById("txtTristeza").innerHTML = ((tristeza / comentarios.length) * 100).toFixed(2) + "%"
}