import React from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { loginSchema } from "./schema";
import type { ILoginFormData } from "./interface";

const LoginForm: React.FC = React.memo(() => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ILoginFormData>({
    resolver: joiResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert("Login successful! (This is a demo)");
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
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
          </div>
          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? "Processing..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
});

export default LoginForm;
