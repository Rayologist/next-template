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
    drinks: Array<string>;
    position: string;
    browser: string;
    comments: string;
    date: Date | null;
  }

  const initialValue: Values = {
    username: "",
    password: "",
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
    username: Yup.string().required("必填"),
    email: Yup.string().email("請確認格式").required("必填"),
    password: Yup.string().required("必填"),
    drinks: Yup.array().min(1, "必填"),
    position: Yup.string().required("必填").nullable(),
    browser: Yup.string().required("必填").nullable(),
    comments: Yup.string().required("必填"),
    date: Yup.date().required("必填").nullable(),
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
                  placeholder="請選擇職位"
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
                  placeholder="請填寫日期"
                  required
                  allowFreeInput
                />
              </Grid.Col>

              <Grid.Col md={12} lg={5}>
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
