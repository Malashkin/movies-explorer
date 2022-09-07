const AboutProject = () => {
  return (
    <div className="about" id="about">
      <h3 className="about__title">О проекте</h3>
      <ul className="table">
        <li className="table__cell">
          <h3 className="table__heading">
            Дипломный проект включал 5&nbsp;этапов
          </h3>
          <p className="table__text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и&nbsp;финальные доработки.
          </p>
        </li>
        <li className="table__cell">
          <h3 className="table__heading">
            На&nbsp;выполнение диплома ушло 5&nbsp;недель
          </h3>
          <p className="table__text">
            У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые
            нужно было соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <ul className="schedule">
        <li className="schedule__cell schedule__cell_theme-blue">
          <p className="schedule__text schedule__text_theme-blue">1 неделя</p>
          <p className="schedule__text schedule__description">Back-end</p>
        </li>
        <li className="schedule__cell schedule__cell_theme-grey">
          <p className="schedule__text schedule__text_theme-grey">4 недели</p>
          <p className="schedule__text schedule__description">Front-end</p>
        </li>
      </ul>
    </div>
  );
};

export default AboutProject;
