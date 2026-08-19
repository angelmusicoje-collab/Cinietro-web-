"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const TRAILER_VIDEO =
  "https://cdn.pixabay.com/video/2019/03/18/22070-325253460_large.mp4";

const CEMETERY_POSTER =
  "https://images.pexels.com/videos/7029579/cemetery-dead-death-fog-7029579.jpeg?auto=compress&cs=tinysrgb&w=1800";

type Award = "first" | "second" | "third" | "mention" | null;
type FestivalPhase = "prelaunch" | "submissions" | "results";

// Cambiar a "submissions" al publicar los cortos y a "results" al anunciar el palmarés.
const festival: { phase: FestivalPhase } = {
  phase: "prelaunch",
};

const hasPublishedSubmissions = festival.phase !== "prelaunch";
const hasPublishedResults = festival.phase === "results";

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
      "https://images.pexels.com/photos/158163/clouds-cloudporn-weather-lookup-158163.jpeg?auto=compress&cs=tinysrgb&w=720",
    award: null,
    tone: "blue",
  },
  {
    id: 2,
    image:
      "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=720",
    award: null,
    tone: "red",
  },
  {
    id: 3,
    image:
      "https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg?auto=compress&cs=tinysrgb&w=720",
    award: null,
    tone: "forest",
  },
  {
    id: 4,
    image:
      "https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&w=720",
    award: null,
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
      "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=720",
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

const awardCategoryLabels: Record<Exclude<Award, null>, string> = {
  first: "PRIMER LUGAR",
  second: "SEGUNDO LUGAR",
  third: "TERCER LUGAR",
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

function ThumbIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none">
      <path
        d="M7 10v10H4V10h3Zm0 10h9.2a2 2 0 0 0 1.96-1.6l1.2-6A2 2 0 0 0 17.4 10H13V6.6a2.1 2.1 0 0 0-1.8-2.08L7 10"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DownIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none">
      <path
        d="m6 9 6 6 6-6"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none">
      <path
        d="m3.5 10 8.5-7 8.5 7v9.5h-6v-6h-5v6h-6V10Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FilmsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none">
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="m10 9 5 3-5 3V9Z" fill="currentColor" />
    </svg>
  );
}

function FestivalIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none">
      <path
        d="M4 8.5h16v11H4v-11Zm0 0 2-4h15l-2 4M9 4.5 7 8.5m7-4-2 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TrophyIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none">
      <path
        d="M7 4h10v5a5 5 0 0 1-10 0V4Zm0 2H4v2a4 4 0 0 0 4 4m9-6h3v2a4 4 0 0 1-4 4m-4 2v4m-4 2h8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FilmCard({ film, onOpen }: { film: Film; onOpen: (film: Film) => void }) {
  const [previewing, setPreviewing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [liked, setLiked] = useState(false);
  const previewTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startPreview = () => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (previewTimer.current) clearTimeout(previewTimer.current);
    previewTimer.current = setTimeout(() => setPreviewing(true), 260);
  };

  const stopPreview = () => {
    if (previewTimer.current) clearTimeout(previewTimer.current);
    setPreviewing(false);
  };

  useEffect(() => () => {
    if (previewTimer.current) clearTimeout(previewTimer.current);
  }, []);

  return (
    <article
      className={`film-card film-card--${film.tone}`}
      onMouseEnter={startPreview}
      onMouseLeave={stopPreview}
      onFocusCapture={startPreview}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) stopPreview();
      }}
    >
      <div className={`film-card__shell ${previewing ? "film-card__shell--previewing" : ""}`}>
        <button
          className="film-card__cover"
          onClick={() => onOpen(film)}
          aria-label={`Ver avance de insertar título ${film.id}`}
        >
          <Image
            src={film.image}
            alt="INSERTAR IMAGEN"
            width={1000}
            height={563}
            sizes="(max-width: 760px) 54vw, 19vw"
            decoding="async"
            unoptimized
          />
          {previewing ? (
            <video
              className="film-card__preview"
              src={TRAILER_VIDEO}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
            />
          ) : null}
          <span className="film-card__shade" />
          <span className="film-card__brand" aria-hidden="true">C</span>
          {!hasPublishedSubmissions ? (
            <span className="film-card__placeholder">INSERTAR TRÁILER</span>
          ) : null}
          <span className="film-card__poster-title">INSERTAR TÍTULO</span>
          {hasPublishedResults && film.award ? (
            <span className={`award award--${film.award}`}>
              <span aria-hidden="true">✦</span> {awardLabels[film.award]}
            </span>
          ) : null}
        </button>

        <div className="film-card__body">
          <div className="film-card__controls">
            <button
              className="film-card__control film-card__control--play"
              onClick={() => onOpen(film)}
              aria-label={`Reproducir avance ${film.id}`}
            >
              <PlayIcon filled />
            </button>
            <button
              className={`film-card__control ${saved ? "film-card__control--active" : ""}`}
              onClick={() => setSaved((current) => !current)}
              aria-label={saved ? "Quitar de mi lista" : "Añadir a mi lista"}
              aria-pressed={saved}
            >
              <PlusIcon />
            </button>
            <button
              className={`film-card__control ${liked ? "film-card__control--active" : ""}`}
              onClick={() => setLiked((current) => !current)}
              aria-label={liked ? "Quitar valoración" : "Marcar como me gusta"}
              aria-pressed={liked}
            >
              <ThumbIcon />
            </button>
            <button
              className="film-card__control film-card__control--details"
              onClick={() => onOpen(film)}
              aria-label={`Ver detalles del avance ${film.id}`}
            >
              <DownIcon />
            </button>
          </div>
          <h3>INSERTAR TÍTULO</h3>
          <div className="film-card__facts">
            <span>INSERTAR TEXTO</span>
            <span>INSERTAR TEXTO</span>
          </div>
          <p className="film-card__meta">INSERTAR TEXTO <i /> INSERTAR TEXTO</p>
        </div>
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
          preload="metadata"
        />
        <div className="trailer-modal__content">
          {hasPublishedResults && film.award ? (
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
  const [activeSection, setActiveSection] = useState("inicio");
  const [activeFilter, setActiveFilter] = useState<"all" | "awarded" | "mentions">("all");
  const railRef = useRef<HTMLDivElement>(null);
  const discoveriesRef = useRef<HTMLDivElement>(null);
  const awardsRailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sectionIds = ["inicio", "seleccion", "festival", "palmares"];
    let animationFrame = 0;

    const updateActiveSection = () => {
      animationFrame = 0;
      const threshold = window.innerHeight * 0.42;
      let currentSection = "inicio";

      sectionIds.forEach((sectionId) => {
        const section = document.getElementById(sectionId);
        if (section && section.getBoundingClientRect().top <= threshold) {
          currentSection = sectionId;
        }
      });

      setActiveSection(currentSection);
    };

    const handleScroll = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

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
  const awardedFilms = films.filter((film) => film.award !== null);
  const hasAwardedFilms = hasPublishedResults && awardedFilms.length > 0;

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
          preload="metadata"
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
            <a
              className="button button--primary"
              href={hasPublishedSubmissions ? "#seleccion" : "#convocatoria"}
            >
              <PlayIcon filled /> {hasPublishedSubmissions ? "VER SELECCIÓN" : "VER CONVOCATORIA"}
            </a>
            <a className="button button--ghost" href="#festival">INSERTAR TEXTO</a>
          </div>
        </div>

        <div className="hero__index"><span>01</span><span />03</div>
        <a className="hero__scroll" href="#seleccion"><span /> DESLIZA</a>
        <p className="hero__year">2026</p>
      </section>

      <div className="streaming-shelf">
        <section className="catalog catalog--primary" id="seleccion">
          <div className="section-heading section-heading--primary">
            <h2>{hasPublishedSubmissions ? "Selección oficial" : "Próximos cortometrajes"}</h2>
            {hasAwardedFilms ? (
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
            ) : !hasPublishedSubmissions ? (
              <p className="catalog-status"><span aria-hidden="true" /> PRÓXIMAMENTE</p>
            ) : null}
          </div>

          <div className="film-rail-wrap">
            <div className="film-rail" ref={railRef}>
              {visibleFilms.map((film) => <FilmCard key={film.id} film={film} onOpen={setSelectedFilm} />)}
            </div>
            <button
              className="rail-arrow rail-arrow--left"
              onClick={() => moveRail(-1)}
              aria-label="Desplazar películas hacia la izquierda"
            >
              <ArrowIcon backwards />
            </button>
            <button
              className="rail-arrow rail-arrow--right"
              onClick={() => moveRail(1)}
              aria-label="Desplazar películas hacia la derecha"
            >
              <ArrowIcon />
            </button>
          </div>
        </section>

        <section className="catalog catalog--discoveries" id="avances">
          <div className="section-heading">
            <h2>{hasPublishedSubmissions ? "Avances 2026" : "Tráileres por recibir"}</h2>
          </div>
          <div className="film-rail-wrap">
            <div className="film-rail" ref={discoveriesRef}>
              {discoveryFilms.map((film) => <FilmCard key={film.id} film={film} onOpen={setSelectedFilm} />)}
            </div>
            <button
              className="rail-arrow rail-arrow--left"
              onClick={() => moveRail(-1, discoveriesRef)}
              aria-label="Desplazar avances hacia la izquierda"
            >
              <ArrowIcon backwards />
            </button>
            <button
              className="rail-arrow rail-arrow--right"
              onClick={() => moveRail(1, discoveriesRef)}
              aria-label="Desplazar avances hacia la derecha"
            >
              <ArrowIcon />
            </button>
          </div>
        </section>

        {hasAwardedFilms ? (
          <section className="catalog catalog--awards" id="destacadas">
            <div className="section-heading">
              <h2>Ganadoras y menciones</h2>
            </div>
            <div className="film-rail-wrap">
              <div className="film-rail" ref={awardsRailRef}>
                {awardedFilms.map((film) => (
                  <FilmCard key={film.id} film={film} onOpen={setSelectedFilm} />
                ))}
              </div>
              <button
                className="rail-arrow rail-arrow--left"
                onClick={() => moveRail(-1, awardsRailRef)}
                aria-label="Desplazar ganadoras hacia la izquierda"
              >
                <ArrowIcon backwards />
              </button>
              <button
                className="rail-arrow rail-arrow--right"
                onClick={() => moveRail(1, awardsRailRef)}
                aria-label="Desplazar ganadoras hacia la derecha"
              >
                <ArrowIcon />
              </button>
            </div>
          </section>
        ) : null}
      </div>

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

      <section className="palmares" id="palmares">
        <div className="palmares__backdrop" />
        <div className="palmares__heading">
          <p className="eyebrow"><span /> DISTINCIONES</p>
          <h2>PALMARÉS <span>2026</span></h2>
          <p>{hasAwardedFilms ? "INSERTAR TEXTO" : "RESULTADOS POR ANUNCIAR"}</p>
        </div>
        <div className="podium">
          {podiumAwards.map((award, index) => {
            const awardedFilm = hasPublishedResults
              ? films.find((film) => film.award === award)
              : undefined;

            return (
              <button
                className={`podium__item podium__item--${award}`}
                key={award}
                onClick={() => {
                  if (awardedFilm) setSelectedFilm(awardedFilm);
                }}
                disabled={!awardedFilm}
                aria-label={`${awardCategoryLabels[award]}: ${awardedFilm ? "INSERTAR TÍTULO" : "por anunciar"}`}
              >
                <span className="podium__number">0{index + 1}</span>
                <span className="podium__laurels" aria-hidden="true">❧</span>
                <span className={`podium__award podium__award--${award}`}>
                  {awardedFilm ? awardLabels[award] : awardCategoryLabels[award]}
                </span>
                <span className={`podium__title ${awardedFilm ? "" : "podium__title--pending"}`}>
                  {awardedFilm ? "INSERTAR TÍTULO" : "POR ANUNCIAR"}
                </span>
                <span className="podium__subtitle">
                  {awardedFilm ? "INSERTAR TEXTO" : "RESULTADO PENDIENTE"}
                </span>
                {awardedFilm ? <span className="podium__arrow">↗</span> : null}
              </button>
            );
          })}
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

      <nav className="mobile-dock" aria-label="Navegación móvil">
        <a
          href="#inicio"
          className={activeSection === "inicio" ? "mobile-dock__active" : ""}
          aria-current={activeSection === "inicio" ? "page" : undefined}
        >
          <HomeIcon />
          <span>Inicio</span>
        </a>
        <a
          href="#seleccion"
          className={activeSection === "seleccion" ? "mobile-dock__active" : ""}
          aria-current={activeSection === "seleccion" ? "page" : undefined}
        >
          <FilmsIcon />
          <span>Películas</span>
        </a>
        <a
          href="#festival"
          className={activeSection === "festival" ? "mobile-dock__active" : ""}
          aria-current={activeSection === "festival" ? "page" : undefined}
        >
          <FestivalIcon />
          <span>Festival</span>
        </a>
        <a
          href="#palmares"
          className={activeSection === "palmares" ? "mobile-dock__active" : ""}
          aria-current={activeSection === "palmares" ? "page" : undefined}
        >
          <TrophyIcon />
          <span>Premios</span>
        </a>
      </nav>

      {selectedFilm ? <TrailerModal film={selectedFilm} onClose={() => setSelectedFilm(null)} /> : null}
    </main>
  );
}
