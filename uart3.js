
const { SerialPort, ReadlineParser }= require('serialport')
const port = new SerialPort({path:'COM3',baudRate: 9600})
const parser = port.pipe(new ReadlineParser())
const plot_1 = document.getElementById('plot_1');
const plot_2 = document.getElementById('plot_2');

const dados_temp = {
    type:'bar',
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

const dados_ox = {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            {
                tension: 0.4,
                label: 'Dados da Oxigenio',
                borderColor: 'rgba(0, 0, 255, 0.8)',
                data: [],
                fill: false
            },
            {
                tension: 0.4,
                label: 'Dados da Batimentos',
                borderColor: 'rgba(0, 255, 0, 0.8)',
                data: [],
                fill: false
            }
        ]
    }
};


const grafico_temp = new Chart(plot_1, dados_temp);
const grafico_ox   = new Chart(plot_2, dados_ox);

parser.on('data', (line) =>
{
    var dado_recebido = line.split(':');
    console.log(dado_recebido[0],dado_recebido[1]);    
    
    grafico_temp.data.labels.push(dado_recebido[0]);
    grafico_temp.data.datasets[0].data.push(dado_recebido[1]);
    grafico_temp.update();

});   

function graph_temp()
{
    if(plot_1.style.display != 'none')
    {
        plot_1.style.display = 'none';
    }else plot_1.style.display = '';
}

function graph_bat()
{
    if(plot_2.style.display != 'none')
    {
        plot_2.style.display = 'none';
    }else plot_2.style.display = '';
}
