const Portfolio = () => {
  return (
    <ul className="portfolio">
      <h5 className="portfolio__title">Портфолио</h5>
      <li className="portfolio__item">
        <a
          href="https://github.com/Malashkin/how-to-learn"
          className="portfolio__item-link"
          target="_blank"
          rel="noreferrer"
        >
          <p className="portfolio__item-text">Статичный сайт</p>{" "}
          <p className="portfolio__item-icon">↗</p>
        </a>
      </li>
      <li className="portfolio__item">
        <a
          href="https://github.com/Malashkin/russian-travel"
          className="portfolio__item-link"
          target="_blank"
          rel="noreferrer"
        >
          <p className="portfolio__item-text">Адаптивный сайт</p>
          <p className="portfolio__item-icon">↗</p>
        </a>
      </li>
      <li className="portfolio__item">
        <a
          href="https://github.com/Malashkin/react-mesto-api-full"
          className="portfolio__item-link"
          target="_blank"
          rel="noreferrer"
        >
          <p className="portfolio__item-text">Одностраничное приложение</p>{" "}
          <p className="portfolio__item-icon">↗</p>
        </a>
      </li>
    </ul>
  );
};

export default Portfolio;
