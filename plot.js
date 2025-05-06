const dados_temp =
{
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

window.onload = function()
{
  const grafico_temp = new Chart(document.getElementById('plot_temp'),dados_temp);
  window.plot_temp = function(x,y)
  {
    grafico_temp.data.labels.push(x);
    grafico_temp.data.datasets[0].data.push(y);
    grafico_temp.update();
  }
}
