import React from "react";
import {
  useFormikContext,
  FormikTouched,
  FormikErrors,
  FormikContextType,
} from "formik";
import { Box } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons";

interface FixTouchedAndErrors {
  [key: string]: any;
}

function useCustomFormik(
  name: string
): [FormikContextType<unknown>, JSX.Element | null] {
  const formik = useFormikContext();
  const touched: FormikTouched<FixTouchedAndErrors> = formik.touched;
  const errors: FormikErrors<FixTouchedAndErrors> = formik.errors;
  const error = touched[name] && errors[name];
  const hasError = error ? (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        columnGap: 5,
        position: "absolute",
        fontSize: "15px",
      }}
    >
      <>
        <IconAlertCircle width={18} /> {error}
      </>
    </Box>
  ) : null;

  return [formik, hasError];
}

export { useCustomFormik };
