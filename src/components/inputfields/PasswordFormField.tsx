import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import React, { useState } from "react";
import { Control, Controller, FieldError, FieldErrors } from "react-hook-form";
import ErrorBox from "../utility/ErrorBox";

type PasswordProps = {
  id: string;
  errors: any;
  control: Control<any>;
  label?: string;
};

const PasswordField = (props: PasswordProps) => {
  const { errors, control, label, id } = props;
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <FormControl fullWidth>
      <InputLabel htmlFor="auth-login-v2-password" error={Boolean(errors)}>
        {label ?? "Password"}
      </InputLabel>
      <Controller
        name={id ?? "password"}
        control={control}
        rules={{ required: true }}
        render={({ field: { value, onChange, onBlur } }) => (
          <OutlinedInput
            value={value}
            onBlur={onBlur}
            label={label ?? "Password"}
            onChange={onChange}
            id="auth-login-v2-password"
            error={Boolean(errors)}
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <VisibilityOutlined />
                  ) : (
                    <VisibilityOffOutlined />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />
        )}
      />
      {errors && <ErrorBox error={errors} />}
    </FormControl>
  );
};

export default PasswordField;
