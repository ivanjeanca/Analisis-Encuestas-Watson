async function analizarComentario(comment) {
    console.log("has de cuenta que analice: " + comment.comentario)
    let result;
    result = await $.ajax({
        headers: {
        },
        'url': 'http://localhost:3000/api/comentario',
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
    let html = '<table class="table"><tr><th>Comentario</th><th style="background-color: #eb4034;">Enojo</th><th style="background-color: #fcff5e;">Disgusto</th><th style="background-color: #c95eff;">Miedo</th><th style="background-color: #87e560;">Felicidad</th><th style="background-color: #5eafff;">Tristeza</th></tr>'
    let inicio = new Date()
    for (let i = 0; i < comentarios.length; i++) {
        html += '<tr>'
        data = {
            comentario: comentarios[i]
        }
        analizado = await analizarComentario(data)
        html += '<th>' + comentarios[i] + '</th>'
        for (let j = 0; j < analizado.length; j++) {
            switch (analizado[j].tone_name) {
                case "Anger":
                    enojo += analizado[j].score;

                    if(j == 0)
                        html += '<td style="background-color: #eb4034;">' + (analizado[j].score * 100).toFixed(2) + "%" + '</td>'
                    break;
                case "Disgust":
                    disgusto += analizado[j].score;

                    if(j == 1)
                        html += '<td style="background-color: #fcff5e;">' + (analizado[j].score * 100).toFixed(2) + "%" + '</td>'
                    break;
                case "Fear":
                    miedo += analizado[j].score;

                    if(j == 2)
                        html += '<td style="background-color: #c95eff;">' + (analizado[j].score * 100).toFixed(2) + "%" + '</td>'
                    break;
                case "Joy":
                    felicidad += analizado[j].score;

                    if(j == 3)
                        html += '<td style="background-color: #87e560;">' + (analizado[j].score * 100).toFixed(2) + "%" + '</td>'
                    break;
                case "Sadness":
                    tristeza += analizado[j].score;

                    if(j == 4)
                        html += '<td style="background-color: #5eafff;">' + (analizado[j].score * 100).toFixed(2) + "%" + '</td>'
                    break;
            }
        }
        html += '</tr>'
    }
    html += '</table>'
    let final = new Date()
    let diff = new Date(final-inicio)

    document.getElementById("tiempo").innerHTML = '<h2 class="text-center">Tiempo de análisis: ' + LeadingZero(diff.getUTCHours())+":"+LeadingZero(diff.getUTCMinutes())+":"+LeadingZero(diff.getUTCSeconds())+"."+LeadingZero(diff.getUTCMilliseconds()) + '.</h2>';
    document.getElementById("tabla-resultados").innerHTML = html
    document.getElementById("txtEnojo").innerHTML = ((enojo / comentarios.length) * 100).toFixed(2) + "%"
    document.getElementById("txtDisgusto").innerHTML = ((disgusto / comentarios.length) * 100).toFixed(2) + "%"
    document.getElementById("txtMiedo").innerHTML = ((miedo / comentarios.length) * 100).toFixed(2) + "%"
    document.getElementById("txtFelicidad").innerHTML = ((felicidad / comentarios.length) * 100).toFixed(2) + "%"
    document.getElementById("txtTristeza").innerHTML = ((tristeza / comentarios.length) * 100).toFixed(2) + "%"
}

function LeadingZero(Time) {
    return (Time < 10) ? "0" + Time : + Time;
}