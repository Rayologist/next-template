import { Form, Formik, FormikHelpers } from "formik";
import { FormikController } from "@components/Form";
import { Paper, Button, Grid, Title } from "@mantine/core";
import * as Yup from "yup";
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
  };

  const onSubmit = (values: Values, actions: FormikHelpers<Values>) => {
    console.log(values);
    setTimeout(() => actions.setSubmitting(false), 2000);
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Required"),
    email: Yup.string().email("Wrong Format").required("Required"),
    age: Yup.number().required("Required").nullable(),
    password: Yup.string().required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords do not match")
      .required("Required"),
    drinks: Yup.array().min(1, "Required"),
    position: Yup.string().required("Required").nullable(),
    browser: Yup.string().required("Required").nullable(),
    comments: Yup.string().required("Required"),
    date: Yup.date().required("Required").nullable(),
    programmingLanguage: Yup.array().min(1, "required"),
  });

  const matches = useMediaQuery("(max-width: 700px)");

  const fields: ControllerProps[] = [
    {
      control: "text-input",
      name: "username",
      label: "Username",
      required: true,
    },
    {
      control: "text-input",
      type: "email",
      name: "email",
      label: "Email",
      required: true,
    },
    {
      control: "password-input",
      name: "password",
      label: "Password",
      required: true,
    },
    {
      control: "password-input",
      name: "confirmPassword",
      label: "Confirm Password",
      required: true,
    },
    {
      control: "checkbox",
      name: "drinks",
      label: "Drinks",
      options: [
        { label: "Coffee", value: "coffee" },
        { label: "Tea", value: "tea" },
        { label: "Wine", value: "wine" },
      ],
      required: true,
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
      required: true,
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
      required: true,
    },
    {
      control: "date-picker",
      name: "date",
      label: "Date",
      placeholder: "Pick Date",
      required: true,
      allowFreeInput: true,
    },
    {
      control: "number-input",
      name: "age",
      label: "Age",
      required: true,
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
      required: true,
    },
  ];

  return (
    <Paper
      shadow="lg"
      ml="auto"
      mr="auto"
      mt="0.5rem"
      sx={{
        padding: matches ? "1rem 1rem" : "2rem 1rem",
        width: matches ? "80%" : "45%",
      }}
      withBorder
    >
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
                return (
                  <Grid.Col
                    xs={10}
                    sm={10}
                    md={5}
                    lg={5}
                    key={`${field.name}-${index}`}
                  >
                    <FormikController {...field} />
                  </Grid.Col>
                );
              })}

              <Grid.Col xs={10} sm={10} md={10} lg={10}>
                <FormikController
                  control="text-area"
                  name="comments"
                  label="Comments"
                  required
                />
              </Grid.Col>

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
    </Paper>
  );
}

export default FormDemo;
