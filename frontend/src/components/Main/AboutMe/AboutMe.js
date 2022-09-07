import studentsFoto from "../../../images/student_foto.jpg";
import Portfolio from "../Portfolio/Portfolio";

const AboutMe = () => {
  return (
    <div className="aboutme" id="student">
      <h3 className="aboutme__title">Студент</h3>
      <div className="student">
        <h2 className="student__name">Миша</h2>
        <p className="student__about">Фронтенд-разработчик, 32 года</p>
        <p className="student__description">
          Я&nbsp;родился в&nbsp;г.Тверь, закончил факультет экономики,
          проработал больше 10&nbsp;лет в&nbsp;коммерческих банках
          на&nbsp;продающих позициях. Решил изменить свою жизнь, как блогеры
          на&nbsp;Youtube рассказываю, и&nbsp;в&nbsp;начале 2021 года переехал
          жить на&nbsp;о.Тенерифе, Испания. Нужно было придумать способ
          зарабатывать деньги удалённо и&nbsp;среди массы обучений я&nbsp;выбрал
          веб-разработку, потому что был очень далёк всю жизнь
          от&nbsp;програмирования. Хотелось бросить себе серьёзный вызов,
          и&nbsp;вот теперь вы&nbsp;видете созданный мной многостраничный сайт
          перед своими глазами! И это я только начинаю)
        </p>
        <img
          src={studentsFoto}
          className="student__image"
          alt="Фото студента"
        ></img>
        <nav className="student__nav">
          <a
            className="student__nav-link"
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
          >
            Facebook
          </a>
          <a
            className="student__nav-link"
            href="https://github.com/Malashkin"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </nav>
      </div>
      <Portfolio />
    </div>
  );
};

export default AboutMe;
