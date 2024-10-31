import { MenuItem, SxProps, TextField } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface ITextField {
  name: string;
  size?: "small" | "medium";
  placeholder?: string;
  label?: string;
  required?: boolean;
  fullWidth?: boolean;
  sx?: SxProps;
  items: string[];
  error?:boolean;
  helperText?:string
  
}

const PHSelectField = ({
  items,
  name,
  label,
  size = "small",
  required,
  fullWidth = true,
  sx,
}: ITextField) => {
  const { control, formState } = useFormContext();
  
  // Ensure `isError` is correctly handled, especially if `name` could refer to a nested field.
  const error = formState.errors?.[name];
  const isError = !!error;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TextField
          {...field}
          sx={{
            ...sx,
          }}
          size={size}
          select
          label={label}
          required={required}
          fullWidth={fullWidth}
          error={isError}
          helperText={isError ? (error?.message as string) : ""}
        >
          {items.map((itemName) => (
            <MenuItem key={itemName} value={itemName}>
              {itemName}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
};

export default PHSelectField;
