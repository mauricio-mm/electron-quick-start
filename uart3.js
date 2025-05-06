import Chart from 'chart.js';

const { SerialPort, ReadlineParser }= require('serialport')
const port = new SerialPort({path:'COM3',baudRate: 19200})
const parser = port.pipe(new ReadlineParser())

const dados_temp = {
    type:'line',
    data:
    {
        labels: [],
        datasets:
        [
        {
            tension: 0.4,
            label:'Dados da Temperatura',
            borderColor:'rgba(255,0,0,0.8)',
            data: []
        }
        ]
    }
};

const grafico_temp = new Chart(document.getElementById('plot_temp'),dados_temp);

parser.on('data', (line) =>
{
    var dado_recebido = line.split(':');
    console.log(dado_recebido[0],dado_recebido[1]);    

    grafico_temp.data.labels.push(x);
    grafico_temp.data.datasets[0].data.push(y);
    grafico_temp.update();
    


});
