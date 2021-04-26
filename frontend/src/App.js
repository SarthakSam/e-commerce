import { Nav } from './nav/Nav';
import { Container } from './container/Container';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.App}>
      <Nav />
      <Container />
    </div>
  );
}

export default App;
