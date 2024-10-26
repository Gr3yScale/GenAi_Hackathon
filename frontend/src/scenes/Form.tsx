import { Box } from "@mui/material";
import * as yup from "yup";
import Header from "../Framework/components/Header.tsx";
import Form, { FormFieldMeta, FormFieldValues } from "../Framework/components/Form.tsx"
import { useNavigate } from 'react-router-dom';


interface FormValues extends FormFieldValues {
  csid: string
}
const initialValues: FormValues = {
  csid: ""
};

interface FormMeta extends FormFieldMeta {
  csid: { isPassword?: false, isNumber?: false }
}
const metadata: FormMeta = {
  csid: {}
};

const checkoutSchema: yup.ObjectSchema<FormValues> = yup.object().shape({
  csid: yup.string().required("required")
});

const DetailsForm = () => {
  const navigate = useNavigate();


  const handleFormSubmit = (values: FormValues) => {
    navigate('/client/' + values.csid)
  };


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
