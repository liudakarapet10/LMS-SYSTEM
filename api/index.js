var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
)), __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
  assets: () => assets_manifest_default,
  assetsBuildDirectory: () => assetsBuildDirectory,
  entry: () => entry,
  future: () => future,
  publicPath: () => publicPath,
  routes: () => routes
});
module.exports = __toCommonJS(stdin_exports);

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
var import_node_stream = require("node:stream"), import_node = require("@remix-run/node"), import_react = require("@remix-run/react"), import_isbot = __toESM(require("isbot")), import_server = require("react-dom/server"), import_jsx_dev_runtime = require("react/jsx-dev-runtime"), ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return (0, import_isbot.default)(request.headers.get("user-agent")) ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = (0, import_server.renderToPipeableStream)(
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        import_react.RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "app/entry.server.tsx",
          lineNumber: 48,
          columnNumber: 7
        },
        this
      ),
      {
        onAllReady() {
          shellRendered = !0;
          let body = new import_node_stream.PassThrough(), stream = (0, import_node.createReadableStreamFromReadable)(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = (0, import_server.renderToPipeableStream)(
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        import_react.RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "app/entry.server.tsx",
          lineNumber: 98,
          columnNumber: 7
        },
        this
      ),
      {
        onShellReady() {
          shellRendered = !0;
          let body = new import_node_stream.PassThrough(), stream = (0, import_node.createReadableStreamFromReadable)(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links
});
var import_react2 = require("@remix-run/react");

// app/styles/app.css
var app_default = "/build/_assets/app-2IZZEZNR.css";

// app/root.tsx
var import_jsx_dev_runtime2 = require("react/jsx-dev-runtime"), links = () => [{ rel: "stylesheet", href: app_default }];
function App() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("html", { lang: "en", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("meta", { charSet: "utf-8" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 23,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 24,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.Meta, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 25,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.Links, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 26,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 22,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("body", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.Outlet, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 29,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.ScrollRestoration, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 30,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.Scripts, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 31,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.LiveReload, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 32,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 28,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 21,
    columnNumber: 5
  }, this);
}

// app/routes/home.school-diary.tsx
var home_school_diary_exports = {};
__export(home_school_diary_exports, {
  action: () => action,
  default: () => SchoolDiary,
  loader: () => loader
});
var import_react3 = require("@remix-run/react");

// app/utils/prisma.server.ts
var import_client = require("@prisma/client"), prisma;
global.__db || (global.__db = new import_client.PrismaClient(), global.__db.$connect()), prisma = global.__db;

// app/utils/auth.server.ts
var import_node2 = require("@remix-run/node");

// app/utils/user.server.ts
var import_bcryptjs = __toESM(require("bcryptjs"));
var createUser = async (user) => {
  let passwordHash = await import_bcryptjs.default.hash(user.password, 10);
  return { id: (await prisma.teacher.create({
    data: {
      email: user.email,
      password: passwordHash,
      profile: {
        firstName: user.firstName,
        lastName: user.lastName
      }
    }
  })).id, email: user.email };
}, getUserById = async (userId) => prisma.teacher.findMany({
  where: {
    id: userId
  }
});

// app/utils/auth.server.ts
var import_bcryptjs2 = __toESM(require("bcryptjs")), sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret)
  throw new Error("SESSION_SECRET must be set");
var storage = (0, import_node2.createCookieSessionStorage)({
  cookie: {
    name: "lms-session",
    secure: !1,
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: !0
  }
});
async function createUserSession(userId, redirectTo) {
  let session = await storage.getSession();
  return session.set("userId", userId), (0, import_node2.redirect)(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session)
    }
  });
}
async function register(user) {
  if (await prisma.teacher.count({ where: { email: user.email } }))
    return (0, import_node2.json)(
      { error: "User already exists with that email" },
      { status: 400 }
    );
  let newUser = await createUser(user);
  return newUser ? createUserSession(newUser.id, "/") : (0, import_node2.json)(
    {
      error: "Something went wrong trying to create a new user.",
      fields: { email: user.email, password: user.password }
    },
    { status: 400 }
  );
}
async function login({ email, password }) {
  let user = await prisma.teacher.findUnique({
    where: { email }
  });
  return !user || !await import_bcryptjs2.default.compare(password, user.password) ? (0, import_node2.json)({ error: "Incorrect login" }, { status: 400 }) : createUserSession(user.id, "/");
}
async function requireUserId(request, redirectTo = new URL(request.url).pathname) {
  let userId = (await getUserSession(request)).get("userId");
  if (!userId || typeof userId != "string") {
    let searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw (0, import_node2.redirect)(`/login?${searchParams}`);
  }
  return userId;
}
function getUserSession(request) {
  return storage.getSession(request.headers.get("Cookie"));
}
async function getUserId(request) {
  let userId = (await getUserSession(request)).get("userId");
  return !userId || typeof userId != "string" ? null : userId;
}
async function getUser(request) {
  let userId = await getUserId(request);
  if (typeof userId != "string")
    return null;
  try {
    return await prisma.teacher.findUnique({
      where: { id: userId },
      select: { id: !0, email: !0, profile: !0 }
    });
  } catch {
    throw logout(request);
  }
}
async function logout(request) {
  let session = await getUserSession(request);
  return (0, import_node2.redirect)("/login", {
    headers: {
      "Set-Cookie": await storage.destroySession(session)
    }
  });
}

// app/utils/teacher.server.ts
var getAllLessonsByTeacherId = async (teacherId) => await prisma.lesson.findMany({
  where: {
    teacherId
  }
}), createLessonByTeacher = async (teacherId, name, time, location) => (console.log(teacherId, name, time, location), await prisma.lesson.create({
  data: {
    name,
    time,
    location,
    teacher: {
      connect: {
        id: teacherId
      }
    }
  }
}));

// app/routes/home.school-diary.tsx
var import_jsx_dev_runtime3 = require("react/jsx-dev-runtime"), loader = async ({ request }) => {
  let teacherId = await getUserId(request);
  return teacherId ? await getAllLessonsByTeacherId(teacherId) : null;
}, action = async ({ request }) => {
  let teacherId = await getUserId(request);
  if (!teacherId)
    return null;
  let form = await request.formData(), name = form.get("name"), time = form.get("time"), location = form.get("location");
  return typeof name != "string" || typeof time != "string" || typeof location != "string" || typeof teacherId != "string" ? null : await createLessonByTeacher(teacherId, name, time, location);
};
function SchoolDiary() {
  let data = (0, import_react3.useLoaderData)();
  return console.log(111, data), /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { children: [
    "diary",
    data.length > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("ul", { children: data.map((e) => /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("li", { children: [
      e.name,
      " - ",
      e.time,
      " - ",
      e.location
    ] }, e.id, !0, {
      fileName: "app/routes/home.school-diary.tsx",
      lineNumber: 36,
      columnNumber: 24
    }, this)) }, void 0, !1, {
      fileName: "app/routes/home.school-diary.tsx",
      lineNumber: 35,
      columnNumber: 23
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_react3.Form, { method: "post", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("label", { children: [
        "Name(MATH)",
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("input", { type: "text", name: "name", className: "border" }, void 0, !1, {
          fileName: "app/routes/home.school-diary.tsx",
          lineNumber: 44,
          columnNumber: 1
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/home.school-diary.tsx",
        lineNumber: 42,
        columnNumber: 3
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("label", { children: [
        "Time",
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("input", { type: "text", name: "time", className: "border" }, void 0, !1, {
          fileName: "app/routes/home.school-diary.tsx",
          lineNumber: 49,
          columnNumber: 1
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/home.school-diary.tsx",
        lineNumber: 47,
        columnNumber: 3
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("label", { children: [
        "Border",
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("input", { type: "text", name: "location", className: "border" }, void 0, !1, {
          fileName: "app/routes/home.school-diary.tsx",
          lineNumber: 54,
          columnNumber: 1
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/home.school-diary.tsx",
        lineNumber: 52,
        columnNumber: 3
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("button", { children: "Submit" }, void 0, !1, {
        fileName: "app/routes/home.school-diary.tsx",
        lineNumber: 56,
        columnNumber: 1
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/home.school-diary.tsx",
      lineNumber: 40,
      columnNumber: 1
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/home.school-diary.tsx",
    lineNumber: 34,
    columnNumber: 10
  }, this);
}

// app/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  loader: () => loader2
});
var import_node3 = require("@remix-run/node");
var loader2 = async ({ request }) => (await requireUserId(request), (0, import_node3.redirect)("/home"));

// app/routes/logout.tsx
var logout_exports = {};
__export(logout_exports, {
  action: () => action2,
  loader: () => loader3
});
var import_node4 = require("@remix-run/node");
var action2 = async ({ request }) => logout(request), loader3 = async () => (0, import_node4.redirect)("/");

// app/routes/login.tsx
var login_exports = {};
__export(login_exports, {
  action: () => action3,
  default: () => Login,
  loader: () => loader4
});
var import_react5 = require("react"), import_react6 = require("@remix-run/react"), import_react7 = require("react");

// app/components/layout.tsx
var import_jsx_dev_runtime4 = require("react/jsx-dev-runtime");
function Layout({ children }) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "h-screen w-full bg-blue-600 font-mono", children }, void 0, !1, {
    fileName: "app/components/layout.tsx",
    lineNumber: 3,
    columnNumber: 5
  }, this);
}

// app/components/form-fields.tsx
var import_react4 = require("react"), import_jsx_dev_runtime5 = require("react/jsx-dev-runtime");
function FormField({
  htmlFor,
  label,
  type = "text",
  value,
  onChange = () => {
  },
  error = ""
}) {
  let [errorText, setErrorText] = (0, import_react4.useState)(error);
  return (0, import_react4.useEffect)(() => {
    setErrorText(error);
  }, [error]), /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_jsx_dev_runtime5.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("label", { htmlFor, className: "text-blue-600 font-semibold", children: label }, void 0, !1, {
      fileName: "app/components/form-fields.tsx",
      lineNumber: 26,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("input", { onChange: (e) => {
      onChange(e), setErrorText("");
    }, type, id: htmlFor, name: htmlFor, className: "w-full p-2 rounded-xl my-2", value }, void 0, !1, {
      fileName: "app/components/form-fields.tsx",
      lineNumber: 29,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "text-xs font-semibold text-center tracking-wide text-red-500 w-full", children: errorText || "" }, void 0, !1, {
      fileName: "app/components/form-fields.tsx",
      lineNumber: 33,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/form-fields.tsx",
    lineNumber: 25,
    columnNumber: 5
  }, this);
}

// app/routes/login.tsx
var import_node5 = require("@remix-run/node");

// app/utils/validators.server.ts
var validateEmail = (email) => {
  var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!email.length || !validRegex.test(email))
    return "Please enter a valid email address";
}, validatePassword = (password) => {
  if (password.length < 5)
    return "Please enter a password that is at least 5 characters long";
}, validateName = (name) => {
  if (!name.length)
    return "Please enter a value";
};

// app/routes/login.tsx
var import_jsx_dev_runtime6 = require("react/jsx-dev-runtime"), loader4 = async ({ request }) => await getUser(request) ? (0, import_node5.redirect)("/") : null, action3 = async ({ request }) => {
  let form = await request.formData(), action4 = form.get("_action"), firstName = form.get("firstName"), lastName = form.get("lastName"), email = form.get("email"), password = form.get("password");
  if (typeof action4 != "string" || typeof email != "string" || typeof password != "string")
    return (0, import_node5.json)({ error: "Invalid Form Data", form: action4 }, { status: 400 });
  if (action4 === "register" && (typeof firstName != "string" || typeof lastName != "string"))
    return (0, import_node5.json)({ error: "Invalid Form Data", form: action4 }, { status: 400 });
  let errors = {
    email: validateEmail(email),
    password: validatePassword(password),
    ...action4 === "register" ? {
      firstName: validateName(firstName || ""),
      lastName: validateName(lastName || "")
    } : {}
  };
  if (Object.values(errors).some(Boolean))
    return (0, import_node5.json)({ errors, fields: { email, password, firstName, lastName }, form: action4 }, { status: 400 });
  switch (action4) {
    case "login":
      return await login({ email, password });
    case "register":
      return firstName = firstName, lastName = lastName, await register({ email, password, firstName, lastName });
    default:
      return (0, import_node5.json)({ error: "Invalid Form Data" }, { status: 400 });
  }
};
function Login() {
  var _a, _b, _c, _d;
  let [action4, setAction] = (0, import_react5.useState)("login"), actionData = (0, import_react6.useActionData)(), firstLoad = (0, import_react7.useRef)(!0), [errors, setErrors] = (0, import_react5.useState)((actionData == null ? void 0 : actionData.errors) || {}), [formError, setFormError] = (0, import_react5.useState)((actionData == null ? void 0 : actionData.error) || ""), [formData, setFormData] = (0, import_react5.useState)({
    email: ((_a = actionData == null ? void 0 : actionData.fields) == null ? void 0 : _a.email) || "",
    password: ((_b = actionData == null ? void 0 : actionData.fields) == null ? void 0 : _b.password) || "",
    firstName: ((_c = actionData == null ? void 0 : actionData.fields) == null ? void 0 : _c.lastName) || "",
    lastName: ((_d = actionData == null ? void 0 : actionData.fields) == null ? void 0 : _d.firstName) || ""
  }), handleInputChange = (event, fields) => {
    setFormData((form) => ({ ...form, [fields]: event.target.value }));
  };
  return (0, import_react7.useEffect)(() => {
    if (!firstLoad.current) {
      let newState = {
        email: "",
        password: "",
        firstName: "",
        lastName: ""
      };
      setErrors(newState), setFormError(""), setFormData(newState);
    }
  }, [action4]), (0, import_react7.useEffect)(() => {
    firstLoad.current || setFormError("");
  }, [formData]), (0, import_react7.useEffect)(() => {
    firstLoad.current = !1;
  }, []), /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(Layout, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
      "button",
      {
        onClick: () => setAction(action4 == "login" ? "register" : "login"),
        className: "absolute top-8 right-8 rounded-xl bg-yellow-300 font-semibold text-blue-600 px-3 py-2 transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1",
        children: action4 === "login" ? "\u0417\u0430\u0440\u0435\u0454\u0441\u0442\u0440\u0443\u0432\u0430\u0442\u0438\u0441\u044F" : "\u0423\u0432\u0456\u0439\u0442\u0438"
      },
      void 0,
      !1,
      {
        fileName: "app/routes/login.tsx",
        lineNumber: 121,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "h-full justify-center items-center flex flex-col gap-y-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("h2", { className: "text-5xl font-extrabold text-yellow-300", children: "\u0412\u0430\u0441 \u0432\u0456\u0442\u0430\u0454 \u043D\u0430\u0432\u0447\u0430\u043B\u044C\u043D\u0430 \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u0430 EduForAll!" }, void 0, !1, {
        fileName: "app/routes/login.tsx",
        lineNumber: 128,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("form", { method: "post", className: "rounded-2xl bg-gray-200 p-6 w-96", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "text-xs font-semibold text-center tracking-wide text-red-500 w-full", children: formError }, void 0, !1, {
          fileName: "app/routes/login.tsx",
          lineNumber: 133,
          columnNumber: 9
        }, this),
        action4 === "register" && /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_jsx_dev_runtime6.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
            FormField,
            {
              htmlFor: "firstName",
              label: "\u0406\u043C'\u044F",
              onChange: (e) => handleInputChange(e, "firstName"),
              value: formData.firstName,
              error: errors == null ? void 0 : errors.firstName
            },
            void 0,
            !1,
            {
              fileName: "app/routes/login.tsx",
              lineNumber: 136,
              columnNumber: 15
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
            FormField,
            {
              htmlFor: "lastName",
              label: "\u041F\u0440\u0456\u0437\u0432\u0438\u0449\u0435",
              onChange: (e) => handleInputChange(e, "lastName"),
              value: formData.lastName,
              error: errors == null ? void 0 : errors.lastName
            },
            void 0,
            !1,
            {
              fileName: "app/routes/login.tsx",
              lineNumber: 144,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/login.tsx",
          lineNumber: 135,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
          FormField,
          {
            htmlFor: "email",
            label: "\u0415\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u0430 \u043F\u043E\u0448\u0442\u0430",
            value: formData.email,
            onChange: (e) => handleInputChange(e, "email"),
            error: errors == null ? void 0 : errors.email
          },
          void 0,
          !1,
          {
            fileName: "app/routes/login.tsx",
            lineNumber: 155,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
          FormField,
          {
            htmlFor: "password",
            label: "\u041F\u0430\u0440\u043E\u043B\u044C",
            value: formData.password,
            onChange: (e) => handleInputChange(e, "password"),
            error: errors == null ? void 0 : errors.password
          },
          void 0,
          !1,
          {
            fileName: "app/routes/login.tsx",
            lineNumber: 163,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "w-full text-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
          "button",
          {
            type: "submit",
            name: "_action",
            value: action4,
            className: "rounded-xl mt-2 bg-yellow-300 px-3 py-2 text-blue-600 font-semibold transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1",
            children: action4 === "login" ? "\u0423\u0432\u0456\u0439\u0442\u0438" : "\u0417\u0430\u0440\u0435\u0454\u0441\u0442\u0440\u0443\u0432\u0430\u0442\u0438\u0441\u044F"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/login.tsx",
            lineNumber: 172,
            columnNumber: 13
          },
          this
        ) }, void 0, !1, {
          fileName: "app/routes/login.tsx",
          lineNumber: 171,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/login.tsx",
        lineNumber: 132,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/login.tsx",
      lineNumber: 127,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/login.tsx",
    lineNumber: 120,
    columnNumber: 5
  }, this);
}

// app/routes/home.tsx
var home_exports = {};
__export(home_exports, {
  default: () => Home,
  loader: () => loader5
});
var import_react10 = require("@remix-run/react");
var import_react11 = require("react");

// app/components/userInfo.tsx
var import_jsx_dev_runtime7 = require("react/jsx-dev-runtime");
function UserInfo({ profile }) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(
    "div",
    {
      className: "flex justify-center items-center",
      children: /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("h2", { children: [
        profile.firstName,
        " ",
        profile.lastName
      ] }, void 0, !0, {
        fileName: "app/components/userInfo.tsx",
        lineNumber: 12,
        columnNumber: 7
      }, this)
    },
    void 0,
    !1,
    {
      fileName: "app/components/userInfo.tsx",
      lineNumber: 9,
      columnNumber: 5
    },
    this
  );
}

// app/components/schoolDiaryToolbar.tsx
var import_react9 = require("react");

// app/components/dropDowmMenu.tsx
var import_react8 = require("react"), import_jsx_dev_runtime8 = require("react/jsx-dev-runtime"), DropdownMenu = ({
  options,
  title,
  onSelect,
  isOpen,
  onToggle
}) => {
  let [selectedOption, setSelectedOption] = (0, import_react8.useState)(), dropdownRef = (0, import_react8.useRef)(null), handleOptionSelect = (option) => {
    setSelectedOption(option), onSelect(option), onToggle();
  }, handleClickOutside = (event) => {
    dropdownRef.current && !dropdownRef.current.contains(event.target) && onToggle();
  };
  return (0, import_react8.useEffect)(() => (isOpen && window.addEventListener("click", handleClickOutside), () => {
    window.removeEventListener("click", handleClickOutside);
  }), [isOpen]), /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", { className: "relative inline-block text-left", ref: dropdownRef, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(
      "button",
      {
        onClick: onToggle,
        className: "flex items-center text-sm font-medium text-gray-700 bg-gray-200 px-4 py-2 rounded-md focus:outline-none focus-visible:ring focus-visible:ring-blue-300 focus-visible:ring-opacity-75",
        children: [
          selectedOption ? selectedOption.label : title,
          /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: `ml-2 transform ${isOpen ? "rotate-180" : "rotate-0"} transition-transform duration-300 ease-in-out`, children: /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 9l-7 7-7-7" }, void 0, !1, {
            fileName: "app/components/dropDowmMenu.tsx",
            lineNumber: 59,
            columnNumber: 13
          }, this) }, void 0, !1, {
            fileName: "app/components/dropDowmMenu.tsx",
            lineNumber: 58,
            columnNumber: 11
          }, this) }, void 0, !1, {
            fileName: "app/components/dropDowmMenu.tsx",
            lineNumber: 57,
            columnNumber: 9
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/components/dropDowmMenu.tsx",
        lineNumber: 52,
        columnNumber: 7
      },
      this
    ),
    isOpen && /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("ul", { className: "origin-top-right absolute right-0 mt-2 w-48 py-2 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg", children: options.map((option) => /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(
      "li",
      {
        onClick: () => handleOptionSelect(option),
        className: "px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100",
        children: option.label
      },
      option.value,
      !1,
      {
        fileName: "app/components/dropDowmMenu.tsx",
        lineNumber: 66,
        columnNumber: 13
      },
      this
    )) }, void 0, !1, {
      fileName: "app/components/dropDowmMenu.tsx",
      lineNumber: 64,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/dropDowmMenu.tsx",
    lineNumber: 51,
    columnNumber: 5
  }, this);
};

// app/components/schoolDiaryToolbar.tsx
var import_jsx_dev_runtime9 = require("react/jsx-dev-runtime"), classesOptions = [
  { value: "class1", label: "Class 1" },
  { value: "class2", label: "Class 2" },
  { value: "class3", label: "Class 3" }
], monthsOptions = [
  { value: "c\u0456\u0447\u0435\u043D\u044C", label: "\u0421\u0456\u0447\u0435\u043D\u044C" },
  { value: "\u043B\u044E\u0442\u0438\u0439", label: "\u041B\u044E\u0442\u0438\u0439" },
  { value: "\u0431\u0435\u0440\u0435\u0437\u0435\u043D\u044C", label: "\u0411\u0435\u0440\u0435\u0437\u0435\u043D\u044C" },
  { value: "\u043A\u0432\u0456\u0442\u0435\u043D\u044C", label: "\u041A\u0432\u0456\u0442\u0435\u043D\u044C" },
  { value: "\u0442\u0440\u0430\u0432\u0435\u043D\u044C", label: "\u0422\u0440\u0430\u0432\u0435\u043D\u044C" },
  { value: "\u0447\u0435\u0440\u0430\u0432\u0435\u043D\u044C", label: "\u0427\u0435\u0440\u0430\u0432\u0435\u043D\u044C" },
  { value: "\u043B\u0438\u043F\u0435\u043D\u044C", label: "\u041B\u0438\u043F\u0435\u043D\u044C" },
  { value: "\u0441\u0435\u0440\u043F\u0435\u043D\u044C", label: "\u0421\u0435\u0440\u043F\u0435\u043D\u044C" },
  { value: "\u0432\u0435\u0440\u0435\u0441\u0435\u043D\u044C", label: "\u0412\u0435\u0440\u0435\u0441\u0435\u043D\u044C" },
  { value: "\u0436\u043E\u0432\u0442\u0435\u043D\u044C", label: "\u0416\u043E\u0432\u0442\u0435\u043D\u044C" },
  { value: "\u043B\u0438\u0441\u0442\u043E\u043F\u0430\u0434", label: "\u041B\u0438\u0441\u0442\u043E\u043F\u0430\u0434" },
  { value: "\u0433\u0440\u0443\u0434\u0435\u043D\u044C", label: "\u0413\u0440\u0443\u0434\u0435\u043D\u044C" }
], lessonsOptions = [
  { value: "\u043C\u0430\u0442\u0435\u043C\u0430\u0442\u0438\u043A\u0430", label: "\u041C\u0430\u0442\u0435\u043C\u0430\u0442\u0438\u043A\u0430" },
  { value: "\u0444\u0456\u0437\u0438\u043A\u0430", label: "\u0424\u0456\u0437\u0438\u043A\u0430" },
  { value: "\u0456\u0441\u0442\u043E\u0440\u0456\u044F", label: "\u0406\u0441\u0442\u043E\u0440\u0456\u044F" },
  { value: "\u0443\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0430_\u043C\u043E\u0432\u0430", label: "\u0423\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0430 \u043C\u043E\u0432\u0430" },
  { value: "\u0444\u0456\u0437\u043A\u0443\u043B\u044C\u0442\u0443\u0440\u0430", label: "\u0424\u0456\u0437\u043A\u0443\u043B\u044C\u0442\u0443\u0440\u0430" },
  { value: "\u0437\u0430\u0440\u0443\u0431\u0456\u0436\u043D\u0430_\u043B\u0456\u0442\u0435\u0440\u0430\u0442\u0443\u0440\u0430", label: "\u0417\u0430\u0440\u0443\u0431\u0456\u0436\u043D\u0430 \u043B\u0456\u0442\u0435\u0440\u0430\u0442\u0443\u0440\u0430" }
];
function SchoolDiaryToolbar() {
  let [openMenus, setOpenMenus] = (0, import_react9.useState)({
    class: !1,
    month: !1,
    lesson: !1
  }), handleMenuToggle = (menuName) => {
    let updatedOpenMenus = { class: !1, month: !1, lesson: !1 };
    updatedOpenMenus[menuName] = !0, setOpenMenus(updatedOpenMenus);
  }, handleClassSelect = (selectedOption) => {
    console.log("Selected class:", selectedOption), handleMenuToggle("class");
  }, handleMonthSelect = (selectedOption) => {
    console.log("Selected month", selectedOption), handleMenuToggle("month");
  }, handleLessonSelect = (selectedOption) => {
    console.log("Selected lesson:", selectedOption), handleMenuToggle("lesson");
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "flex flex-row gap-3", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
      DropdownMenu,
      {
        options: classesOptions,
        title: "\u041E\u0431\u0435\u0440\u0456\u0442\u044C \u043A\u043B\u0430\u0441\u0441",
        onSelect: handleClassSelect,
        isOpen: openMenus.class,
        onToggle: () => handleMenuToggle("class")
      },
      void 0,
      !1,
      {
        fileName: "app/components/schoolDiaryToolbar.tsx",
        lineNumber: 72,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
      DropdownMenu,
      {
        options: monthsOptions,
        title: "\u041E\u0431\u0435\u0440\u0456\u0442\u044C \u043C\u0456\u0441\u044F\u0446\u044C",
        onSelect: handleMonthSelect,
        isOpen: openMenus.month,
        onToggle: () => handleMenuToggle("month")
      },
      void 0,
      !1,
      {
        fileName: "app/components/schoolDiaryToolbar.tsx",
        lineNumber: 79,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
      DropdownMenu,
      {
        options: lessonsOptions,
        title: "\u041E\u0431\u0435\u0440\u0456\u0442\u044C \u043F\u0440\u0435\u0434\u043C\u0435\u0442",
        onSelect: handleLessonSelect,
        isOpen: openMenus.lesson,
        onToggle: () => handleMenuToggle("lesson")
      },
      void 0,
      !1,
      {
        fileName: "app/components/schoolDiaryToolbar.tsx",
        lineNumber: 86,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/components/schoolDiaryToolbar.tsx",
    lineNumber: 71,
    columnNumber: 5
  }, this);
}

// app/components/diary.tsx
var import_jsx_dev_runtime10 = require("react/jsx-dev-runtime");
function SchoolDiary2() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(SchoolDiaryToolbar, {}, void 0, !1, {
    fileName: "app/components/diary.tsx",
    lineNumber: 14,
    columnNumber: 6
  }, this) }, void 0, !1, {
    fileName: "app/components/diary.tsx",
    lineNumber: 13,
    columnNumber: 5
  }, this);
}

// app/components/schedule.tsx
var import_jsx_dev_runtime11 = require("react/jsx-dev-runtime");
function ScheduleComponent() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(
    "div",
    {
      className: "flex justify-center items-center",
      children: /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("h2", { children: "ScheduleComponent" }, void 0, !1, {
        fileName: "app/components/schedule.tsx",
        lineNumber: 7,
        columnNumber: 9
      }, this)
    },
    void 0,
    !1,
    {
      fileName: "app/components/schedule.tsx",
      lineNumber: 4,
      columnNumber: 7
    },
    this
  );
}

// app/components/somethingElse.tsx
var import_jsx_dev_runtime12 = require("react/jsx-dev-runtime");
function SomethingElseComponent() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(
    "div",
    {
      className: "flex justify-center items-center",
      children: /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("h2", { children: "SomethingElseComponent" }, void 0, !1, {
        fileName: "app/components/somethingElse.tsx",
        lineNumber: 7,
        columnNumber: 9
      }, this)
    },
    void 0,
    !1,
    {
      fileName: "app/components/somethingElse.tsx",
      lineNumber: 4,
      columnNumber: 7
    },
    this
  );
}

// app/components/navItem.tsx
var import_jsx_dev_runtime13 = require("react/jsx-dev-runtime");
function NavItem({
  text,
  isActive = !1,
  id,
  onClick,
  onKeyDown,
  tabIndex
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("li", { className: `w-full ${isActive ? "text-[#2464EB] focus-visible:outline-none" : "cursor-pointer hover:text-[#2464EB]"}`, children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(
    "a",
    {
      className: `block w-full ${isActive ? "focus:outline-none" : ""}`,
      "aria-current": isActive ? "page" : void 0,
      id,
      onClick,
      onKeyDown,
      tabIndex,
      children: text
    },
    void 0,
    !1,
    {
      fileName: "app/components/navItem.tsx",
      lineNumber: 23,
      columnNumber: 7
    },
    this
  ) }, void 0, !1, {
    fileName: "app/components/navItem.tsx",
    lineNumber: 22,
    columnNumber: 5
  }, this);
}

// app/components/logoutComponent.tsx
var import_jsx_dev_runtime14 = require("react/jsx-dev-runtime"), LogoutComponent = () => /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", { className: "text-center p-6 bg-gray-300", children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("form", { action: "/logout", method: "post", children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(
  "button",
  {
    type: "submit",
    className: "rounded-xl bg-yellow-300 font-semibold text-blue-600 px-3 py-2 transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1",
    children: "\u0412\u0438\u0445\u0456\u0434"
  },
  void 0,
  !1,
  {
    fileName: "app/components/logoutComponent.tsx",
    lineNumber: 5,
    columnNumber: 11
  },
  this
) }, void 0, !1, {
  fileName: "app/components/logoutComponent.tsx",
  lineNumber: 4,
  columnNumber: 9
}, this) }, void 0, !1, {
  fileName: "app/components/logoutComponent.tsx",
  lineNumber: 3,
  columnNumber: 9
}, this);

// app/components/user-welcome.tsx
var import_jsx_dev_runtime15 = require("react/jsx-dev-runtime");
function UserWelcome({ profile }) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(
    "div",
    {
      className: "flex justify-center items-center",
      children: /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("h2", { children: [
        "\u0412\u0456\u0442\u0430\u044E, ",
        profile.firstName,
        " ",
        profile.lastName
      ] }, void 0, !0, {
        fileName: "app/components/user-welcome.tsx",
        lineNumber: 12,
        columnNumber: 7
      }, this)
    },
    void 0,
    !1,
    {
      fileName: "app/components/user-welcome.tsx",
      lineNumber: 9,
      columnNumber: 5
    },
    this
  );
}

// app/routes/home.tsx
var import_jsx_dev_runtime16 = require("react/jsx-dev-runtime"), loader5 = async ({ request }) => {
  let userId = await requireUserId(request);
  return { user: await getUserById(userId) };
};
function Home() {
  let [activeTab, setActiveTab] = (0, import_react11.useState)(0), menuItems = ["\u0413\u043E\u043B\u043E\u0432\u043D\u0430 \u0441\u0442\u043E\u0440\u0456\u043D\u043A\u0430", "\u0429\u043E\u0434\u0435\u043D\u043D\u0438\u043A", "\u0420\u043E\u0437\u043A\u043B\u0430\u0434", "\u0429\u0435 \u0449\u043E\u0441\u044C)"];
  (0, import_react11.useEffect)(() => {
    let activeTabElement = document.getElementById(`nav-item-${activeTab}`);
    activeTabElement && activeTabElement.focus();
  }, [activeTab]);
  let handleTabClick = (index) => {
    setActiveTab(index);
  }, handleKeyPress = (e) => {
    e.key === "ArrowDown" && activeTab < 3 ? (setActiveTab(activeTab + 1), console.log(activeTab)) : e.key === "ArrowUp" && activeTab > 0 && setActiveTab(activeTab - 1);
  }, { user = [] } = (0, import_react10.useLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(Layout, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", { className: "h-full flex", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", { className: "w-1/6 bg-gray-200 flex flex-col", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", { className: "text-center bg-gray-300 h-20 flex items-center justify-center", children: user && user.map((user2) => /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(UserWelcome, { profile: user2.profile }, user2.id, !1, {
        fileName: "app/routes/home.tsx",
        lineNumber: 58,
        columnNumber: 17
      }, this)) }, void 0, !1, {
        fileName: "app/routes/home.tsx",
        lineNumber: 55,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", { className: "flex-1 overflow-y-scroll py-4 flex flex-col gap-y-10", children: /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("nav", { className: "w-auto px-3.5", "aria-label": "Main Navigation", children: /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("ul", { className: "flex flex-col gap-[10px]", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(import_react10.NavLink, { to: "school-diary", children: "\u0429\u043E\u0434\u0435\u043D\u043D\u0438\u043A!" }, void 0, !1, {
          fileName: "app/routes/home.tsx",
          lineNumber: 65,
          columnNumber: 17
        }, this),
        menuItems.map((text, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(
          NavItem,
          {
            text,
            id: `nav-item-${index}`,
            isActive: activeTab === index,
            onClick: () => handleTabClick(index),
            onKeyDown: handleKeyPress,
            tabIndex: 0
          },
          index,
          !1,
          {
            fileName: "app/routes/home.tsx",
            lineNumber: 67,
            columnNumber: 19
          },
          this
        ))
      ] }, void 0, !0, {
        fileName: "app/routes/home.tsx",
        lineNumber: 63,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "app/routes/home.tsx",
        lineNumber: 62,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/home.tsx",
        lineNumber: 61,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(LogoutComponent, {}, void 0, !1, {
        fileName: "app/routes/home.tsx",
        lineNumber: 80,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/home.tsx",
      lineNumber: 54,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", { children: [
      activeTab === 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(
        UserInfo,
        {
          profile: {
            firstName: "",
            lastName: ""
          }
        },
        void 0,
        !1,
        {
          fileName: "app/routes/home.tsx",
          lineNumber: 84,
          columnNumber: 13
        },
        this
      ),
      activeTab === 1 && /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(SchoolDiary2, {}, void 0, !1, {
        fileName: "app/routes/home.tsx",
        lineNumber: 91,
        columnNumber: 31
      }, this),
      activeTab === 2 && /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(ScheduleComponent, {}, void 0, !1, {
        fileName: "app/routes/home.tsx",
        lineNumber: 92,
        columnNumber: 31
      }, this),
      activeTab === 3 && /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(SomethingElseComponent, {}, void 0, !1, {
        fileName: "app/routes/home.tsx",
        lineNumber: 93,
        columnNumber: 31
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(import_react10.Outlet, {}, void 0, !1, {
        fileName: "app/routes/home.tsx",
        lineNumber: 94,
        columnNumber: 7
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/home.tsx",
      lineNumber: 82,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/home.tsx",
    lineNumber: 53,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/home.tsx",
    lineNumber: 52,
    columnNumber: 5
  }, this);
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-Q32CXMWY.js", imports: ["/build/_shared/chunk-QGWAMMQ2.js", "/build/_shared/chunk-IU43IUTG.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-G27XXZGN.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-BEJHOLRS.js", imports: void 0, hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/home": { id: "routes/home", parentId: "root", path: "home", index: void 0, caseSensitive: void 0, module: "/build/routes/home-NPH2UGYU.js", imports: ["/build/_shared/chunk-47XEPCMN.js", "/build/_shared/chunk-KZU7IX6N.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/home.school-diary": { id: "routes/home.school-diary", parentId: "routes/home", path: "school-diary", index: void 0, caseSensitive: void 0, module: "/build/routes/home.school-diary-LZNRWZSR.js", imports: void 0, hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/login": { id: "routes/login", parentId: "root", path: "login", index: void 0, caseSensitive: void 0, module: "/build/routes/login-MJ4KZOBI.js", imports: ["/build/_shared/chunk-47XEPCMN.js", "/build/_shared/chunk-KZU7IX6N.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/logout": { id: "routes/logout", parentId: "root", path: "logout", index: void 0, caseSensitive: void 0, module: "/build/routes/logout-S5LWYBEX.js", imports: void 0, hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 } }, version: "fda0c340", hmr: void 0, url: "/build/manifest-FDA0C340.js" };

// server-entry-module:@remix-run/dev/server-build
var assetsBuildDirectory = "public/build", future = { v2_dev: !1, unstable_postcss: !1, unstable_tailwind: !1, v2_errorBoundary: !0, v2_headers: !0, v2_meta: !0, v2_normalizeFormMethod: !0, v2_routeConvention: !0 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/home.school-diary": {
    id: "routes/home.school-diary",
    parentId: "routes/home",
    path: "school-diary",
    index: void 0,
    caseSensitive: void 0,
    module: home_school_diary_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: index_exports
  },
  "routes/logout": {
    id: "routes/logout",
    parentId: "root",
    path: "logout",
    index: void 0,
    caseSensitive: void 0,
    module: logout_exports
  },
  "routes/login": {
    id: "routes/login",
    parentId: "root",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: login_exports
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: "home",
    index: void 0,
    caseSensitive: void 0,
    module: home_exports
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  assetsBuildDirectory,
  entry,
  future,
  publicPath,
  routes
});
//# sourceMappingURL=index.js.map
