const fs = require('fs');
const { SerialPort, ReadlineParser }= require('serialport')
const port = new SerialPort({path:'COM3',baudRate: 9600})
const parser = port.pipe(new ReadlineParser())
const plot_1 = document.getElementById('plot_1');
const plot_2 = document.getElementById('plot_2');
let disp_on = [0, 0];
var save_data = true;

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

const data_max = {    
    data: {
        labels: [],
        datasets: [
            {
                type: 'line',
                tension: 0.5,
                label: 'Dados da Oxigenio',
                borderColor: 'rgba(0, 0, 255, 0.8)',
                data: [],
                fill: false
            },
            {
                type: 'bar',              
                label: 'Dados da Batimentos',
                borderColor: 'rgba(0, 255, 0, 0.8)',
                backgroundColor: 'rgba(0, 255, 0, 0.8)',
                data: [],                
            }
        ]
    }
};

const grafico_temp = new Chart(plot_1, dados_temp);
const grafico_max  = new Chart(plot_2, data_max);
   
parser.on('data', (line) =>
{
    var data = line.split(':');
    console.log(data[0], data[1], data[2], data[3]);    
    
    grafico_temp.data.labels.push(data[0]);
    grafico_temp.data.datasets[0].data.push(data[1]);    

    grafico_max.data.labels.push(data[0]);
    grafico_max.data.datasets[0].data.push(data[2]);
    grafico_max.data.datasets[1].data.push(data[3]);
        
    grafico_temp.update();
    grafico_max.update();
    
    if(save_data != false)
    {
        fs.appendFile("data.txt", `${data[0]},${data[1]},${data[2]},${data[3]}\n`, (err) => {
            if (err) console.error("Erro ao salvar os dados:", err);
        });        
    }
    

});   

function save_data()
{
    save_data != save_data;
}

function graph_temp() {
    disp_on[0] = !disp_on[0];
    plot_1.style.display = disp_on[0] ? 'block' : 'none';
}

function graph_max() {       
    disp_on[1] = !disp_on[1];
    plot_2.style.display = disp_on[1] ? 'block' : 'none';
}
