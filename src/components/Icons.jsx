// Íconos de línea propios (trazo 1.6, esquinas redondeadas).
const base = (size) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: 'false',
});

const make = (paths) =>
  function Icon({ size = 20, className = '' }) {
    return (
      <svg {...base(size)} className={className}>
        {paths}
      </svg>
    );
  };

export const IconSearch = make(<><circle cx="10.5" cy="10.5" r="6.5" /><path d="m15.5 15.5 4.5 4.5" /></>);
export const IconBag = make(<><path d="M5 8h14l-1.2 11.1a1.5 1.5 0 0 1-1.5 1.4H7.7a1.5 1.5 0 0 1-1.5-1.4L5 8Z" /><path d="M9 10V7a3 3 0 0 1 6 0v3" /></>);
export const IconMenu = make(<><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h10" /></>);
export const IconClose = make(<><path d="m6 6 12 12" /><path d="M18 6 6 18" /></>);
export const IconPlus = make(<><path d="M12 5v14" /><path d="M5 12h14" /></>);
export const IconMinus = make(<path d="M5 12h14" />);
export const IconCheck = make(<path d="m5 12.5 4.2 4.2L19 7" />);
export const IconArrow = make(<><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>);
export const IconArrowLeft = make(<><path d="M19 12H5" /><path d="m11 6-6 6 6 6" /></>);
export const IconChevron = make(<path d="m6 9 6 6 6-6" />);
export const IconChat = make(<><path d="M4.5 19.5 6 15.6A7.5 7.5 0 1 1 9 18.6l-4.5.9Z" /><path d="M9.2 9.6c.2 1.8 2.3 4 4.2 4.4l1-1.1 1.7.8c-.2 1-1 1.7-2 1.7-2.9 0-6.4-3.4-6.4-6.3 0-1 .7-1.8 1.7-2l.8 1.6-1 .9Z" /></>);
export const IconPhone = make(<path d="M6.6 3.5h2.5l1.4 4-1.8 1.2a11 11 0 0 0 6.6 6.6l1.2-1.8 4 1.4v2.5a2 2 0 0 1-2.2 2A17 17 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z" />);
export const IconMail = make(<><rect x="3.5" y="5.5" width="17" height="13" rx="2" /><path d="m4 7 8 6 8-6" /></>);
export const IconPin = make(<><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" /><circle cx="12" cy="10" r="2.3" /></>);
export const IconClock = make(<><circle cx="12" cy="12" r="8" /><path d="M12 7.5V12l3 2" /></>);
export const IconLink = make(<><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" /><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" /></>);
export const IconTrash = make(<><path d="M5 7h14" /><path d="M9.5 7V5h5v2" /><path d="M7 7l.8 12a1.5 1.5 0 0 0 1.5 1.4h5.4a1.5 1.5 0 0 0 1.5-1.4L17 7" /></>);
export const IconSliders = make(<><path d="M4 7h9" /><path d="M17 7h3" /><circle cx="15" cy="7" r="2" /><path d="M4 17h3" /><path d="M11 17h9" /><circle cx="9" cy="17" r="2" /></>);
export const IconCopy = make(<><rect x="8.5" y="8.5" width="11" height="11" rx="2" /><path d="M15.5 8.5V6a1.5 1.5 0 0 0-1.5-1.5H6A1.5 1.5 0 0 0 4.5 6v8A1.5 1.5 0 0 0 6 15.5h2.5" /></>);
export const IconInfo = make(<><circle cx="12" cy="12" r="8.5" /><path d="M12 11v5" /><path d="M12 8v.01" /></>);
export const IconSpark = make(<path d="M12 4v4M12 16v4M4 12h4M16 12h4M6.5 6.5l2.6 2.6M14.9 14.9l2.6 2.6M6.5 17.5l2.6-2.6M14.9 9.1l2.6-2.6" />);
