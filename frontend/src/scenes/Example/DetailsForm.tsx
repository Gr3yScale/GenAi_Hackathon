import { Box } from "@mui/material";
import * as yup from "yup";
import Header from "../../Framework/components/Header.tsx";
import Form, {FormFieldMeta, FormFieldValues} from "../../Framework/components/Form.tsx"


interface FormValues extends FormFieldValues {
  firstName: string,
  lastName: string,
  email: string,
  contact: string,
  address1: string,
  address2: string
}
const initialValues: FormValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  address1: "",
  address2: "",
};

interface FormMeta extends FormFieldMeta {
  firstName: { isPassword?: false, isNumber?: false },
  lastName: { isPassword?: false, isNumber?: false },
  email: { isPassword?: false, isNumber?: false },
  contact: { isPassword?: false, isNumber?: false },
  address1: { isPassword?: false, isNumber?: false },
  address2: { isPassword?: false, isNumber?: false }
}
const metadata: FormMeta = {
  firstName: { },
  lastName: { },
  email: { },
  contact: { },
  address1: { },
  address2: { }
};

const handleFormSubmit = (values : FormValues) => {
  console.log(values);
};

const checkoutSchema : yup.ObjectSchema<FormValues> = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
      .string()
      .matches(/^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/
          , "Phone number is not valid")
      .required("required"),
  address1: yup.string().required("required"),
  address2: yup.string().required("required"),
});

const DetailsForm = () => {
  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />
      <Form<FormValues, FormMeta>
          checkoutSchema={checkoutSchema}
          initialValues={initialValues}
          metadata={metadata}
          onSubmit={handleFormSubmit}
      />
    </Box>
  );
};


export default DetailsForm;
