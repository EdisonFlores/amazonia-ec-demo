import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createPortal } from 'react-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import amazoniaBanner from '../assets/amazonia-banner.png';
import casaElVergel from '../assets/casa-el-vergel.png';
import {
  ArrowLeft, ArrowRight, Bath, BedDouble, Bot, Building2, Camera, Check,
  ChevronDown, ChevronLeft, ChevronRight, CircleDollarSign, FileCheck2,
  Heart, Languages, LandPlot, MapPin, Menu, MessageCircle, Mic, Phone,
  Maximize2, Moon, Pause, Play, Rotate3D, RotateCcw, Ruler, Search, ShieldCheck,
  SlidersHorizontal, Sparkles, Sun, Trees, Volume2, VolumeX, X,
} from 'lucide-react';
import './styles.css';

const BASE_URL = import.meta.env.BASE_URL;
const images = { 'amazonia-banner.png': amazoniaBanner, 'casa-el-vergel.png': casaElVergel };
const asset = (name) => images[name];
const pageUrl = (path = '/') => `${BASE_URL}${path.replace(/^\//, '')}`;
const currentPage = () => {
  const relative = window.location.pathname.startsWith(BASE_URL)
    ? window.location.pathname.slice(BASE_URL.length)
    : window.location.pathname.replace(/^\//, '');
  return `/${relative}`.replace(/\/+$/, '') || '/';
};

const copy = {
  es: {
    nav: { home: 'Inicio', about: 'Nosotros', properties: 'Propiedades', success: 'Casos de éxito', sell: 'Vende con nosotros', contact: 'Contáctanos' },
    heroKicker: 'Propiedades con propósito', heroTitle: <>Tu próximo legado comienza <em>en la Amazonía.</em></>,
    heroText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean lacinia bibendum nulla sed consectetur vitae elit libero.',
    explore: 'Explorar propiedades', story: 'Conoce nuestra historia', families: 'Familias felices', years: 'Creando legado',
    aboutKicker: 'Nuestra esencia', aboutTitle: <>Más que propiedades,<br/><em>un legado para tu familia.</em></>,
    aboutLead: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum.',
    aboutText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed odio dui. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.',
    legal: 'Seguridad jurídica', earth: 'Conexión con la tierra', discover: 'Descubre nuestros espacios',
    propKicker: 'Encuentra tu lugar', propTitle: <>Propiedades para <em>nuevos comienzos</em></>, propIntro: 'Explora nuestra selección de casas y terrenos en Morona Santiago.',
    search: 'Buscar por nombre o ubicación', all: 'Todas', house: 'Casa', land: 'Terreno', results: 'propiedades encontradas', from: 'Desde', details: 'Ver propiedad', advisor: 'Contactar un asesor',
    detailBack: 'Volver a propiedades', reference: 'Precio referencial', surface: 'Superficie', bedrooms: 'Dormitorios', bathrooms: 'Baños', documentation: 'Documentación', inOrder: 'En regla',
    description: 'Descripción', features: 'Características', location: 'Ubicación de la propiedad', mapNote: 'El polígono representa el área referencial de la propiedad.',
    gallery: 'Galería multimedia', image: 'Imagen', video: 'Video', available: 'Disponible',
    successKicker: 'Historias reales', successTitle: <>Decisiones que se convierten en <em>nuevos comienzos</em></>,
    successIntro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Conoce las propiedades vendidas y el proceso que acompañamos junto a cada familia.', sold: 'Vendida', soldProperties: 'Propiedades vendidas', viewProcess: 'Ver proceso de venta', salesProcess: 'Proceso de venta', saleCompleted: 'Venta completada', processGallery: 'Galería del proceso',
    visit: 'Visita al terreno', review: 'Revisión documental', notary: 'Firma en notaría', delivery: 'Entrega de la propiedad',
    sellKicker: 'Vende con nosotros', sellTitle: <>Tu propiedad merece<br/><em>la mejor oportunidad.</em></>,
    sellText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nuestro equipo te acompaña desde la valoración hasta la firma.',
    valuation: 'Valoración profesional y transparente', promotion: 'Fotografía y promoción estratégica', support: 'Acompañamiento legal de principio a fin', sellCta: 'Quiero vender mi propiedad',
    contactTitle: 'Hablemos de tu próximo proyecto.', whatsapp: 'Escríbenos por WhatsApp',
    chatTitle: 'Amazonia Propiedades EC', chatStatus: 'Demo · Respuestas estáticas', chatHello: '¡Hola! ¿Qué tipo de propiedad estás buscando?', chatHint: 'Los filtros automáticos se activarán en la versión final.', chatPlaceholder: 'Escribe tu consulta...', voice: 'Lectura por voz', voiceHint: 'Actívala y mueve el cursor sobre el contenido.', voiceOn: 'Lectura activada', voiceOff: 'Lectura desactivada', light: 'Modo claro', dark: 'Modo oscuro', expand: 'Ampliar imagen', virtualTour: 'Galería de imágenes 360°', dragTour: 'Arrastra para explorar la imagen en 360°', close: 'Cerrar', filters: 'Filtros', propertyType: 'Tipo de propiedad', lot: 'Lote', farm: 'Finca', size: 'Tamaño', minimum: 'Mínimo', maximum: 'Máximo', province: 'Provincia', canton: 'Cantón', parish: 'Parroquia', any: 'Todas', clearFilters: 'Limpiar filtros', applyFilters: 'Aplicar filtros', noResults: 'No encontramos propiedades con estos filtros.',
  },
  en: {
    nav: { home: 'Home', about: 'About us', properties: 'Properties', success: 'Success stories', sell: 'Sell with us', contact: 'Contact us' },
    heroKicker: 'Properties with purpose', heroTitle: <>Your next legacy begins <em>in the Amazon.</em></>,
    heroText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean lacinia bibendum nulla sed consectetur vitae elit libero.',
    explore: 'Explore properties', story: 'Discover our story', families: 'Happy families', years: 'Building legacies',
    aboutKicker: 'Our essence', aboutTitle: <>More than properties,<br/><em>a legacy for your family.</em></>,
    aboutLead: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum.',
    aboutText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed odio dui. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.',
    legal: 'Legal certainty', earth: 'Connection to the land', discover: 'Discover our spaces',
    propKicker: 'Find your place', propTitle: <>Properties for <em>new beginnings</em></>, propIntro: 'Explore our selection of homes and land in Morona Santiago.',
    search: 'Search by name or location', all: 'All', house: 'House', land: 'Land', results: 'properties found', from: 'From', details: 'View property', advisor: 'Contact an advisor',
    detailBack: 'Back to properties', reference: 'Reference price', surface: 'Area', bedrooms: 'Bedrooms', bathrooms: 'Bathrooms', documentation: 'Documentation', inOrder: 'Verified',
    description: 'Description', features: 'Features', location: 'Property location', mapNote: 'The polygon represents the approximate property area.',
    gallery: 'Media gallery', image: 'Image', video: 'Video', available: 'Available',
    successKicker: 'Real stories', successTitle: <>Decisions that become <em>new beginnings</em></>,
    successIntro: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Discover the properties sold and the journey we shared with each family.', sold: 'Sold', soldProperties: 'Sold properties', viewProcess: 'View sale process', salesProcess: 'Sale process', saleCompleted: 'Sale completed', processGallery: 'Process gallery',
    visit: 'Property visit', review: 'Document review', notary: 'Notary signing', delivery: 'Property handover',
    sellKicker: 'Sell with us', sellTitle: <>Your property deserves<br/><em>the best opportunity.</em></>,
    sellText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Our team supports you from valuation through signing.',
    valuation: 'Professional and transparent valuation', promotion: 'Strategic photography and promotion', support: 'End-to-end legal guidance', sellCta: 'I want to sell my property',
    contactTitle: 'Let’s talk about your next project.', whatsapp: 'Message us on WhatsApp',
    chatTitle: 'Amazonia Propiedades EC', chatStatus: 'Demo · Static responses', chatHello: 'Hello! What kind of property are you looking for?', chatHint: 'Automatic filters will be enabled in the final version.', chatPlaceholder: 'Type your question...', voice: 'Voice reading', voiceHint: 'Enable it and move the cursor over the content.', voiceOn: 'Reading enabled', voiceOff: 'Reading disabled', light: 'Light mode', dark: 'Dark mode', expand: 'Expand image', virtualTour: '360° image gallery', dragTour: 'Drag to explore the image in 360°', close: 'Close', filters: 'Filters', propertyType: 'Property type', lot: 'Lot', farm: 'Farm', size: 'Size', minimum: 'Minimum', maximum: 'Maximum', province: 'Province', canton: 'County', parish: 'Parish', any: 'All', clearFilters: 'Clear filters', applyFilters: 'Apply filters', noResults: 'No properties match these filters.',
  },
};

const properties = [
  { id: 1, type: 'Casa', badge: 'Destacada', title: 'Casa familiar en El Vergel', titleEn: 'Family home in El Vergel', location: 'Macas · Morona Santiago', province: 'Morona Santiago', canton: 'Morona', parish: 'Macas', price: '$ 78.000', area: '320 m²', areaValue: 320, beds: '3', baths: '2', image: asset('casa-el-vergel.png'), position: 'center 48%' },
  { id: 2, type: 'Terreno', badge: 'Nuevo', title: 'Terreno con entorno natural', titleEn: 'Land with natural surroundings', location: 'Proaño · Morona Santiago', province: 'Morona Santiago', canton: 'Morona', parish: 'Proaño', price: '$ 32.500', area: '1.250 m²', areaValue: 1250, image: asset('amazonia-banner.png'), position: 'left center' },
  { id: 3, type: 'Lote', badge: 'Oportunidad', title: 'Lote urbano con acceso vial', titleEn: 'Urban lot with road access', location: 'Macas · Sector urbano', province: 'Morona Santiago', canton: 'Morona', parish: 'Macas', price: '$ 24.900', area: '280 m²', areaValue: 280, image: asset('casa-el-vergel.png'), position: 'center 62%' },
  { id: 4, type: 'Finca', badge: 'Exclusiva', title: 'Finca junto al paisaje amazónico', titleEn: 'Farm by the Amazon landscape', location: 'Huambi · Morona Santiago', province: 'Morona Santiago', canton: 'Sucúa', parish: 'Huambi', price: '$ 85.000', area: '2.100 m²', areaValue: 2100, image: asset('amazonia-banner.png'), position: 'right center' },
  { id: 5, type: 'Terreno', badge: 'Nuevo', title: 'Terreno natural cerca de Puyo', titleEn: 'Natural land near Puyo', location: 'Puyo · Pastaza', province: 'Pastaza', canton: 'Pastaza', parish: 'Puyo', price: '$ 39.500', area: '980 m²', areaValue: 980, image: asset('amazonia-banner.png'), position: 'center center' },
  { id: 6, type: 'Lote', badge: 'Disponible', title: 'Lote residencial en Shell', titleEn: 'Residential lot in Shell', location: 'Shell · Pastaza', province: 'Pastaza', canton: 'Mera', parish: 'Shell', price: '$ 19.800', area: '450 m²', areaValue: 450, image: asset('casa-el-vergel.png'), position: 'center 68%' },
];

const propertyMedia = [
  { type: 'image', src: asset('casa-el-vergel.png'), position: 'center 48%' },
  { type: 'image', src: asset('casa-el-vergel.png'), position: 'center 72%' },
  { type: 'video', src: asset('casa-el-vergel.png'), position: 'center 58%' },
  { type: 'image', src: asset('amazonia-banner.png'), position: 'left center' },
];

const soldCases = [
  { id: 1, title: 'Casa familiar en El Vergel', titleEn: 'Family home in El Vergel', location: 'Macas · Morona Santiago', area: '320 m²', date: 'Marzo 2026', image: asset('casa-el-vergel.png'), position: 'center 48%', client: 'Familia Andrade' },
  { id: 2, title: 'Terreno natural en Proaño', titleEn: 'Natural land in Proaño', location: 'Proaño · Morona Santiago', area: '1.250 m²', date: 'Enero 2026', image: asset('amazonia-banner.png'), position: 'left center', client: 'Familia López' },
  { id: 3, title: 'Lote residencial en Macas', titleEn: 'Residential lot in Macas', location: 'Macas · Morona Santiago', area: '450 m²', date: 'Noviembre 2025', image: asset('casa-el-vergel.png'), position: 'center 68%', client: 'Familia Cárdenas' },
];

function useLanguage() {
  const [lang, setLang] = useState(() => localStorage.getItem('amazonia-language') || 'es');
  const toggle = () => setLang((current) => {
    const next = current === 'es' ? 'en' : 'es';
    localStorage.setItem('amazonia-language', next);
    return next;
  });
  return { lang, toggle, t: copy[lang] };
}

function Brand() {
  return <a className="brand" href={pageUrl('/')} aria-label="Amazonia Propiedades EC"><span className="brand-mark"><Trees size={22}/></span><span className="brand-wordmark"><strong>Amazonia</strong><small>Propiedades <em>EC</em></small></span></a>;
}

function Header({ t, lang, toggle, theme, toggleTheme }) {
  const [open, setOpen] = useState(false);
  const path = currentPage();
  const links = [[t.nav.home, '/'], [t.nav.about, '/#nosotros'], [t.nav.properties, '/propiedades'], [t.nav.success, '/casos-de-exito'], [t.nav.sell, '/vende-con-nosotros']];
  return <>
    <header className="site-header"><div className="container nav-wrap"><Brand/><nav className="desktop-nav">{links.map(([label, href]) => <a className={path === href.split('#')[0] ? 'active' : ''} href={pageUrl(href)} key={href}>{label}</a>)}</nav><button className="theme-toggle" onClick={toggleTheme} aria-label={theme === 'light' ? t.dark : t.light} title={theme === 'light' ? t.dark : t.light}>{theme === 'light' ? <Moon size={16}/> : <Sun size={16}/>}</button><button className="language-toggle" onClick={toggle} aria-label="Cambiar idioma"><Languages size={16}/><span>{lang === 'es' ? 'EN' : 'ES'}</span></button><a className="button button-small desktop-contact" href="https://wa.me/593000000000">{t.nav.contact}<ArrowRight size={16}/></a><button className="menu-button" onClick={() => setOpen(true)} aria-label="Abrir menú"><Menu/></button></div></header>
    {open && <div className="mobile-drawer"><div className="drawer-top"><Brand/><button onClick={() => setOpen(false)}><X/></button></div><nav>{links.map(([label, href]) => <a href={pageUrl(href)} key={href}>{label}<ArrowRight size={18}/></a>)}</nav><div className="drawer-preferences"><button className="language-toggle mobile-language" onClick={toggle}><Languages/>{lang === 'es' ? 'English' : 'Español'}</button><button className="language-toggle mobile-language" onClick={toggleTheme}>{theme === 'light' ? <Moon/> : <Sun/>}{theme === 'light' ? t.dark : t.light}</button></div></div>}
  </>;
}

function Footer({ t }) {
  return <footer><div className="container footer-main"><div className="footer-brand"><Brand/><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Una nueva forma de encontrar tu lugar.</p></div><div><strong>{t.nav.home}</strong><a href={pageUrl('/#nosotros')}>{t.nav.about}</a><a href={pageUrl('/propiedades')}>{t.nav.properties}</a></div><div><strong>{t.nav.success}</strong><a href={pageUrl('/casos-de-exito')}>{t.nav.success}</a><a href={pageUrl('/vende-con-nosotros')}>{t.nav.sell}</a></div><div><strong>Amazonia Propiedades EC</strong><span><MapPin size={16}/> Macas, Morona Santiago</span><span><Phone size={16}/> +593 000 000 000</span></div></div><div className="container footer-bottom"><span>© 2026 Amazonia Propiedades EC · Demo conceptual</span><span>Más que propiedades, un legado.</span></div></footer>;
}

function Assistants({ t, lang }) {
  const [chatOpen, setChatOpen] = useState(false);
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [voiceActive, setVoiceActive] = useState(false);

  useEffect(() => {
    if (!voiceActive || !('speechSynthesis' in window)) return;
    let timer;
    let lastText = '';
    const speakElement = (event) => {
      const target = event.target.closest('a, button, h1, h2, h3, p, li, label, blockquote, .property-card, .feature-list > span');
      if (!target || target.closest('.chat-panel, .voice-popover, .chat-float, .voice-float')) return;
      const text = (target.getAttribute('aria-label') || target.innerText || target.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 260);
      if (!text || text === lastText) return;
      clearTimeout(timer);
      timer = setTimeout(() => {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang === 'es' ? 'es-EC' : 'en-US';
        utterance.rate = .92;
        utterance.pitch = 1;
        window.speechSynthesis.speak(utterance);
        lastText = text;
      }, 320);
    };
    document.addEventListener('mouseover', speakElement);
    document.addEventListener('focusin', speakElement);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseover', speakElement);
      document.removeEventListener('focusin', speakElement);
      window.speechSynthesis.cancel();
    };
  }, [voiceActive, lang]);

  const toggleVoice = () => {
    setVoiceOpen(true);
    setVoiceActive((current) => {
      if (current) window.speechSynthesis?.cancel();
      return !current;
    });
  };
  return <>
    {voiceOpen && <div className={`voice-popover ${voiceActive ? 'is-listening' : ''}`}><button onClick={() => { setVoiceOpen(false); setVoiceActive(false); }}><X size={16}/></button><span className="voice-orb">{voiceActive ? <Volume2/> : <VolumeX/>}</span><strong>{t.voice}</strong><p>{t.voiceHint}</p><b>{voiceActive ? t.voiceOn : t.voiceOff}</b><div className="voice-waves"><i/><i/><i/><i/><i/></div></div>}
    <button className={`voice-float ${voiceActive ? 'active' : ''}`} onClick={toggleVoice} aria-label={voiceActive ? t.voiceOff : t.voice}>{voiceActive ? <Volume2/> : <Mic/>}</button>
    {chatOpen && <aside className="chat-panel"><div className="chat-head"><span><Bot/></span><div><strong>{t.chatTitle}</strong><small>{t.chatStatus}</small></div><button onClick={() => setChatOpen(false)}><X/></button></div><div className="chat-body"><div className="bot-message">{t.chatHello}</div><div className="chat-chips"><span>{t.house}</span><span>{t.land}</span><span>Macas</span></div><p>{t.chatHint}</p></div><div className="chat-input"><input placeholder={t.chatPlaceholder} disabled/><button disabled><ArrowRight/></button></div></aside>}
    <button className="chat-float" onClick={() => setChatOpen(!chatOpen)} aria-label={t.chatTitle}><MessageCircle/></button>
  </>;
}

function PageShell({ children, language }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('amazonia-theme') || 'light');
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('amazonia-theme', theme);
  }, [theme]);
  const toggleTheme = () => setTheme((current) => current === 'light' ? 'dark' : 'light');
  return <><Header {...language} theme={theme} toggleTheme={toggleTheme}/><main>{children}</main><Footer t={language.t}/><Assistants t={language.t} lang={language.lang}/></>;
}

function HomePage({ t }) {
  return <>
    <section className="hero home-hero"><div className="hero-glow"/><div className="container hero-content"><div className="hero-copy"><span className="eyebrow"><span/>{t.heroKicker}</span><h1>{t.heroTitle}</h1><p>{t.heroText}</p><div className="hero-actions"><a className="button button-gold" href={pageUrl('/propiedades')}>{t.explore}<ArrowRight size={18}/></a><a className="text-link" href="#nosotros"><span className="play"><Play size={15} fill="currentColor"/></span>{t.story}</a></div><div className="hero-proof"><div><strong>+120</strong><span>{t.families}</span></div><i/><div><strong>8 años</strong><span>{t.years}</span></div></div></div><div className="hero-visual"><div className="hero-image-frame"><img src={asset('amazonia-banner.png')} alt="Amazonia Propiedades EC"/></div><div className="floating-card"><span><ShieldCheck/></span><div><strong>{t.legal}</strong><small>Lorem ipsum dolor</small></div><Check/></div></div></div></section>
    <section className="home-links"><div className="container home-link-grid"><a href={pageUrl('/propiedades')}><LandPlot/><span><small>01</small><strong>{t.nav.properties}</strong></span><ArrowRight/></a><a href={pageUrl('/casos-de-exito')}><Sparkles/><span><small>02</small><strong>{t.nav.success}</strong></span><ArrowRight/></a><a href={pageUrl('/vende-con-nosotros')}><CircleDollarSign/><span><small>03</small><strong>{t.nav.sell}</strong></span><ArrowRight/></a></div></section>
    <section id="nosotros" className="section about-section"><div className="container about-grid"><div className="about-collage"><div className="about-main"><img src={asset('casa-el-vergel.png')} alt="Propiedad en Macas"/></div><div className="about-small"><img src={asset('amazonia-banner.png')} alt="Morona Santiago"/></div><div className="experience-seal"><strong>8</strong><span>Años de<br/>experiencia</span></div></div><div className="about-copy"><span className="eyebrow dark"><span/>{t.aboutKicker}</span><h2>{t.aboutTitle}</h2><p className="lead">{t.aboutLead}</p><p>{t.aboutText}</p><div className="values"><div><span><ShieldCheck/></span><div><strong>{t.legal}</strong><small>Lorem ipsum dolor sit amet.</small></div></div><div><span><Trees/></span><div><strong>{t.earth}</strong><small>Lorem ipsum dolor sit amet.</small></div></div></div><a className="inline-link" href={pageUrl('/propiedades')}>{t.discover}<ArrowRight/></a></div></div></section>
    <ContactStrip t={t}/>
  </>;
}

function InnerHero({ kicker, title, text }) {
  return <section className="inner-hero"><div className="container"><span className="eyebrow"><span/>{kicker}</span><h1>{title}</h1><p>{text}</p></div></section>;
}

function VirtualTour({ property, t, compact = false }) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState(50);
  const [playing, setPlaying] = useState(true);
  const [scene, setScene] = useState(0);
  const drag = useRef(null);
  const player = useRef(null);
  const fullscreenTour = useRef(false);
  const scenes = [
    { src: property.image, label: 'Vista principal' },
    { src: asset('casa-el-vergel.png'), label: 'Exterior' },
    { src: asset('amazonia-banner.png'), label: 'Entorno' },
  ];
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const handleKey = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        drag.current = null;
        setPlaying(false);
        setOpen(false);
      }
      if (event.key === 'ArrowLeft') setPosition(value => Math.max(0, value - 4));
      if (event.key === 'ArrowRight') setPosition(value => Math.min(100, value + 4));
      if (event.code === 'Space') { event.preventDefault(); setPlaying(value => !value); }
    };
    document.addEventListener('keydown', handleKey, true);
    return () => { document.body.style.overflow = ''; document.removeEventListener('keydown', handleKey, true); };
  }, [open]);
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (document.fullscreenElement === player.current) fullscreenTour.current = true;
      else if (fullscreenTour.current) {
        fullscreenTour.current = false;
        drag.current = null;
        setPlaying(false);
        setOpen(false);
      }
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);
  useEffect(() => {
    if (!open || !playing) return;
    const timer = window.setInterval(() => setPosition(value => value >= 100 ? 0 : value + .09), 40);
    return () => window.clearInterval(timer);
  }, [open, playing]);
  const startDrag = (event) => {
    drag.current = { x: event.clientX, start: position };
    setPlaying(false);
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const moveDrag = (event) => {
    if (!drag.current) return;
    const next = drag.current.start - (event.clientX - drag.current.x) / 7;
    setPosition(Math.max(0, Math.min(100, next)));
  };
  const chooseScene = (index) => { setScene(index); setPosition(50); setPlaying(true); };
  const toggleFullscreen = () => document.fullscreenElement ? document.exitFullscreen?.() : player.current?.requestFullscreen?.();
  const closeTour = () => {
    drag.current = null;
    setPlaying(false);
    if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
    setOpen(false);
  };
  const tourOverlay = open ? createPortal(
    <div className="tour-player-backdrop" onPointerDown={(event) => event.target === event.currentTarget && closeTour()}><button className="tour-overlay-close" onClick={closeTour} aria-label={t.close}><X/></button><section ref={player} className="tour-player-modal" role="dialog" aria-modal="true" aria-label={t.virtualTour}><div className="tour-player-screen"><div className="tour-player-panorama" style={{backgroundImage: `url(${scenes[scene].src})`, backgroundPosition: `${position}% center`, backgroundSize: scenes[scene].src.includes('banner') ? 'auto 125%' : '165% auto'}} onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={() => { drag.current = null; }} onPointerCancel={() => { drag.current = null; }}><div className="tour-player-top"><div><span><Rotate3D/></span><div><strong>{property.title}</strong><small><MapPin/>{property.location}</small></div></div><b>GALERÍA 360°</b></div><div className="tour-drag-hint"><Rotate3D/><span>{t.dragTour}</span></div>{!playing && <button className="tour-center-play" onClick={() => setPlaying(true)} aria-label="Reproducir galería"><Play fill="currentColor"/></button>}<div className="tour-hotspot"><i/><span>{scenes[scene].label}</span></div></div><div className="tour-player-controls"><button onClick={() => setPlaying(!playing)} aria-label={playing ? 'Pausar galería' : 'Reproducir galería'}>{playing ? <Pause fill="currentColor"/> : <Play fill="currentColor"/>}</button><div className="tour-progress"><i style={{width: `${position}%`}}/><span style={{left: `${position}%`}}/></div><span><Rotate3D/>360°</span><button onClick={toggleFullscreen} aria-label="Pantalla completa"><Maximize2/></button></div></div><div className="tour-scene-strip"><div><strong>{t.virtualTour}</strong><small>Selecciona una imagen panorámica</small></div><div>{scenes.map((item,index) => <button key={item.label} className={scene === index ? 'active' : ''} onClick={() => chooseScene(index)}><span><img src={item.src} alt=""/><i>{index + 1}</i></span><b>{item.label}</b></button>)}</div><span>{String(scene + 1).padStart(2,'0')} / {String(scenes.length).padStart(2,'0')}</span></div></section></div>,
    document.body,
  ) : null;
  return <>
    <button className={compact ? 'tour-card-button' : 'button tour-detail-button'} onClick={() => setOpen(true)}><Rotate3D/>{t.virtualTour}</button>
    {tourOverlay}
  </>;
}

function PropertyCard({ property, t, lang }) {
  const [saved, setSaved] = useState(false);
  const title = lang === 'es' ? property.title : property.titleEn;
  const typeLabel = { Casa: t.house, Terreno: t.land, Lote: t.lot, Finca: t.farm }[property.type] || property.type;
  return <article className="property-card"><div className="property-image"><img src={property.image} alt={title} style={{objectPosition: property.position}}/><span className="property-badge">{property.badge}</span><button className={`favorite ${saved ? 'active' : ''}`} onClick={() => setSaved(!saved)}><Heart fill={saved ? 'currentColor' : 'none'}/></button></div><div className="property-body"><div className="property-meta"><span>{typeLabel}</span><span><MapPin/>{property.location}</span></div><h3>{title}</h3><div className="property-features"><span><LandPlot/>{property.area}</span>{property.beds && <span><BedDouble/>{property.beds}</span>}{property.baths && <span><Bath/>{property.baths}</span>}</div><div className="property-footer"><div><small>{t.from}</small><strong>{property.price}</strong></div><a className="detail-arrow" href={pageUrl(`/propiedades/${property.id}`)} aria-label={t.details}><ArrowRight/></a></div><div className="property-card-actions"><VirtualTour property={property} t={t} compact/><a className="advisor-card-button" href="https://wa.me/593000000000"><MessageCircle/>{t.advisor}</a></div></div></article>;
}

function PropertiesPage({ t, lang }) {
  const [filter, setFilter] = useState('Todas');
  const [query, setQuery] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(() => window.innerWidth > 900);
  const [minSize, setMinSize] = useState('');
  const [maxSize, setMaxSize] = useState('');
  const [province, setProvince] = useState('');
  const [canton, setCanton] = useState('');
  const [parish, setParish] = useState('');
  const provinces = [...new Set(properties.map(p => p.province))];
  const cantons = [...new Set(properties.filter(p => !province || p.province === province).map(p => p.canton))];
  const parishes = [...new Set(properties.filter(p => (!province || p.province === province) && (!canton || p.canton === canton)).map(p => p.parish))];
  const activeCount = [filter !== 'Todas', minSize, maxSize, province, canton, parish].filter(Boolean).length;
  const filtered = useMemo(() => properties.filter(p => {
    const text = `${p.title} ${p.titleEn} ${p.location} ${p.province} ${p.canton} ${p.parish}`.toLowerCase();
    return (filter === 'Todas' || p.type === filter)
      && text.includes(query.toLowerCase())
      && (!minSize || p.areaValue >= Number(minSize))
      && (!maxSize || p.areaValue <= Number(maxSize))
      && (!province || p.province === province)
      && (!canton || p.canton === canton)
      && (!parish || p.parish === parish);
  }), [filter, query, minSize, maxSize, province, canton, parish]);
  const resetFilters = () => { setFilter('Todas'); setMinSize(''); setMaxSize(''); setProvince(''); setCanton(''); setParish(''); };
  const types = [['Todas',t.all],['Casa',t.house],['Lote',t.lot],['Terreno',t.land],['Finca',t.farm]];
  return <><InnerHero kicker={t.propKicker} title={t.propTitle} text={t.propIntro}/><section className="catalog-section"><div className="container"><div className="catalog-toolbar advanced-toolbar"><label className="catalog-search"><Search/><input value={query} onChange={e => setQuery(e.target.value)} placeholder={t.search}/></label><button className={`advanced-filter-toggle ${filtersOpen ? 'active' : ''}`} onClick={() => setFiltersOpen(!filtersOpen)}><SlidersHorizontal/><span>{t.filters}</span>{activeCount > 0 && <b>{activeCount}</b>}<ChevronDown/></button><span>{filtered.length} {t.results}</span></div><div className="filter-pills property-type-pills">{types.map(([value,label]) => <button key={value} className={filter === value ? 'active' : ''} onClick={() => setFilter(value)}>{label}</button>)}</div>{filtersOpen && <div className="advanced-filter-panel"><div className="filter-panel-head"><div><span><SlidersHorizontal/></span><div><strong>{t.filters}</strong><small>{t.propertyType} · {t.size} · {t.location}</small></div></div><button onClick={() => setFiltersOpen(false)} aria-label={t.close}><X/></button></div><div className="filter-panel-grid"><fieldset><legend><Ruler/>{t.size}</legend><div className="size-inputs"><label><span>{t.minimum}</span><div><input type="number" min="0" value={minSize} onChange={e => setMinSize(e.target.value)} placeholder="0"/><b>m²</b></div></label><i>—</i><label><span>{t.maximum}</span><div><input type="number" min="0" value={maxSize} onChange={e => setMaxSize(e.target.value)} placeholder="5.000"/><b>m²</b></div></label></div></fieldset><fieldset className="location-fieldset"><legend><MapPin/>{t.location}</legend><label><span>{t.province}</span><select value={province} onChange={e => { setProvince(e.target.value); setCanton(''); setParish(''); }}><option value="">{t.any}</option>{provinces.map(value => <option key={value}>{value}</option>)}</select></label><label><span>{t.canton}</span><select value={canton} onChange={e => { setCanton(e.target.value); setParish(''); }}><option value="">{t.any}</option>{cantons.map(value => <option key={value}>{value}</option>)}</select></label><label><span>{t.parish}</span><select value={parish} onChange={e => setParish(e.target.value)}><option value="">{t.any}</option>{parishes.map(value => <option key={value}>{value}</option>)}</select></label></fieldset></div><div className="filter-panel-actions"><button onClick={resetFilters}><RotateCcw/>{t.clearFilters}</button><button className="button" onClick={() => setFiltersOpen(false)}>{t.applyFilters}<ArrowRight/></button></div></div>}<div className="property-grid catalog-grid">{filtered.map(p => <PropertyCard key={p.id} property={p} t={t} lang={lang}/>)}</div>{filtered.length === 0 && <div className="catalog-empty"><Search/><h3>{t.noResults}</h3><button onClick={resetFilters}>{t.clearFilters}</button></div>}</div></section><ContactStrip t={t}/></>;
}

function PropertyMap({ t }) {
  const element = useRef(null);
  useEffect(() => {
    if (!element.current || element.current._leaflet_id) return;
    const polygon = [[-2.3067,-78.1136],[-2.3057,-78.1107],[-2.3087,-78.1094],[-2.3102,-78.1125]];
    const map = L.map(element.current, { scrollWheelZoom: false }).setView([-2.308,-78.1115], 16);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap contributors' }).addTo(map);
    const area = L.polygon(polygon, { color: '#09633f', weight: 3, fillColor: '#62a744', fillOpacity: .35 }).addTo(map);
    area.bindPopup(`<strong>Amazonia Propiedades EC</strong><br>${t.mapNote}`).openPopup();
    map.fitBounds(area.getBounds(), { padding: [35,35] });
    return () => map.remove();
  }, [t.mapNote]);
  return <div ref={element} className="osm-map" aria-label={t.location}/>;
}

function MediaCarousel({ t }) {
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const current = propertyMedia[index];
  const move = (delta) => setIndex((index + delta + propertyMedia.length) % propertyMedia.length);
  useEffect(() => {
    if (!expanded) return;
    document.body.style.overflow = 'hidden';
    const closeOnEscape = (event) => event.key === 'Escape' && setExpanded(false);
    window.addEventListener('keydown', closeOnEscape);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', closeOnEscape); };
  }, [expanded]);
  const stage = (lightbox = false) => <div className={lightbox ? 'lightbox-stage' : 'media-stage'}><img src={current.src} alt={`${t.gallery} ${index + 1}`} style={{objectPosition: current.position}}/>{current.type === 'video' && <div className="video-overlay"><button><Play fill="currentColor"/></button><span>{t.video} · 00:48</span></div>}<span className="media-counter">{index + 1} / {propertyMedia.length}</span><button className="carousel-prev" onClick={() => move(-1)}><ChevronLeft/></button><button className="carousel-next" onClick={() => move(1)}><ChevronRight/></button>{!lightbox && <button className="expand-media" onClick={() => setExpanded(true)} aria-label={t.expand}><Maximize2/><span>{t.expand}</span></button>}</div>;
  return <><div className="media-gallery">{stage()}<div className="media-thumbs">{propertyMedia.map((item,i) => <button key={i} className={i === index ? 'active' : ''} onClick={() => setIndex(i)}><img src={item.src} alt="" style={{objectPosition: item.position}}/>{item.type === 'video' && <Play fill="currentColor"/>}</button>)}</div></div>{expanded && <div className="image-lightbox" role="dialog" aria-modal="true" aria-label={t.expand}><header><div><span>{t.gallery}</span><strong>{index + 1} / {propertyMedia.length}</strong></div><button onClick={() => setExpanded(false)} aria-label={t.close}><X/></button></header>{stage(true)}<div className="lightbox-filmstrip">{propertyMedia.map((item,i) => <button key={i} className={i === index ? 'active' : ''} onClick={() => setIndex(i)}><img src={item.src} alt="" style={{objectPosition: item.position}}/></button>)}</div></div>}</>;
}

function PropertyDetailPage({ t, lang, id }) {
  const property = properties.find(p => p.id === Number(id)) || properties[0];
  const title = lang === 'es' ? property.title : property.titleEn;
  return <><section className="detail-top"><div className="container"><a href={pageUrl('/propiedades')}><ArrowLeft/>{t.detailBack}</a><div className="detail-heading"><div><span className="detail-status"><i/>{t.available}</span><h1>{title}</h1><p><MapPin/>{property.location}</p></div><div><small>{t.reference}</small><strong>{property.price}</strong><div className="detail-primary-actions"><VirtualTour property={property} t={t}/><a className="button button-gold" href="https://wa.me/593000000000"><MessageCircle/>{t.advisor}</a></div></div></div></div></section><section className="detail-content"><div className="container"><MediaCarousel t={t}/><div className="detail-columns"><article className="property-description"><h2>{t.description}</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Donec ullamcorper nulla non metus auctor fringilla. Cras justo odio, dapibus ac facilisis in, egestas eget quam.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod.</p><h3>{t.features}</h3><div className="feature-list"><span><LandPlot/><small>{t.surface}</small><strong>{property.area}</strong></span><span><BedDouble/><small>{t.bedrooms}</small><strong>{property.beds || '—'}</strong></span><span><Bath/><small>{t.bathrooms}</small><strong>{property.baths || '—'}</strong></span><span><FileCheck2/><small>{t.documentation}</small><strong>{t.inOrder}</strong></span></div></article><aside className="advisor-box"><span><MessageCircle/></span><h3>{t.advisor}</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p><a className="button" href="https://wa.me/593000000000">WhatsApp<ArrowRight/></a><a href="tel:+593000000000"><Phone/>+593 000 000 000</a></aside></div><div className="map-block"><div><span className="eyebrow dark"><span/>OpenStreetMap</span><h2>{t.location}</h2><p>{t.mapNote}</p></div><PropertyMap t={t}/></div></div></section></>;
}

function SoldCaseCard({ item, t, lang }) {
  const [open, setOpen] = useState(false);
  const [photo, setPhoto] = useState(0);
  const title = lang === 'es' ? item.title : item.titleEn;
  const photos = [{src:item.image,label:t.visit},{src:asset('casa-el-vergel.png'),label:t.review},{src:asset('amazonia-banner.png'),label:t.notary},{src:item.image,label:t.delivery}];
  const stages = [[MapPin,t.visit],[FileCheck2,t.review],[Building2,t.notary],[Check,t.delivery]];
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const close = event => event.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', close);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', close); };
  }, [open]);
  return <><article className="sold-property-card"><div className="sold-property-image"><img src={item.image} alt={title} style={{objectPosition:item.position}}/><span><Check/>{t.sold}</span><small>{item.date}</small></div><div className="sold-property-body"><p><MapPin/>{item.location}</p><h3>{title}</h3><div><span><LandPlot/>{item.area}</span><span><ShieldCheck/>{t.saleCompleted}</span></div><div className="sold-card-footer"><div><small>Cliente</small><strong>{item.client}</strong></div><button onClick={() => setOpen(true)}>{t.viewProcess}<ArrowRight/></button></div></div></article>{open && <div className="sold-process-backdrop" onMouseDown={event => event.target === event.currentTarget && setOpen(false)}><section className="sold-process-modal" role="dialog" aria-modal="true"><button className="sold-modal-close" onClick={() => setOpen(false)}><X/></button><div className="sold-process-gallery"><div className="sold-main-photo"><img src={photos[photo].src} alt={photos[photo].label}/><span>{String(photo+1).padStart(2,'0')} / 04</span><strong>{photos[photo].label}</strong><button className="sold-prev" onClick={() => setPhoto((photo+3)%4)}><ChevronLeft/></button><button className="sold-next" onClick={() => setPhoto((photo+1)%4)}><ChevronRight/></button></div><div className="sold-thumbnails">{photos.map((entry,index)=><button key={index} className={photo===index?'active':''} onClick={()=>setPhoto(index)}><img src={entry.src} alt=""/><span>0{index+1}</span></button>)}</div></div><div className="sold-process-info"><span className="eyebrow dark"><span/>{t.salesProcess}</span><h2>{title}</h2><p><MapPin/>{item.location}</p><blockquote>“Lorem ipsum dolor sit amet, consectetur adipiscing elit. El proceso fue claro, seguro y acompañado en cada etapa.”</blockquote><div className="sold-timeline">{stages.map(([Icon,label],index)=><div className={index<=photo?'complete':''} key={label}><span><Icon/></span><div><small>ETAPA 0{index+1}</small><strong>{label}</strong></div></div>)}</div><div className="sold-info-footer"><div><small>{t.saleCompleted}</small><strong>{item.date}</strong></div><span><Check/>100%</span></div></div></section></div>}</>;
}

function SuccessPage({ t, lang }) {
  return <><InnerHero kicker={t.successKicker} title={t.successTitle} text={t.successIntro}/><section className="success-page sold-catalog"><div className="container"><div className="sold-catalog-heading"><div><span className="eyebrow dark"><span/>{t.soldProperties}</span><h2>{t.salesProcess}</h2></div><p>{t.successIntro}</p></div><div className="sold-property-grid">{soldCases.map(item=><SoldCaseCard key={item.id} item={item} t={t} lang={lang}/>)}</div></div></section><ContactStrip t={t}/></>;
}

function SellPage({ t }) {
  return <><section className="sell-page-hero"><div className="sell-page-image"><img src={asset('amazonia-banner.png')} alt="Amazonía ecuatoriana"/></div><div className="sell-page-copy"><span className="eyebrow"><span/>{t.sellKicker}</span><h1>{t.sellTitle}</h1><p>{t.sellText}</p><a className="button button-gold" href="https://wa.me/593000000000">{t.sellCta}<ArrowRight/></a></div></section><section className="sell-benefits"><div className="container"><div><span><CircleDollarSign/></span><h3>{t.valuation}</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></div><div><span><Camera/></span><h3>{t.promotion}</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></div><div><span><ShieldCheck/></span><h3>{t.support}</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></div></div></section><ContactStrip t={t}/></>;
}

function ContactStrip({ t }) {
  return <section className="contact-section"><div className="container contact-card"><div><span className="eyebrow"><span/>Amazonia Propiedades EC</span><h2>{t.contactTitle}</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></div><div className="contact-actions"><a className="button button-whatsapp" href="https://wa.me/593000000000"><MessageCircle/>{t.whatsapp}</a><a href="tel:+593000000000"><Phone/>+593 000 000 000</a></div></div></section>;
}

function App() {
  const language = useLanguage();
  const path = currentPage();
  let page;
  const detailMatch = path.match(/^\/propiedades\/(\d+)$/);
  if (detailMatch) page = <PropertyDetailPage t={language.t} lang={language.lang} id={detailMatch[1]}/>;
  else if (path === '/propiedades') page = <PropertiesPage t={language.t} lang={language.lang}/>;
  else if (path === '/casos-de-exito') page = <SuccessPage t={language.t} lang={language.lang}/>;
  else if (path === '/vende-con-nosotros') page = <SellPage t={language.t}/>;
  else page = <HomePage t={language.t}/>;
  return <PageShell language={language}>{page}</PageShell>;
}

createRoot(document.getElementById('root')).render(<App/>);
