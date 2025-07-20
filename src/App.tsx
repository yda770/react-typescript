
import Todos from './components/Todos';
import NewTodo from './components/NewTodo';
import { TodosProvider } from './store/todos-context';

function App() {

  return (
    <TodosProvider>
      <NewTodo />
      <Todos />
    </TodosProvider>
  );
}

export default App;
