import { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { StyledInput } from "./style";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  type: "text" | "email" | "password";
  error?: string;
  register: UseFormRegisterReturn<string>;
}

export const Input = ({
  id,
  label,
  type,
  error,
  register,
  placeholder,
}: IInputProps) => {
  return (
    <>
      <StyledInput tabIndex={0}>
        <label htmlFor={id}>{label}</label>
        <input type={type} id={id} placeholder={placeholder} {...register} />
      </StyledInput>
      <p>{error}</p>
    </>
  );
};
