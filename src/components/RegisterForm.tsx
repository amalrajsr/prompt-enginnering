import React from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import type { IRegisterFormData } from "./interface";
import { passwordStrength, registerSchema } from "./schema";

const RegisterForm: React.FC = React.memo(() => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<IRegisterFormData>({
    resolver: joiResolver(registerSchema),
    mode: "onChange",
  });

  const password = watch("password");
  const strength = React.useMemo(
    () => passwordStrength(password || ""),
    [password]
  );

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert("Registration successful! (This is a demo)");
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              {...register("firstName")}
              placeholder="Enter your first name"
              className={errors.firstName ? "error" : ""}
            />
            {errors.firstName?.message &&
              typeof errors.firstName.message === "string" && (
                <div className="error-message">{errors.firstName.message}</div>
              )}
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              {...register("lastName")}
              placeholder="Enter your last name"
              className={errors.lastName ? "error" : ""}
            />
            {errors.lastName?.message &&
              typeof errors.lastName.message === "string" && (
                <div className="error-message">{errors.lastName.message}</div>
              )}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              {...register("email")}
              placeholder="Enter your email"
              className={errors.email ? "error" : ""}
            />
            {errors.email?.message &&
              typeof errors.email.message === "string" && (
                <div className="error-message">{errors.email.message}</div>
              )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              {...register("password")}
              placeholder="Enter your password"
              className={errors.password ? "error" : ""}
            />
            {errors.password?.message &&
              typeof errors.password.message === "string" && (
                <div className="error-message">{errors.password.message}</div>
              )}
            {password && (
              <div className="password-strength">
                <div
                  className={`strength-indicator strength-${strength}`}
                ></div>
                <div className="strength-text">
                  Password strength:{" "}
                  {strength.charAt(0).toUpperCase() + strength.slice(1)}
                </div>
              </div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword")}
              placeholder="Confirm your password"
              className={errors.confirmPassword ? "error" : ""}
            />
            {errors.confirmPassword?.message &&
              typeof errors.confirmPassword.message === "string" && (
                <div className="error-message">
                  {errors.confirmPassword.message}
                </div>
              )}
          </div>
          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? "Processing..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
});

export default RegisterForm;
