import React from "react";
import { Form, Formik, FormikHelpers } from "formik";
import FormikController from "@components/Formik/FormikController";
import { Paper, Button, Grid, Title } from "@mantine/core";
import * as Yup from "yup";

function FormDemo() {
  interface Values {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    drinks: Array<string>;
    position: string;
    browser: string;
    comments: string;
    date: Date | null;
  }

  const initialValue: Values = {
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    drinks: [],
    position: "",
    browser: "",
    comments: "",
    date: null,
  };

  const onSubmit = (values: Values, actions: FormikHelpers<Values>) => {
    console.log(values);
    setTimeout(() => actions.setSubmitting(false), 2000);
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Required"),
    email: Yup.string().email("Wrong Format").required("Required"),
    password: Yup.string().required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords do not match")
      .required("Required"),
    drinks: Yup.array().min(1, "Required"),
    position: Yup.string().required("Required").nullable(),
    browser: Yup.string().required("Required").nullable(),
    comments: Yup.string().required("Required"),
    date: Yup.date().required("Required").nullable(),
  });

  return (
    <Paper
      shadow="lg"
      ml="auto"
      mr="auto"
      mt="2rem"
      sx={{
        padding: "3rem 1rem ",
        width: "50%",
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
              <Grid.Col md={12} lg={12}>
                <Title order={1} align="center">
                  Sample Form
                </Title>
              </Grid.Col>

              <Grid.Col md={12} lg={5}>
                <FormikController
                  control="text-input"
                  name="username"
                  label="Username"
                  required
                />
              </Grid.Col>

              <Grid.Col md={12} lg={5}>
                <FormikController
                  control="text-input"
                  type="email"
                  name="email"
                  label="Email"
                  required
                />
              </Grid.Col>

              <Grid.Col md={12} lg={5}>
                <FormikController
                  control="password-input"
                  name="password"
                  label="Password"
                  required
                />
              </Grid.Col>

              <Grid.Col md={12} lg={5}>
                <FormikController
                  control="password-input"
                  name="confirmPassword"
                  label="Confirm Password"
                  required
                />
              </Grid.Col>

              <Grid.Col md={12} lg={5}>
                <FormikController
                  control="checkbox"
                  name="drinks"
                  label="Drinks"
                  options={[
                    { label: "Coffee", value: "coffee" },
                    { label: "Tea", value: "tea" },
                    { label: "Wine", value: "wine" },
                  ]}
                  required
                />
              </Grid.Col>

              <Grid.Col md={12} lg={5}>
                <FormikController
                  control="select"
                  name="position"
                  label="Position"
                  options={[
                    { label: "Backend", value: "backend" },
                    { label: "Frontend", value: "frontend" },
                    { label: "Fullstack", value: "fullstack" },
                  ]}
                  required
                  placeholder="Pick Position"
                />
              </Grid.Col>

              <Grid.Col md={12} lg={5}>
                <FormikController
                  control="radio-group"
                  name="browser"
                  label="Browser"
                  options={[
                    { label: "Firefox", value: "firefox" },
                    { label: "Edge", value: "edge" },
                    { label: "Chrome", value: "chrome" },
                    { label: "Opera", value: "opera" },
                    { label: "Safari", value: "safari" },
                  ]}
                  required
                />
              </Grid.Col>

              <Grid.Col md={12} lg={5}>
                <FormikController
                  control="date-picker"
                  name="date"
                  label="Date"
                  placeholder="Pick Date"
                  required
                  allowFreeInput
                />
              </Grid.Col>

              <Grid.Col md={12} lg={10}>
                <FormikController
                  control="text-area"
                  name="comments"
                  label="Comments"
                  required
                />
              </Grid.Col>

              <Grid.Col
                md={12}
                lg={12}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Button type="submit" mt={50} loading={formik.isSubmitting}>
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
