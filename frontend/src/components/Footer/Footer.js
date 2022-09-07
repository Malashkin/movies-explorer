const Footer = () => {
  return (
    <div className="footer">
      <p className="footer__heading">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__columns">
        <p className="footer__columns-author">© 2022. Миша Малашкин</p>
        <nav className="footer__columns-links">
          <a
            href="https://practicum.yandex.ru/"
            className="footer__columns-link"
            target="_blank"
            rel="noreferrer"
          >
            Яндекс.Практикум
          </a>
          <a
            href="https://github.com/Malashkin"
            className="footer__columns-link"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
          <a
            href="https://facebook.com"
            className="footer__columns-link"
            target="_blank"
            rel="noreferrer"
          >
            Facebook
          </a>
        </nav>
      </div>
    </div>
  );
};

export default Footer;
