import { Form, Formik, FormikHelpers } from "formik";
import { FormikController } from "@components/Form";
import { Paper, Button, Grid, Title, ColProps } from "@mantine/core";
import { object, string, number, array, date, ref } from "yup";
import { useMediaQuery } from "@mantine/hooks";
import { ControllerProps } from "types";

function FormDemo() {
  interface Values {
    username: string;
    email: string;
    age: number | null;
    password: string;
    confirmPassword: string;
    drinks: Array<string>;
    position: string;
    browser: string;
    comments: string;
    date: Date | null;
    programmingLanguage: Array<string>;
    resume: File[];
  }

  const initialValue: Values = {
    username: "",
    password: "",
    age: null,
    confirmPassword: "",
    email: "",
    drinks: [],
    position: "",
    browser: "",
    comments: "",
    date: null,
    programmingLanguage: [],
    resume: [],
  };

  const onSubmit = (values: Values, actions: FormikHelpers<Values>) => {
    console.log(values);
    setTimeout(() => actions.setSubmitting(false), 2000);
  };

  const validationSchema = object({
    username: string().required("Required"),
    email: string().email("Wrong Format").required("Required"),
    age: number().required("Required").nullable(),
    password: string().required("Required"),
    confirmPassword: string()
      .oneOf([ref("password"), null], "Passwords do not match")
      .required("Required"),
    drinks: array().min(1, "Required"),
    position: string().required("Required").nullable(),
    browser: string().required("Required").nullable(),
    comments: string().required("Required"),
    date: date().required("Required").nullable(),
    programmingLanguage: array().min(1, "Required"),
    resume: array().min(1, "Required"),
  });

  const fields: (ControllerProps & { col?: ColProps })[] = [
    {
      control: "text-input",
      name: "username",
      label: "Username",
      withAsterisk: true,
    },
    {
      control: "text-input",
      type: "email",
      name: "email",
      label: "Email",
      withAsterisk: true,
    },
    {
      control: "password-input",
      name: "password",
      label: "Password",
      withAsterisk: true,
    },
    {
      control: "password-input",
      name: "confirmPassword",
      label: "Confirm Password",
      withAsterisk: true,
    },
    {
      control: "checkbox-group",
      name: "drinks",
      label: "Drinks",
      options: [
        { label: "Coffee", value: "coffee" },
        { label: "Tea", value: "tea" },
        { label: "Wine", value: "wine" },
      ],
      withAsterisk: true,
    },
    {
      control: "select",
      name: "position",
      label: "Position",
      options: [
        { label: "Backend", value: "backend" },
        { label: "Frontend", value: "frontend" },
        { label: "Fullstack", value: "fullstack" },
      ],
      withAsterisk: true,
      placeholder: "Pick Position",
    },
    {
      control: "radio-group",
      name: "browser",
      label: "Browser",
      options: [
        { label: "Firefox", value: "firefox" },
        { label: "Edge", value: "edge" },
        { label: "Chrome", value: "chrome" },
        { label: "Opera", value: "opera" },
        { label: "Safari", value: "safari" },
      ],
      withAsterisk: true,
    },
    {
      control: "date-picker",
      name: "date",
      label: "Date",
      placeholder: "Pick Date",
      withAsterisk: true,
      allowFreeInput: true,
    },
    {
      control: "number-input",
      name: "age",
      label: "Age",
      withAsterisk: true,
      min: 1,
    },
    {
      control: "multi-select",
      name: "programmingLanguage",
      label: "Programming Language",
      options: [
        {
          label: "Javascript",
          value: "javascript",
        },
        {
          label: "Typescript",
          value: "typescript",
        },
        {
          label: "Go",
          value: "go",
        },
        {
          label: "Python",
          value: "python",
        },
        {
          label: "Rust",
          value: "rust",
        },
      ],
      clearable: true,
      searchable: true,
      creatable: true,
      withAsterisk: true,
    },
    {
      control: "file-input",
      name: "resume",
      label: "Resume",
      multiple: true, 
      clearable: true,
      withAsterisk: true,
      col: {
        md: 10,
        lg: 10,
      },
    },
    {
      control: "text-area",
      name: "comments",
      label: "Comments",
      withAsterisk: true,
      col: {
        md: 10,
        lg: 10,
      },
    },
  ];

  return (
    <Formik
      initialValues={initialValue}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {(formik) => (
        <Form>
          <Grid justify="center" gutter="xl">
            <Grid.Col xs={10} sm={10} md={10} lg={10}>
              <Title order={1} align="center">
                Sample Form
              </Title>
            </Grid.Col>

            {fields.map((field, index) => {
              const { col } = field;
              return (
                <Grid.Col
                  xs={col?.xs ?? 10}
                  sm={col?.sm ?? 10}
                  md={col?.md ?? 5}
                  lg={col?.lg ?? 5}
                  key={`${field.name}-${index}`}
                  {...col}
                >
                  <FormikController {...field} />
                </Grid.Col>
              );
            })}

            <Grid.Col
              xs={10}
              sm={10}
              md={10}
              lg={10}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Button type="submit" mt={25} loading={formik.isSubmitting}>
                {formik.isSubmitting ? "Submitting" : "Submit"}
              </Button>
            </Grid.Col>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}

export default FormDemo;
