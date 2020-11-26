
// Composant non contrôlé = ce n'est pas le owner qui décide de l'affichage
const Counter0 = ({ initialValue = 0 }) => {
  const [n, setN] = useState(initialValue);
  return <button onClick={() => setN(n + 1)}>{n}</button>;
};

// Composant non contrôlé: accès à la valeur interne via un callback
const Counter1 = ({ initialValue = 0, onChange }) => {
  const [n, setN] = useState(initialValue);
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        setN(n + 1);
        onChange(n + 1);
      }}
    >
      {n}
    </button>
  );
};

// Composant contrôlé = affichage est intégralement contrôlé par le owner
const Counter2 = ({ value = 0, onClick }) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {value}
    </button>
  );
};

  /* composant non contrôlé
  const [x, setX] = useState(42);

  return (
    <>
      <Counter1
        initialValue={x}
        onChange={(value) => {
          console.log(value)
        }}
      />
      Vous avez cliqué {x} fois
    </>
  );
  */

  /*
  // composant contrôlé
  const [x, setX] = useState(42);

  return (
    <>
      <Counter2
        value={x}
        onClick={() => {
          setX(x + 1);
        }}
      />
      Vous avez cliqué {x} fois
    </>
  );
  */
