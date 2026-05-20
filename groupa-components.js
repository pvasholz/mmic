// Compiled from groupa-components.jsx — edit the corresponding .jsx if you want JSX back.
(function () {
  "use strict";

"use strict";

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// Shared components for the Groupa prototype.
// Tokens from design system v2 (May 16, 2026).

var TOKENS = {
  white: '#FFFFFF',
  foundation: '#F9FAFB',
  primary: '#0047AB',
  // cobalt
  success: '#46AB00',
  // green
  warning: '#FFB300',
  // amber  (replaces old coral)
  failure: '#AB0046',
  // magenta
  neutral: '#708090',
  // slate
  black: '#000000',
  ink: '#1C1C1C'
};

// Subtle SVG noise data-URL ("grain"). Used at low opacity for paper feel.
var NOISE_SVG = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.6 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/></svg>\")";

// ── Logo (chromatic-aberration wordmark) ─────────────────────────────────────
// "Groupa" in italic bold cobalt with green/magenta RGB-split shadows, set
// inside a slate badge with rounded corners.
function GroupaLogo(_ref) {
  var {
    size = 'sm',
    solid = false
  } = _ref;
  var scale = size === 'lg' ? 1.6 : size === 'md' ? 1.1 : 0.78;
  var padY = 7 * scale,
    padX = 18 * scale;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      background: solid ? TOKENS.primary : TOKENS.neutral,
      padding: "".concat(padY, "px ").concat(padX, "px"),
      borderRadius: 12 * scale,
      boxShadow: '0 1px 3px rgba(0,0,0,.15), inset 0 1px 0 rgba(255,255,255,.18)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 800,
      fontStyle: 'italic',
      fontSize: 32 * scale,
      lineHeight: 1,
      color: solid ? TOKENS.white : TOKENS.primary,
      textShadow: solid ? '0 1px 2px rgba(0,0,0,.25)' : "".concat(1 * scale, "px ").concat(1 * scale, "px 0 ").concat(TOKENS.success, ", ").concat(-1 * scale, "px ").concat(-1 * scale, "px 0 ").concat(TOKENS.failure, ", 0 2px 3px rgba(0,0,0,.15)"),
      letterSpacing: '-0.01em'
    }
  }, "Groupa"));
}
function GroupaIcon(_ref2) {
  var {
    size = 32
  } = _ref2;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: TOKENS.neutral,
      width: size,
      height: size,
      borderRadius: size * 0.22,
      boxShadow: '0 1px 3px rgba(0,0,0,.15), inset 0 1px 0 rgba(255,255,255,.18)',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 800,
      fontStyle: 'italic',
      fontSize: size * 0.62,
      lineHeight: 1,
      color: TOKENS.primary,
      textShadow: "1px 1px 0 ".concat(TOKENS.success, ", -1px -1px 0 ").concat(TOKENS.failure)
    }
  }, "G"));
}

// ── Button (pill, 5 variants × default/hover/active/disabled) ────────────────
var BTN_COLORS = {
  primary: {
    bg: TOKENS.primary,
    fg: TOKENS.white,
    border: TOKENS.primary
  },
  success: {
    bg: TOKENS.success,
    fg: TOKENS.ink,
    border: TOKENS.ink
  },
  warning: {
    bg: TOKENS.warning,
    fg: TOKENS.ink,
    border: TOKENS.ink
  },
  failure: {
    bg: TOKENS.failure,
    fg: TOKENS.white,
    border: TOKENS.failure
  },
  neutral: {
    bg: TOKENS.neutral,
    fg: TOKENS.white,
    border: TOKENS.black
  }
};
function Button(_ref3) {
  var {
    variant = 'primary',
    size = 'md',
    children,
    onClick,
    disabled = false,
    full = false,
    style = {}
  } = _ref3;
  var c = BTN_COLORS[variant];
  var [hover, setHover] = React.useState(false);
  var [active, setActive] = React.useState(false);
  var sizes = {
    sm: {
      pad: '7px 18px',
      fs: 13,
      br: 18
    },
    md: {
      pad: '10px 26px',
      fs: 14,
      br: 22
    },
    lg: {
      pad: '13px 32px',
      fs: 15,
      br: 26
    }
  }[size];
  return /*#__PURE__*/React.createElement("button", {
    onClick: disabled ? undefined : onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setActive(false);
    },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false),
    disabled: disabled,
    style: _objectSpread({
      padding: sizes.pad,
      background: c.bg,
      color: c.fg,
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      fontSize: sizes.fs,
      border: "1.5px solid ".concat(hover || active ? c.border : 'transparent'),
      borderRadius: sizes.br,
      cursor: disabled ? 'not-allowed' : 'pointer',
      width: full ? '100%' : 'auto',
      opacity: disabled ? 0.45 : 1,
      boxShadow: active ? "inset 0 2px 4px rgba(0,0,0,.18)" : hover ? "0 4px 12px ".concat(c.bg, "55, 0 1px 2px rgba(0,0,0,.1)") : "0 1px 2px rgba(0,0,0,.08)",
      transform: active ? 'translateY(1px)' : 'translateY(0)',
      transition: 'box-shadow .15s, transform .08s, border-color .15s'
    }, style)
  }, children);
}

// ── NavBar (top of every authenticated screen) ───────────────────────────────
function NavBar(_ref4) {
  var {
    rightSlot = null
  } = _ref4;
  return /*#__PURE__*/React.createElement("header", {
    style: {
      height: 64,
      flexShrink: 0,
      background: TOKENS.white,
      borderBottom: "1px solid ".concat(TOKENS.neutral, "33"),
      display: 'flex',
      alignItems: 'center',
      padding: '0 28px',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(GroupaIcon, {
    size: 36
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 600,
      fontSize: 15,
      color: TOKENS.ink,
      lineHeight: 1.1
    }
  }, "Groupa"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '"Inter", sans-serif',
      fontSize: 11,
      color: TOKENS.neutral,
      marginTop: 1
    }
  }, "HCI 594 \xB7 Spring 2026")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), rightSlot);
}

// ── Card (Primary card with grain texture) ───────────────────────────────────
function Card(_ref5) {
  var {
    children,
    padding = 28,
    style = {},
    textured = true
  } = _ref5;
  return /*#__PURE__*/React.createElement("div", {
    style: _objectSpread({
      background: TOKENS.white,
      backgroundImage: textured ? NOISE_SVG : 'none',
      backgroundBlendMode: 'multiply',
      border: "1px solid ".concat(TOKENS.neutral, "33"),
      borderRadius: 14,
      padding,
      boxShadow: '0 1px 3px rgba(0,0,0,.04), 0 8px 24px rgba(0,0,0,.04)'
    }, style)
  }, children);
}

// ── Page shell ───────────────────────────────────────────────────────────────
function PageShell(_ref6) {
  var {
    navRight,
    children,
    networkBg = false,
    maxWidth = 720
  } = _ref6;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      minHeight: '100vh',
      background: TOKENS.foundation,
      backgroundImage: networkBg ? "".concat(NOISE_SVG, ", radial-gradient(circle at 20% 10%, ").concat(TOKENS.primary, "08, transparent 50%), radial-gradient(circle at 85% 90%, ").concat(TOKENS.warning, "10, transparent 50%)") : NOISE_SVG,
      backgroundBlendMode: 'multiply',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: '"Inter", sans-serif',
      color: TOKENS.ink
    }
  }, /*#__PURE__*/React.createElement(NavBar, {
    rightSlot: navRight
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      width: '100%',
      maxWidth,
      margin: '0 auto',
      padding: '32px 28px 64px'
    }
  }, children));
}

// Export to window for cross-script use.
Object.assign(window, {
  TOKENS,
  NOISE_SVG,
  GroupaLogo,
  GroupaIcon,
  Button,
  NavBar,
  Card,
  PageShell
});
})();
