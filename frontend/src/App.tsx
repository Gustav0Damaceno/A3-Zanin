import DayCard from "./components/DayCard";

function App() {

  // Lista fixa dos dias da semana
  const days = [
    "domingo",
    "segunda",
    "terca",
    "quarta",
    "quinta",
    "sexta",
    "sabado"
  ];

  return (
    <>
      <h1>Dias da Semana</h1>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {days.map((dia) => (
          <DayCard key={dia} dia={dia} />
        ))}
      </div>
    </>
  );
}

export default App;
