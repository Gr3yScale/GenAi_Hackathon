import * as yup from 'yup';
import { Formik } from 'formik';
import { Box, Button, TextField, IconButton } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import React, { useState } from 'react';

export interface FormFieldMetadata {
    isPassword?: boolean;
    isNumber?: boolean;
}

export interface FormFieldValues {
    [key: string]: string | number;
}

export interface FormFieldMeta {
    [key: string]: FormFieldMetadata;
}

interface FormProps<T extends FormFieldValues, M extends FormFieldMeta> {
    checkoutSchema: yup.ObjectSchema<T>;
    initialValues: T;
    metadata: M;
    onSubmit: (values: T) => void;
    submitButtonText?: string;
    childElement?: React.ReactNode;
    Title?: "String";
}

function CheckoutForm<
    T extends FormFieldValues,
    M extends FormFieldMeta>({ checkoutSchema, initialValues, metadata, onSubmit, submitButtonText, childElement }: FormProps<T, M>) {

    const [passwordVisibility, setPasswordVisibility] = useState<Record<string, boolean>>({});

    const handleTogglePasswordVisibility = (key: string) => {
        setPasswordVisibility(prev => ({ ...prev, [key]: !prev[key] }));
    };

    function FormatCapitals(input: string): string {
        // Add a space before each capital letter, then capitalize each word
        return input
            .replace(/([A-Z])/g, ' $1') // Add space before each capital letter
            .trim() // Remove any leading space
            .split(' ') // Split the string into words
            .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
            .join(' '); // Join the words back into a single string
    }


    return (
        <Formik
            initialValues={initialValues}
            validationSchema={checkoutSchema}
            onSubmit={onSubmit}
        >
            {({
                  errors,
                  touched,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  values
              }) => (
                <form onSubmit={handleSubmit}>
                    <Box
                        display="grid"
                        gap="20px"
                        gridTemplateColumns="1fr"
                        sx={{
                            "& > div": { gridColumn: "span 4" },
                        }}
                    >
                        {Object.keys(initialValues).map((key) => {
                            const fieldMeta = metadata[key as keyof M];

                            return (
                                <div key={key}>
                                    <label htmlFor={key}>{FormatCapitals(key)}</label>
                                    <Box display="flex" alignItems="center">
                                        <TextField
                                            id={key}
                                            name={key}
                                            type={fieldMeta?.isPassword && !passwordVisibility[key] ? 'password' : fieldMeta?.isNumber ? 'number' : 'text'}
                                            value={values[key]}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={Boolean(touched[key as keyof T] && errors[key as keyof T])}
                                            helperText={touched[key as keyof T] && errors[key as keyof T] ? (errors[key as keyof T] as string) : ''}
                                            fullWidth
                                            sx={{
                                                "& .MuiOutlinedInput-root": {
                                                    "& fieldset": {
                                                        borderColor: 'rgba(0, 0, 0, 0.23)',
                                                    },
                                                    "&:hover fieldset": {
                                                        borderColor: 'rgba(0, 0, 0, 0.87)',
                                                    },
                                                    "&.Mui-focused fieldset": {
                                                        borderColor: '#3f51b5',
                                                    },
                                                },
                                            }}
                                        />
                                        {fieldMeta?.isPassword && (
                                            <IconButton onClick={() => handleTogglePasswordVisibility(key)} edge="end">
                                                {passwordVisibility[key] ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        )}
                                    </Box>
                                </div>
                            );
                        })}
                    </Box>
                    <Box display="flex" justifyContent="end" mt="20px">
                        {childElement}
                        <Button type="submit" color="secondary" variant="contained">
                            {submitButtonText ? submitButtonText : "Submit"}
                        </Button>
                    </Box>
                </form>
            )}
        </Formik>
    );
}

export default CheckoutForm;
