var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
  assets: () => assets_manifest_default,
  assetsBuildDirectory: () => assetsBuildDirectory,
  entry: () => entry,
  publicPath: () => publicPath,
  routes: () => routes
});
module.exports = __toCommonJS(stdin_exports);

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
var import_node = require("@remix-run/node"), import_react = require("@remix-run/react"), import_server = require("react-dom/server"), import_stream = require("stream"), import_jsx_runtime = require("react/jsx-runtime"), ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let didError = !1, { pipe, abort } = (0, import_server.renderToPipeableStream)(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.RemixServer, {
      context: remixContext,
      url: request.url
    }), {
      onShellReady: () => {
        let body = new import_stream.PassThrough();
        responseHeaders.set("Content-Type", "text/html"), resolve(
          new import_node.Response(body, {
            headers: responseHeaders,
            status: didError ? 500 : responseStatusCode
          })
        ), pipe(body);
      },
      onShellError: (err) => {
        reject(err);
      },
      onError: (error) => {
        didError = !0, console.error(error);
      }
    });
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  headers: () => headers,
  links: () => links,
  loader: () => loader,
  meta: () => meta
});
var import_react2 = require("@remix-run/react");

// app/styles/root.css
var root_default = "/build/_assets/root-G46GMWA7.css";

// app/styles/tailwind.css
var tailwind_default = "/build/_assets/tailwind-DL7NIKSD.css";

// app/root.tsx
var import_jsx_runtime = require("react/jsx-runtime"), headers = () => ({
  "Cache-Control": "max-age=36000, s-maxage=36000"
}), meta = () => ({
  charset: "utf-8",
  viewport: "width=device-width,initial-scale=1",
  title: "Simon Boisset | Full stack developer",
  description: "Full stack developer, React Typescript Node"
});
function links() {
  return [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap"
    },
    {
      rel: "stylesheet",
      href: root_default
    },
    {
      rel: "stylesheet",
      href: tailwind_default
    }
  ];
}
var loader = async ({ request }) => {
  var _a;
  return ((_a = request.headers.get("Accept-Language")) == null ? void 0 : _a.split(",")[0].split("-")[0]) || "en";
};
function App() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
    lang: "fr",
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("head", {
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
            charSet: "utf-8"
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
            name: "viewport",
            content: "width=device-width,initial-scale=1"
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react2.Meta, {}),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react2.Links, {})
        ]
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react2.Outlet, {}),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react2.ScrollRestoration, {}),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react2.Scripts, {}),
          !1
        ]
      })
    ]
  });
}

// app/routes/$lang._index/_index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => Index
});
var import_react11 = require("react");

// app/core/layout/utils/usePopper.ts
var import_react3 = require("react"), import_core = require("@popperjs/core");
function usePopper(options) {
  let reference = (0, import_react3.useRef)(null), popper = (0, import_react3.useRef)(null), cleanupCallback = (0, import_react3.useRef)(() => {
  }), instantiatePopper = (0, import_react3.useCallback)(() => {
    !reference.current || !popper.current || (cleanupCallback.current && cleanupCallback.current(), cleanupCallback.current = (0, import_core.createPopper)(reference.current, popper.current, options).destroy);
  }, [reference, popper, cleanupCallback, options]);
  return (0, import_react3.useMemo)(
    () => [
      (referenceDomNode) => {
        reference.current = referenceDomNode, instantiatePopper();
      },
      (popperDomNode) => {
        popper.current = popperDomNode, instantiatePopper();
      }
    ],
    [reference, popper, instantiatePopper]
  );
}

// app/core/layout/utils/classNames.ts
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// app/core/layout/Button.tsx
var import_jsx_runtime = require("react/jsx-runtime"), buttonStyle = "inline-flex justify-center sm:px-4 px-1 py-2 text-sm bg-blue-500 font-medium rounded-xl bg-opacity-0 hover:bg-opacity-10 active:bg-opacity-5 focus:outline-none";

// app/core/layout/Footer.tsx
var import_react6 = require("@remix-run/react");

// app/core/traduction/useTraduction.ts
var import_react4 = require("@remix-run/react"), import_react5 = require("react");

// app/core/traduction/en.ts
var en = {
  lang: "\u{1F1EC}\u{1F1E7} English",
  blogId: "51f0a44d190e4fcf803a7b55efa41738",
  achievementsId: "b57b0eae91684a349b34c31966840e91",
  backgroundId: "45130664bd744e2b9d08dfd10499bb91",
  home: "Home",
  links: "Links",
  fullStack: "Full stack developer",
  blog: {
    followMe: "You can follow me on",
    myPosts: "My posts"
  },
  achievements: {
    label: "Achievements",
    silbo: {
      title: "Silbo",
      description: "The patient flow management platform"
    },
    chaban: {
      title: "Chaban Delmas Bridge",
      description: "Web app and native application displaying opening times of the bridge."
    }
  },
  background: {
    label: "Background",
    licence: {
      title: "Physics degree",
      description: "Bachelor's degree in physics at the University of Bordeaux",
      alt: "Universit\xE9 de Bordeaux"
    },
    master: {
      title: "Laser Master",
      description: "Master's degree in laser at the University of Lille",
      alt: "Universit\xE9 de Lille"
    },
    amplitude: {
      title: "Amplitude Laser",
      description: "Laser engineer in R&D then in production on ultra-short, high-energy and ultra-short pulse lasers.",
      alt: "Amplitude Laser"
    },
    silbo: {
      title: "Silbo",
      description: "Full stack developer on the Silbo patient flow management platform.",
      alt: "Silbo"
    }
  }
};

// app/core/traduction/fr.ts
var fr = {
  lang: "\u{1F1EB}\u{1F1F7} Fran\xE7ais",
  blogId: "38890d957b694fe9b7c081979982ef4c",
  achievementsId: "c8b8541d153148869736bb76f1239455",
  backgroundId: "1e7146adb1bf4405a5f518c48bc4170c",
  home: "Accueil",
  links: "Liens",
  fullStack: "D\xE9veloppeur full stack",
  blog: {
    followMe: "Vous pouvez suivre mes articles tech sur",
    myPosts: "Mes posts"
  },
  achievements: {
    label: "R\xE9alisations",
    silbo: {
      title: "Silbo",
      description: "La plateforme de gestion des flux patients"
    },
    chaban: {
      title: "Horaires pont Chaban-Delmas",
      description: "Web app et application android permettant de visualiser les prochaines fermetures du pont et de recevoir des notifications pour en \xEAtre pr\xE9venu"
    }
  },
  background: {
    label: "Parcours",
    licence: {
      title: "Licence Physique",
      description: "Dipl\xF4me de licence en physique fondamentale \xE0 l\u2019universit\xE9 de Bordeaux",
      alt: "Universit\xE9 de Bordeaux"
    },
    master: {
      title: "Master Laser",
      description: "Master de physique des lasers \xE0 l\u2019universit\xE9 de Lille.",
      alt: "Universit\xE9 de Lille"
    },
    amplitude: {
      title: "Amplitude Laser",
      description: "Ing\xE9nieur laser en R&D puis en production sur des lasers \xE0 impulsions ultra br\xE8ves, \xE0 haute \xE9nergie et haute cadence.",
      alt: "Amplitude Laser"
    },
    silbo: {
      title: "Silbo",
      description: "D\xE9veloppeur full stack sur la plateforme Silbo de gestion de flux patient.",
      alt: "Silbo"
    }
  }
};

// app/core/traduction/index.ts
var traduction = { fr, en };

// app/core/traduction/useTraduction.ts
var useTraduction = () => {
  let matchingRoutes = (0, import_react4.useMatches)(), params = (0, import_react4.useParams)(), routeFound = (0, import_react5.useMemo)(() => matchingRoutes.find((path) => path.id === "routes/"), [matchingRoutes]), lang = params.lang || (routeFound == null ? void 0 : routeFound.data) || "en";
  return { t: traduction[lang], lang };
};

// app/core/layout/Footer.tsx
var import_jsx_runtime = require("react/jsx-runtime"), Footer = () => {
  let { t, lang } = useTraduction();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
    className: "px-20 py-8 flex flex-col sm:flex-row sm:space-x-60 sm:space-y-0 space-y-10 justify-evenly border-t bg-blue-600 text-slate-100",
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
        className: "flex flex-col space-y-2 items-center sm:items-start",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
            className: "font-semibold text-lg",
            children: "Site"
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react6.Link, {
            className: "hover:underline text-sm",
            to: `/${lang}`,
            children: t.home
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react6.Link, {
            className: "hover:underline text-sm",
            to: `/${lang}/blog`,
            children: "Blog"
          })
        ]
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
        className: "flex flex-col space-y-2 items-center sm:items-start",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
            className: "font-semibold text-lg",
            children: "Sources"
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
            className: "hover:underline text-sm",
            href: "https://github.com/simonboisset",
            children: "Github"
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
            className: "hover:underline text-sm",
            href: "https://github.com/simonboisset/website",
            children: "Code"
          })
        ]
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
        className: "flex flex-col space-y-2 items-center sm:items-start",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
            className: "font-semibold text-lg",
            children: t.links
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
            className: "hover:underline text-sm",
            href: "https://www.linkedin.com/in/simon-boisset-733445138/",
            children: "Linkedin"
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
            className: "hover:underline text-sm",
            href: "https://twitter.com/simonboisset",
            children: "Twitter"
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
            className: "hover:underline text-sm",
            href: "https://dev.to/simonboisset",
            children: "Dev"
          })
        ]
      })
    ]
  });
};

// app/core/layout/Header.tsx
var import_react10 = require("@remix-run/react");

// app/core/layout/Link.tsx
var import_react7 = require("@remix-run/react");
var import_jsx_runtime = require("react/jsx-runtime"), Link2 = ({ to, children, className }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react7.Link, {
  to,
  className: classNames(buttonStyle, className),
  children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
    children
  })
});

// app/core/layout/Menu/Item.tsx
var import_react8 = require("@headlessui/react");
var import_jsx_runtime = require("react/jsx-runtime");
function resolveClass({ active, disabled }) {
  return classNames(
    "flex justify-between w-full px-4 py-2 text-sm leading-5 text-left rounded-md",
    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
    disabled && "cursor-not-allowed opacity-50"
  );
}
function Item({ children, href, ...menuProps }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react8.Menu.Item, {
    ...menuProps,
    as: "a",
    href,
    className: resolveClass,
    children
  });
}

// app/core/layout/Menu/Menu.tsx
var import_react9 = require("@headlessui/react");
var import_jsx_runtime = require("react/jsx-runtime");
function MenuUi({ children, placement = "bottom-end", title }) {
  let [trigger, container] = usePopper({
    placement,
    strategy: "fixed",
    modifiers: [{ name: "offset", options: { offset: [0, 10] } }]
  });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react9.Menu, {
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
        className: "rounded-md",
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react9.Menu.Button, {
          ref: trigger,
          className: classNames(buttonStyle, "whitespace-nowrap"),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
              children: title
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
              className: "ml-2 -mr-1 h-5 w-5",
              viewBox: "0 0 20 20",
              fill: "currentColor",
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
                fillRule: "evenodd",
                d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
                clipRule: "evenodd"
              })
            })
          ]
        })
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
        ref: container,
        className: "sm:w-56 px-4 sm:px-0 w-full rounded-md overflow-hidden",
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react9.Transition, {
          enter: "transition duration-100 ease-out",
          enterFrom: "transform scale-95 opacity-0",
          enterTo: "transform scale-100 opacity-100",
          leave: "transition duration-75 ease-out",
          leaveFrom: "transform scale-100 opacity-100",
          leaveTo: "transform scale-95 opacity-0",
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react9.Menu.Items, {
            className: "rounded-md border border-gray-200 bg-white shadow-lg outline-none flex flex-col p-1",
            children
          })
        })
      })
    ]
  });
}

// app/core/layout/portrait.webp
var portrait_default = "/build/_assets/portrait-FUG752YX.webp";

// app/core/layout/Header.tsx
var import_jsx_runtime = require("react/jsx-runtime"), Header = () => {
  let location = (0, import_react10.useLocation)(), { t, lang } = useTraduction(), pathWithoutLang = location.pathname.split("/").slice(2).join("/");
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
    className: classNames(
      "z-20 flex flex-row sm:px-8 px-4 py-4 bg-blue-100 backdrop-blur-lg items-center bg-opacity-20 text-blue-500 sticky top-0 sm:space-x-6 space-x-2 shadow-sm"
    ),
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
        src: portrait_default,
        alt: "portait",
        className: "rounded-3xl absolute shadow-lg transition-all h-10"
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
        className: "sm:w-4 w-8"
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
        className: "flex flex-row items-center space-x-1 sm:space-x-4 flex-1",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link2, {
            to: `/${lang}`,
            children: t.home
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link2, {
            to: `/${lang}/blog`,
            children: "Blog"
          })
        ]
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
        className: "font-light text-xl duration-300 sm:inline hidden",
        children: "Simon Boisset"
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MenuUi, {
        title: t.lang,
        placement: "bottom-start",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
            href: `/fr/${pathWithoutLang}`,
            children: traduction.fr.lang
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
            href: `/en/${pathWithoutLang}`,
            children: traduction.en.lang
          })
        ]
      })
    ]
  });
};

// app/routes/$lang._index/AchievementItem.tsx
var import_jsx_runtime = require("react/jsx-runtime"), AchievementItem = ({ description, img, title, link }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
  href: link,
  className: "flex flex-col space-y-2 w-full sm:w-72 items-center hover:bg-slate-100 rounded-xl p-4 transition-all ",
  children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
      alt: title,
      src: img,
      className: "h-44 rounded-3xl shadow-lg"
    }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
      className: "flex flex-col space-y-4 items-center text-justify",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
          className: "font-semibold text-lg",
          children: title
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
          children: description
        })
      ]
    })
  ]
});

// app/routes/$lang._index/assets/amplitude.png
var amplitude_default = "/build/_assets/amplitude-URIJGGBV.png";

// app/routes/$lang._index/assets/bordeaux.webp
var bordeaux_default = "/build/_assets/bordeaux-M23CWPF5.webp";

// app/routes/$lang._index/assets/chaban.jpeg
var chaban_default = "/build/_assets/chaban-XUW453CE.jpeg";

// app/routes/$lang._index/assets/lille.webp
var lille_default = "/build/_assets/lille-SNIW24BX.webp";

// app/routes/$lang._index/assets/silbo.webp
var silbo_default = "/build/_assets/silbo-E3TEE7MH.webp";

// app/routes/$lang._index/BackgroundItem.tsx
var import_jsx_runtime = require("react/jsx-runtime"), BackgroundItem = ({ description, img, title, year, reverse, alt }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
  className: "w-full flex flex-col items-center space-y-12",
  children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
      className: "z-10 flex items-center justify-center font-semibold text-lg text-blue-500 border-blue-500 ring-1 ring-blue-500 rounded-full h-16 w-16 bg-white",
      children: year
    }),
    reverse ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
      className: "flex flex-row w-full justify-between items-center",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
          className: "sm:w-80 w-2/5 flex flex-col space-y-2",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
              className: "font-semibold text-xl",
              children: title
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
              className: "text-justify",
              children: description
            })
          ]
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
          className: "sm:w-80 w-2/5 flex justify-center",
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
            alt,
            src: img,
            className: "max-w-full max-h-40 rounded-3xl"
          })
        })
      ]
    }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
      className: "flex flex-row w-full justify-between items-center",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
          className: "sm:w-80 w-2/5 flex justify-center",
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
            alt,
            src: img,
            className: "max-w-full max-h-40 rounded-3xl"
          })
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
          className: "sm:w-80 w-2/5 flex flex-col space-y-2",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
              className: "font-semibold text-xl",
              children: title
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
              className: "text-justify",
              children: description
            })
          ]
        })
      ]
    })
  ]
});

// app/routes/$lang._index/_index.tsx
var import_jsx_runtime = require("react/jsx-runtime");
function Index() {
  let parcoursRef = (0, import_react11.useRef)(null), [timelinePosition, setTimelinePosition] = (0, import_react11.useState)([0, 0]), { t } = useTraduction();
  return (0, import_react11.useEffect)(() => {
    let handleResize = () => {
      var _a, _b;
      let body = document.getElementById("main-body");
      setTimelinePosition([
        (((_a = parcoursRef.current) == null ? void 0 : _a.getBoundingClientRect().top) || 0) - ((body == null ? void 0 : body.getBoundingClientRect().top) || 0),
        window.innerHeight - ((body == null ? void 0 : body.getBoundingClientRect().height) || 0) - ((((_b = parcoursRef.current) == null ? void 0 : _b.getBoundingClientRect().bottom) || 0) - ((body == null ? void 0 : body.getBoundingClientRect().bottom) || 0))
      ]);
    };
    return handleResize(), addEventListener("resize", handleResize), () => removeEventListener("resize", handleResize);
  }, []), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
    id: "main-body",
    className: "flex flex-col font-sans min-h-screen",
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
        className: "flex-1",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
            className: "z-20 flex-col bg-blue-100  text-blue-600 hidden sm:flex rounded-xl m-8",
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
              className: "flex flex-col justify-center space-y-2 pl-4 pr-4 pt-2 pb-2 items-center h-72",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
                  className: "font-semibold text-5xl",
                  children: t.fullStack
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
                  className: "font-semibold text-2xl",
                  children: "React, Node, Typescript ..."
                })
              ]
            })
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
            className: "py-10 flex flex-col items-center space-y-16 bg-opacity-5",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
                className: "font-semibold text-3xl",
                children: t.achievements.label
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                className: "flex flex-col sm:flex-row space-y-10 sm:space-y-0 sm:space-x-40 justify-center px-10",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AchievementItem, {
                    title: t.achievements.silbo.title,
                    description: t.achievements.silbo.description,
                    img: silbo_default,
                    link: "https://silbo.com/"
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AchievementItem, {
                    title: t.achievements.chaban.title,
                    description: t.achievements.chaban.description,
                    img: chaban_default,
                    link: "https://pont-chaban-delmas.com/"
                  })
                ]
              })
            ]
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
            className: "p-10 flex flex-col items-center space-y-16",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
                className: "font-semibold text-3xl",
                children: t.background.label
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                ref: parcoursRef,
                className: "flex flex-col space-y-28 w-full max-w-4xl items-center",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                    className: "w-px bg-blue-500 rounded-full absolute z-0",
                    style: { top: timelinePosition[0], bottom: timelinePosition[1] }
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackgroundItem, {
                    alt: t.background.licence.alt,
                    description: t.background.licence.description,
                    year: 2012,
                    title: t.background.licence.title,
                    link: "https://www.u-bordeaux.fr/",
                    img: bordeaux_default
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackgroundItem, {
                    alt: t.background.master.alt,
                    description: t.background.master.description,
                    year: 2014,
                    title: t.background.master.title,
                    link: "https://www.univ-lille.fr/",
                    img: lille_default,
                    reverse: !0
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackgroundItem, {
                    alt: t.background.amplitude.alt,
                    description: t.background.amplitude.description,
                    year: 2015,
                    title: t.background.amplitude.title,
                    link: "https://amplitude-laser.com/",
                    img: amplitude_default
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackgroundItem, {
                    alt: t.background.silbo.alt,
                    description: t.background.silbo.description,
                    year: 2020,
                    title: t.background.silbo.title,
                    link: "https://silbo.com/",
                    img: silbo_default,
                    reverse: !0
                  })
                ]
              })
            ]
          })
        ]
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
    ]
  });
}

// app/routes/$lang.blog.tsx
var lang_blog_exports = {};
__export(lang_blog_exports, {
  default: () => Blog,
  loader: () => loader2
});
var import_node2 = require("@remix-run/node"), import_react12 = require("@remix-run/react");
var import_jsx_runtime = require("react/jsx-runtime"), loader2 = async () => {
  let posts = (await (await fetch("https://dev.to/api/articles?username=simonboisset")).json()).map((article) => ({
    id: article.id,
    title: article.title,
    description: article.description,
    url: article.url
  }));
  return (0, import_node2.json)(posts, {
    headers: {
      "Cache-Control": "public, max-age=36000, s-maxage=36000"
    }
  });
};
function Blog() {
  let { t } = useTraduction(), posts = (0, import_react12.useLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
    id: "main-body",
    className: "flex flex-col font-sans min-h-screen",
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
        className: "flex flex-1 flex-col w-full items-center space-y-4 sm:p-8 p-4",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
            className: "text-4xl font-bold",
            children: t.blog.myPosts
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
            className: "text-lg pb-12",
            children: [
              t.blog.followMe,
              " ",
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
                className: "text-blue-500",
                href: "https://dev.to/simonboisset",
                children: "Dev.to"
              })
            ]
          }),
          posts.map(({ id, description, title, url }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
            href: url,
            className: "w-full max-w-lg border border-blue-500 py-4 px-8 rounded-lg hover:shadow-md hover:bg-slate-100 transition-all",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
                className: "text-lg font-semibold text-blue-500",
                children: title
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                children: description
              })
            ]
          }, id))
        ]
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
    ]
  });
}

// app/routes/_index.tsx
var index_exports2 = {};
__export(index_exports2, {
  default: () => index_default
});
var index_default = Index;

// app/routes/blog.tsx
var blog_exports = {};
__export(blog_exports, {
  default: () => blog_default,
  loader: () => loader2
});
var blog_default = Blog;

// app/routes/robots[.]txt.tsx
var robots_txt_exports = {};
__export(robots_txt_exports, {
  loader: () => loader3
});
var loader3 = () => {
  let robotText = `
        User-agent: Googlebot

        User-agent: *
        Allow: /
    
        Sitemap: https://simonboisset.com/sitemap.xml
        `;
  return new Response(robotText, {
    status: 200,
    headers: {
      "Content-Type": "text/plain"
    }
  });
};

// app/routes/sitemap[.]xml.tsx
var sitemap_xml_exports = {};
__export(sitemap_xml_exports, {
  loader: () => loader4
});
var loader4 = async () => {
  let content = `
          <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            <url>
              <loc>https://simonboisset.com/</loc>
              <lastmod>2022-08-26</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
            <url>
              <loc>https://simonboisset.com/fr/</loc>
              <lastmod>2022-08-26</lastmod>
              <changefreq>monthly</changefreq>
              <priority>0.9</priority>
            </url>
            <url>
              <loc>https://simonboisset.com/en/</loc>
              <lastmod>2022-08-26</lastmod>
              <changefreq>monthly</changefreq>
              <priority>0.9</priority>
            </url>
            <url>
              <loc>https://simonboisset.com/blog</loc>
              <lastmod>2022-08-26</lastmod>
              <changefreq>monthly</changefreq>
              <priority>0.7</priority>
            </url>
            <url>
              <loc>https://simonboisset.com/en/blog</loc>
              <lastmod>2022-08-26</lastmod>
              <changefreq>monthly</changefreq>
              <priority>0.5</priority>
            </url>
            <url>
              <loc>https://simonboisset.com/fr/blog</loc>
              <lastmod>2022-08-26</lastmod>
              <changefreq>monthly</changefreq>
              <priority>0.5</priority>
            </url>
          </urlset>
      `;
  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "xml-version": "1.0",
      encoding: "UTF-8"
    }
  });
};

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { version: "4140b887", entry: { module: "/build/entry.client-7ESLR3E2.js", imports: ["/build/_shared/chunk-MNV23YYP.js", "/build/_shared/chunk-Q3IECNXJ.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-DVZLK7U3.js", imports: void 0, hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/$lang._index/_index": { id: "routes/$lang._index/_index", parentId: "root", path: ":lang", index: !0, caseSensitive: void 0, module: "/build/routes/$lang._index/_index-RWII426R.js", imports: ["/build/_shared/chunk-BZWV2JB4.js", "/build/_shared/chunk-P3B6MFU3.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/$lang.blog": { id: "routes/$lang.blog", parentId: "root", path: ":lang/blog", index: void 0, caseSensitive: void 0, module: "/build/routes/$lang.blog-RG32I2VS.js", imports: ["/build/_shared/chunk-M67U556Z.js", "/build/_shared/chunk-P3B6MFU3.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-Z4XBCATQ.js", imports: ["/build/_shared/chunk-BZWV2JB4.js", "/build/_shared/chunk-P3B6MFU3.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/blog": { id: "routes/blog", parentId: "root", path: "blog", index: void 0, caseSensitive: void 0, module: "/build/routes/blog-WLERSZOQ.js", imports: ["/build/_shared/chunk-M67U556Z.js", "/build/_shared/chunk-P3B6MFU3.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/robots[.]txt": { id: "routes/robots[.]txt", parentId: "root", path: "robots.txt", index: void 0, caseSensitive: void 0, module: "/build/routes/robots[.]txt-XSXDIZ3Q.js", imports: void 0, hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/sitemap[.]xml": { id: "routes/sitemap[.]xml", parentId: "root", path: "sitemap.xml", index: void 0, caseSensitive: void 0, module: "/build/routes/sitemap[.]xml-GOS7Y3UJ.js", imports: void 0, hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 } }, url: "/build/manifest-4140B887.js" };

// server-entry-module:@remix-run/dev/server-build
var assetsBuildDirectory = "public/build", publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/$lang._index/_index": {
    id: "routes/$lang._index/_index",
    parentId: "root",
    path: ":lang",
    index: !0,
    caseSensitive: void 0,
    module: index_exports
  },
  "routes/$lang.blog": {
    id: "routes/$lang.blog",
    parentId: "root",
    path: ":lang/blog",
    index: void 0,
    caseSensitive: void 0,
    module: lang_blog_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: index_exports2
  },
  "routes/blog": {
    id: "routes/blog",
    parentId: "root",
    path: "blog",
    index: void 0,
    caseSensitive: void 0,
    module: blog_exports
  },
  "routes/robots[.]txt": {
    id: "routes/robots[.]txt",
    parentId: "root",
    path: "robots.txt",
    index: void 0,
    caseSensitive: void 0,
    module: robots_txt_exports
  },
  "routes/sitemap[.]xml": {
    id: "routes/sitemap[.]xml",
    parentId: "root",
    path: "sitemap.xml",
    index: void 0,
    caseSensitive: void 0,
    module: sitemap_xml_exports
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  assetsBuildDirectory,
  entry,
  publicPath,
  routes
});
