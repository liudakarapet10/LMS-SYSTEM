import { Fragment, useState } from "react";
import {
  useActionData,
  useLoaderData,
  useSearchParams,
} from "@remix-run/react";
import { useRef, useEffect } from "react";
import { Layout } from "~/components/layout";
import { FormField } from "~/components/form-fields";
import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
} from "@remix-run/node";
import { login, register, getUser } from "~/utils/auth.server";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "~/utils/validators.server";
import { getAllClasses } from "~/utils/classroom.server";
import { DropdownMenu } from "~/components/dropDownMenu";
import { formOptionsFromArray } from "~/helpers/formHelpers";
import { Role } from "@prisma/client";

type ActionData = {
  errors: Record<string, string> | null;
  error: string | null;
  fields: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  } | null;
};

export const loader: LoaderFunction = async ({ request }) => {
  const classes = await getAllClasses();
  return (await getUser(request)) ? redirect("/") : json({ classes });
};

type IClassId = string | null;
export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const role = form.get("role");
  const action = form.get("_action");
  let firstName = form.get("firstName");
  let lastName = form.get("lastName");
  const email = form.get("email");
  const password = form.get("password");
  const classId = form.get("class_id");

  if (
    typeof action !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    return json({ error: `Invalid Form Data`, form: action }, { status: 400 });
  }

  if (
    action === "register" &&
    (typeof firstName !== "string" || typeof lastName !== "string")
  ) {
    return json({ error: `Invalid Form Data`, form: action }, { status: 400 });
  }
  const errors = {
    email: validateEmail(email),
    password: validatePassword(password),
    ...(action === "register"
      ? {
          firstName: validateName((firstName as string) || ""),
          lastName: validateName((lastName as string) || ""),
        }
      : {}),
  };

  if (Object.values(errors).some(Boolean))
    return json(
      {
        errors,
        fields: { email, password, firstName, lastName },
        form: action,
      },
      { status: 400 }
    );

  switch (action) {
    case "login": {
      return await login({ email, password }, role as Role);
    }
    case "register": {
      firstName = firstName as string;
      lastName = lastName as string;
      return await register(
        { email, password, firstName, lastName },
        role as Role,
        classId as IClassId
      );
    }
    default:
      return json({ error: `Invalid Form Data` }, { status: 400 });
  }
};

export default function Login() {
  const { classes } = useLoaderData();
  const [action, setAction] = useState("login");
  const [role, setRole] = useState("student");

  const actionData: ActionData | undefined = useActionData();
  const firstLoad = useRef(true);
  const [errors, setErrors] = useState(actionData?.errors || {});
  const [formError, setFormError] = useState(actionData?.error || "");

  const [formData, setFormData] = useState({
    email: actionData?.fields?.email || "",
    password: actionData?.fields?.password || "",
    firstName: actionData?.fields?.lastName || "",
    lastName: actionData?.fields?.firstName || "",
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fields: string
  ) => {
    setFormData((form) => ({ ...form, [fields]: event.target.value }));
  };

  useEffect(() => {
    if (!firstLoad.current) {
      const newState = {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
      };
      setErrors(newState);
      setFormError("");
      setFormData(newState);
    }
  }, [action]);

  useEffect(() => {
    if (!firstLoad.current) {
      setFormError("");
    }
  }, [formData]);

  useEffect(() => {
    firstLoad.current = false;
  }, []);

  return (
    <Fragment>
      <Layout>
        {role}
        <button
          onClick={() => setRole(role == "student" ? "teacher" : "student")}
          className="absolute top-8 left-8 rounded-xl bg-yellow-300 font-semibold text-blue-600 px-3 py-2 transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1"
        >
          {role === "student" ? "Учитель" : "Учень"}
        </button>
        <button
          onClick={() => setAction(action == "login" ? "register" : "login")}
          className="absolute top-8 right-8 rounded-xl bg-yellow-300 font-semibold text-blue-600 px-3 py-2 transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1"
        >
          {action === "login" ? "Зареєструватися" : "Увійти"}
        </button>
        <div className="h-full justify-center items-center flex flex-col gap-y-4">
          <h2 className="text-5xl font-extrabold text-yellow-300">
            Вас вітає навчальна платформа EduForAll!
          </h2>

          <form method="post" className="rounded-2xl bg-gray-200 p-6 w-96">
            <div className="text-xs font-semibold text-center tracking-wide text-red-500 w-full">
              {formError}
            </div>
            {action === "register" && (
              <>
                <FormField
                  htmlFor="firstName"
                  label="Ім'я"
                  ariaLabel="Введіть своє імʼя"
                  ariaRequired={true}
                  onChange={(e) => handleInputChange(e, "firstName")}
                  value={formData.firstName}
                  error={errors?.firstName}
                />
                <FormField
                  htmlFor="lastName"
                  label="Прізвище"
                  ariaLabel="Введіть своє прізвище"
                  ariaRequired={true}
                  onChange={(e) => handleInputChange(e, "lastName")}
                  value={formData.lastName}
                  error={errors?.lastName}
                />
                {role === "student" && (
                  <DropdownMenu
                    label="Choose your class"
                    options={formOptionsFromArray(classes, "id", "name")}
                    name="class_id"
                  />
                )}
              </>
            )}

            <FormField
              htmlFor="email"
              label="Електрона пошта"
              ariaLabel="Введіть свою електрону пошту"
              ariaRequired={true}
              value={formData.email}
              onChange={(e) => handleInputChange(e, "email")}
              error={errors?.email}
            />

            <FormField
              htmlFor="password"
              label="Пароль"
              ariaLabel="Введіть свій пароль"
              ariaRequired={true}
              value={formData.password}
              onChange={(e) => handleInputChange(e, "password")}
              error={errors?.password}
            />
            <input type="hidden" name="role" value={role} />
            <div className="w-full text-center">
              <button
                type="submit"
                name="_action"
                value={action}
                aria-label={
                  action === "login"
                    ? "Увійти в аккаунт"
                    : "Зареєструвати свій аккаунт"
                }
                className="rounded-xl mt-2 bg-yellow-300 px-3 py-2 text-blue-600 font-semibold transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1"
              >
                {action === "login" ? "Увійти" : "Зареєструватися"}
              </button>
            </div>
          </form>
        </div>
      </Layout>
    </Fragment>
  );
}
