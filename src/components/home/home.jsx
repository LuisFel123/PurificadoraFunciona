
function Home  ()  {
  // Datos de ejemplo para las gráficas
  const chartData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
    datasets: [
      {
        label: 'Órdenes',
        data: [12, 19, 3, 5, 2],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  return (
    <div className="container">
      <h1 className="mt-4 mb-4">Inicio</h1>
      
      <div className="row">
        <div className="col-md-6">
          <h2>Gráfica de Órdenes</h2>
        
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6">
          <h2>Información sobre Carros</h2>
          <div className="card">
            <div className="card-body">
             
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6">
          <h2>Lista de Conductores</h2>
          <ul className="list-group">
            <li className="list-group-item">Conductor 1</li>
            <li className="list-group-item">Conductor 2</li>
            <li className="list-group-item">Conductor 3</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
