"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const TRAILER_VIDEO =
  "https://cdn.pixabay.com/video/2019/03/18/22070-325253460_large.mp4";

const CEMETERY_POSTER =
  "https://images.pexels.com/videos/7029579/cemetery-dead-death-fog-7029579.jpeg?auto=compress&cs=tinysrgb&w=1800";

type Award = "first" | "second" | "third" | "mention" | null;

type Film = {
  id: number;
  image: string;
  award: Award;
  tone: string;
};

const films: Film[] = [
  {
    id: 1,
    image:
      "https://images.pexels.com/photos/158163/clouds-cloudporn-weather-lookup-158163.jpeg?auto=compress&cs=tinysrgb&w=1000",
    award: "first",
    tone: "blue",
  },
  {
    id: 2,
    image:
      "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=1000",
    award: "second",
    tone: "red",
  },
  {
    id: 3,
    image:
      "https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg?auto=compress&cs=tinysrgb&w=1000",
    award: "third",
    tone: "forest",
  },
  {
    id: 4,
    image:
      "https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&w=1000",
    award: "mention",
    tone: "violet",
  },
  {
    id: 5,
    image: CEMETERY_POSTER,
    award: null,
    tone: "blue",
  },
  {
    id: 6,
    image:
      "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1000",
    award: null,
    tone: "red",
  },
];

const awardLabels: Record<Exclude<Award, null>, string> = {
  first: "GANADORA · PRIMER LUGAR",
  second: "GANADORA · SEGUNDO LUGAR",
  third: "GANADORA · TERCER LUGAR",
  mention: "MENCIÓN ESPECIAL",
};

const discoveryFilms: Film[] = films.map((film, index) => ({
  ...films[(index + 2) % films.length],
  id: index + 7,
  award: null,
}));

const podiumAwards: Exclude<Award, null>[] = [
  "first",
  "second",
  "third",
  "mention",
];

function PlayIcon({ filled = false }: { filled?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill={filled ? "currentColor" : "none"}>
      <path
        d="m8 5 11 7-11 7V5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowIcon({ backwards = false }: { backwards?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      className={backwards ? "arrow-backwards" : undefined}
    >
      <path
        d="m9 18 6-6-6-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none">
      <path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function FilmCard({ film, onOpen }: { film: Film; onOpen: (film: Film) => void }) {
  return (
    <article className={`film-card film-card--${film.tone}`}>
      <button
        className="film-card__cover"
        onClick={() => onOpen(film)}
        aria-label={`Ver avance de insertar título ${film.id}`}
      >
        <Image
          src={film.image}
          alt="INSERTAR IMAGEN"
          width={1000}
          height={625}
          unoptimized
        />
        <span className="film-card__shade" />
        <span className="film-card__placeholder">INSERTAR IMAGEN</span>
        <span className="film-card__play">
          <PlayIcon filled />
        </span>
        {film.award ? (
          <span className={`award award--${film.award}`}>
            <span aria-hidden="true">✦</span> {awardLabels[film.award]}
          </span>
        ) : null}
      </button>
      <div className="film-card__body">
        <div>
          <p className="film-card__number">0{film.id}</p>
          <h3>INSERTAR TÍTULO</h3>
          <p className="film-card__meta">INSERTAR TEXTO · INSERTAR TEXTO</p>
        </div>
        <button
          className="film-card__more"
          onClick={() => onOpen(film)}
          aria-label={`Abrir detalles del avance ${film.id}`}
        >
          <PlusIcon />
        </button>
      </div>
    </article>
  );
}

function TrailerModal({ film, onClose }: { film: Film; onClose: () => void }) {
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  return (
    <div className="trailer-modal" role="dialog" aria-modal="true" aria-label="Avance de muestra">
      <button className="trailer-modal__backdrop" onClick={onClose} aria-label="Cerrar avance" />
      <article className="trailer-modal__panel">
        <button className="trailer-modal__close" onClick={onClose} aria-label="Cerrar avance">
          ×
        </button>
        <video
          className="trailer-modal__video"
          src={TRAILER_VIDEO}
          poster={film.image}
          controls
          autoPlay
          playsInline
        />
        <div className="trailer-modal__content">
          {film.award ? (
            <p className={`trailer-modal__award award--${film.award}`}>
              ✦ {awardLabels[film.award]}
            </p>
          ) : null}
          <h2>INSERTAR TÍTULO</h2>
          <p>INSERTAR TEXTO</p>
          <p className="trailer-modal__meta">INSERTAR TEXTO · INSERTAR TEXTO · INSERTAR TEXTO</p>
        </div>
      </article>
    </div>
  );
}

export default function Home() {
  const [selectedFilm, setSelectedFilm] = useState<Film | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<"all" | "awarded" | "mentions">("all");
  const railRef = useRef<HTMLDivElement>(null);
  const discoveriesRef = useRef<HTMLDivElement>(null);

  const moveRail = (direction: number, rail = railRef) => {
    rail.current?.scrollBy({
      left: direction * Math.max(rail.current.clientWidth * 0.74, 320),
      behavior: "smooth",
    });
  };

  const visibleFilms = films.filter((film) => {
    if (activeFilter === "awarded") return film.award !== null;
    if (activeFilter === "mentions") return film.award === "mention";
    return true;
  });

  return (
    <main className="festival-shell">
      <header className="topbar">
        <a className="brand-lockup" href="#inicio" aria-label="CINESTRO 2026">
          <span className="brand-lockup__mark" aria-hidden="true">C</span>
          <span className="brand-lockup__name">CINESTRO</span>
          <span className="brand-lockup__year">2026</span>
        </a>

        <button
          className="mobile-menu"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span />
          <span />
        </button>

        <nav className={`topbar__navigation ${menuOpen ? "topbar__navigation--open" : ""}`}>
          <a href="#inicio" onClick={() => setMenuOpen(false)}>INICIO</a>
          <a href="#seleccion" onClick={() => setMenuOpen(false)}>PELÍCULAS</a>
          <a href="#festival" onClick={() => setMenuOpen(false)}>FESTIVAL</a>
          <a href="#palmares" onClick={() => setMenuOpen(false)}>PALMARÉS</a>
        </nav>

        <a className="topbar__cta" href="#convocatoria">CONVOCATORIA <span>↗</span></a>
      </header>

      <section className="hero" id="inicio">
        <video
          className="hero__video"
          poster={CEMETERY_POSTER}
          src={TRAILER_VIDEO}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <div className="hero__veil" />
        <div className="hero__grain" />

        <div className="hero__content">
          <p className="eyebrow"><span /> FESTIVAL DE CINE DE TERROR · 2026</p>
          <h1>
            CINE<span>STRO</span>
          </h1>
          <p className="hero__subtitle">CINE DE TERROR</p>
          <div className="hero__description">INSERTAR TEXTO</div>
          <div className="hero__actions">
            <a className="button button--primary" href="#seleccion">
              <PlayIcon filled /> VER SELECCIÓN
            </a>
            <a className="button button--ghost" href="#festival">INSERTAR TEXTO</a>
          </div>
        </div>

        <div className="hero__index"><span>01</span><span />03</div>
        <a className="hero__scroll" href="#seleccion"><span /> DESLIZA</a>
        <p className="hero__year">2026</p>
      </section>

      <section className="catalog" id="seleccion">
        <div className="section-heading">
          <div>
            <p className="eyebrow"><span /> CATÁLOGO</p>
            <h2>SELECCIÓN <span>OFICIAL</span></h2>
          </div>
          <div className="section-heading__actions">
            <span>INSERTAR TEXTO</span>
            <button onClick={() => moveRail(-1)} aria-label="Desplazar películas hacia la izquierda">
              <ArrowIcon backwards />
            </button>
            <button onClick={() => moveRail(1)} aria-label="Desplazar películas hacia la derecha">
              <ArrowIcon />
            </button>
          </div>
        </div>

        <div className="catalog-filters" role="group" aria-label="Filtrar selección oficial">
          <button
            className={activeFilter === "all" ? "catalog-filters__active" : ""}
            onClick={() => setActiveFilter("all")}
          >
            TODOS
          </button>
          <button
            className={activeFilter === "awarded" ? "catalog-filters__active" : ""}
            onClick={() => setActiveFilter("awarded")}
          >
            PREMIADAS
          </button>
          <button
            className={activeFilter === "mentions" ? "catalog-filters__active" : ""}
            onClick={() => setActiveFilter("mentions")}
          >
            MENCIONES
          </button>
        </div>

        <div className="film-rail" ref={railRef}>
          {visibleFilms.map((film) => <FilmCard key={film.id} film={film} onOpen={setSelectedFilm} />)}
        </div>
      </section>

      <section className="feature" id="festival">
        <div className="feature__glow" />
        <div className="feature__copy">
          <p className="eyebrow"><span /> EL FESTIVAL</p>
          <h2>INSERTAR<br /><span>TEXTO</span></h2>
          <p className="feature__description">INSERTAR TEXTO</p>
          <p className="feature__description">INSERTAR TEXTO</p>
          <div className="feature__details">
            <div><span>FECHA</span><strong>INSERTAR FECHA</strong></div>
            <div><span>SEDE</span><strong>INSERTAR TEXTO</strong></div>
          </div>
          <a href="#convocatoria" className="text-link">INSERTAR TEXTO <span>→</span></a>
        </div>
        <div className="feature__visual">
          <div className="feature__frame">
            <Image
              src="/cinestro-referencia.jpeg"
              alt="Imagen oficial proporcionada del festival CINESTRO 2026"
              width={1366}
              height={645}
              unoptimized
            />
            <div className="feature__frame-shade" />
          </div>
          <span className="feature__corner feature__corner--top" />
          <span className="feature__corner feature__corner--bottom" />
          <span className="feature__caption">CINESTRO · 2026</span>
        </div>
      </section>

      <section className="catalog catalog--discoveries" id="avances">
        <div className="section-heading">
          <div>
            <p className="eyebrow"><span /> INSERTAR TEXTO</p>
            <h2>AVANCES <span>2026</span></h2>
          </div>
          <div className="section-heading__actions">
            <span>INSERTAR TEXTO</span>
            <button onClick={() => moveRail(-1, discoveriesRef)} aria-label="Desplazar avances hacia la izquierda">
              <ArrowIcon backwards />
            </button>
            <button onClick={() => moveRail(1, discoveriesRef)} aria-label="Desplazar avances hacia la derecha">
              <ArrowIcon />
            </button>
          </div>
        </div>
        <div className="film-rail" ref={discoveriesRef}>
          {discoveryFilms.map((film) => <FilmCard key={film.id} film={film} onOpen={setSelectedFilm} />)}
        </div>
      </section>

      <section className="palmares" id="palmares">
        <div className="palmares__backdrop" />
        <div className="palmares__heading">
          <p className="eyebrow"><span /> DISTINCIONES</p>
          <h2>PALMARÉS <span>2026</span></h2>
          <p>INSERTAR TEXTO</p>
        </div>
        <div className="podium">
          {podiumAwards.map((award, index) => (
            <button
              className={`podium__item podium__item--${award}`}
              key={award}
              onClick={() => setSelectedFilm(films[index])}
            >
              <span className="podium__number">0{index + 1}</span>
              <span className="podium__laurels" aria-hidden="true">❧</span>
              <span className={`podium__award podium__award--${award}`}>
                {awardLabels[award]}
              </span>
              <span className="podium__title">INSERTAR TÍTULO</span>
              <span className="podium__subtitle">INSERTAR TEXTO</span>
              <span className="podium__arrow">↗</span>
            </button>
          ))}
        </div>
      </section>

      <section className="invitation" id="convocatoria">
        <div className="invitation__line" />
        <p className="eyebrow"><span /> CONVOCATORIA · 2026</p>
        <h2>INSERTAR <span>TEXTO</span></h2>
        <p>INSERTAR TEXTO</p>
        <a className="button button--primary" href="#seleccion">INSERTAR TEXTO <span>↗</span></a>
      </section>

      <footer className="footer">
        <a className="brand-lockup" href="#inicio" aria-label="Regresar al inicio de CINESTRO 2026">
          <span className="brand-lockup__mark" aria-hidden="true">C</span>
          <span className="brand-lockup__name">CINESTRO</span>
          <span className="brand-lockup__year">2026</span>
        </a>
        <span>CINE DE TERROR · 2026</span>
        <a href="#inicio">VOLVER ARRIBA ↑</a>
      </footer>

      {selectedFilm ? <TrailerModal film={selectedFilm} onClose={() => setSelectedFilm(null)} /> : null}
    </main>
  );
}
