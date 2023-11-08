import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "../Register/Register.module.scss";
import { signin } from "../../../apis/users";
import { UserContext } from "../../../context/UserContext";

export default function Login() {
  const [feedback, setFeedback] = useState("");
  const [feedbackGood, setFeedbackGood] = useState("");
  const { signinS } = useContext(UserContext);

  const navigate = useNavigate();

  const yupSchema = yup.object({
    email: yup
      .string()
      .email("Votre email n'est pas valide")
      .required("Le champ est obligatoire"),
    password: yup.string().required("Le champ est obligatoire"),
  });

  const defaultValues = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(yupSchema),
  });

  async function submit(values) {
    setFeedback("");
    console.log(values);
    try {
      const response = await signin(values);
      if (response.message) {
        setFeedback(response.message);
      } else {
        reset(defaultValues);
        setFeedbackGood(response.messageGood);
        signinS(response.id);
        setTimeout(() => {
          navigate("/profile");
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div
      className={`d-flex flex-column justify-content-center align-items-center flex-fill`}
    >
      <form onSubmit={handleSubmit(submit)}>
        <div className="d-flex flex-column mb20">
          <label htmlFor="email" className="mb10">
            Email
          </label>
          <input {...register("email")} type="text" id="email" />
          {errors?.email && (
            <p className="text-error">{errors.email.message}</p>
          )}
        </div>
        <div className="d-flex flex-column mb20">
          <label htmlFor="password" className="mb10">
            Password
          </label>
          <input {...register("password")} type="password" id="password" />
          {errors?.password && (
            <p className="text-error">{errors.password.message}</p>
          )}
        </div>
        <button className="btn btn-primary">Submit</button>
        {feedback && <p className={`${styles.feedback}`}>{feedback}</p>}
        {feedbackGood && (
          <p className={`${styles.feedbackGood}`}>{feedbackGood}</p>
        )}
      </form>
    </div>
  );
}
