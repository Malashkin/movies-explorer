import { useHistory } from "react-router-dom";

function NotFoundPage() {
  let history = useHistory();
  return (
    <div className="notfoundpage">
      <h2 className="notfoundpage__title">404</h2>
      <p className="notfoundpage__subtitle">Страница не найдена</p>
      <button onClick={history.goBack} className="notfoundpage__button">
        Назад
      </button>
    </div>
  );
}

export default NotFoundPage;
