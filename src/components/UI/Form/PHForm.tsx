import { Box } from "@mui/material";
import {
    FieldValues,
    FormProvider,
    SubmitHandler,
    useForm,
  } from "react-hook-form";
  import { motion } from 'framer-motion';
  type TFormConfig = {
    resolver?: any;
    defaultValues?: Record<string, any>;
  };
  
  type TFormProps = {
    children: React.ReactNode;
    onSubmit: SubmitHandler<FieldValues>;
    sx?:any
  } & TFormConfig;
  
  const PHForm = ({
    children,
    onSubmit,
    resolver,
    defaultValues,
    sx
  }: TFormProps) => {
    const formConfig: TFormConfig = {};
  
    if (resolver) {
      formConfig["resolver"] = resolver;
    }
  
    if (defaultValues) {
      formConfig["defaultValues"] = defaultValues;
    }
  
    const methods = useForm(formConfig);
    const { handleSubmit, reset } = methods;
  
    const submit: SubmitHandler<FieldValues> = (data) => {
      // console.log(data);
      onSubmit(data);
      reset();
    };
  
    return (
      <FormProvider {...methods}>
        <Box sx={sx} component={motion.form}  onSubmit={handleSubmit(submit)}>{children}</Box>
      </FormProvider>
    );
  };
  
  export default PHForm;
  