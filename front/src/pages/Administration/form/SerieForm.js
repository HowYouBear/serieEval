import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import styles from "./SerieForm.module.scss"
import { addSerie } from "../../../apis/series";

export default function SerieForm(data){

    const [feedback, setFeedback] = useState("");
    const [feedbackGood, setFeedbackGood] = useState("");
    const navigate = useNavigate();

    const yupSchema = yup.object({
        title: yup
            .string()
            .required("Le champ est obligatoire")
            .min(1, "Le champ doit comporter au moins 1 caractères")
            .max(250, "Le champ ne doit pas contenir plus de 250 caractères"),
        yearRelease: yup
            .number()
            .required("Le champ est obligatoire")
            .min(1889, "L'année minimum est de 1889")
            .max(2025, "L'année maximum est de 2025"),
        resume: yup
            .string()
            .required("Le champ est obligatoire")
            .min(10, "Le champ doit comporter au moins 10 caractères")
            .max(2000, "Le champ ne doit pas contenir plus de 2000 caractères"),
        contryProducer: yup
            .string()
            .required("Le champ est obligatoire")
            .min(1, "Le champ doit comporter au moins 1 caractères")
            .max(56, "Le champ ne doit pas contenir plus de 56 caractères"),
        IMDbScore: yup
            .number()
            .required("Le champ est obligatoire")
            .min(0, "La note minimum est de 0")
            .max(10, "La note maximum est de 10"),
        sensCritiqueScore: yup
            .number()
            .required("Le champ est obligatoire")
            .min(0, "La note minimum est de 0")
            .max(10, "La note maximum est de 10"),
    });
    const defaultValues = {
        title: data.title,
        yearRelease: data.yearRelease,
        resume: data.resume,
        contryProducer: data.contryProducer,
        stillProducing: data.stillProducing,
        IMDbScore: data.IMDbScore,
        sensCritiqueScore: data.sensCritiqueScore,
    };

    const {
        register,
        handleSubmit,
        reset,
        getValues,
        formState: { errors },
    } = useForm({
        defaultValues,
        mode: "onChange",
        resolver: yupResolver(yupSchema),
    });

    async function submit() {
        setFeedback("");
        const values = getValues();
        console.log("submitted values: ", values);
        try {
            const response = await addSerie(values);
            if (response.message) {
                setFeedback(response.message);
            } else {
                setFeedbackGood(response.messageGood);
                reset(defaultValues);
                // setTimeout(() => {
                //     navigate("/login");
                // }, 3000);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <>
            <form onSubmit={handleSubmit(submit)}>
                    <h3 className="mb20">Tous les champs sont obligatoires</h3>
                    <div className="d-flex flex-column mb20">
                        <label htmlFor="title" className="mb10">Titre</label>
                        <input {...register("title")} type="text" id="title" />
                        {errors?.title && (<p className="text-error">{errors.title.message}</p>)}
                    </div>

                    <div className="d-flex flex-column mb20">
                        <label htmlFor="yearRelease" className="mb10">Année de sortie</label>
                        <input {...register("yearRelease")} type="text" id="yearRelease" />
                        {errors?.yearRelease && (<p className="text-error">{errors.yearRelease.message}</p>)}
                    </div>

                    <div className="d-flex flex-column mb20">
                        <label htmlFor="resume" className="mb10">Résumé</label>
                        <input {...register("resume")} type="text" id="resume" />
                        {errors?.resume && (<p className="text-error">{errors.resume.message}</p>)}
                    </div>

                    <div className="d-flex flex-column mb20">
                        <label htmlFor="contryProducer" className="mb10">Pays de production</label>
                        <input {...register("contryProducer")} type="text" id="contryProducer" />
                        {errors?.contryProducer && (<p className="text-error">{errors.contryProducer.message}</p>)}
                    </div>

                    <div className="d-flex mb20 align-items-center">
                        <label htmlFor="stillProducing"> Toujours en production? </label>
                        <input {...register("stillProducing")} type="checkbox" id="stillProducing" />
                        {errors?.stillProducing && <p className="text-error">{errors.stillProducing.message}</p>}
                    </div>

                    <div className="d-flex flex-column mb20">
                        <label htmlFor="IMDbScore" className="mb10">Note IMDb (entre 0 et 10)</label>
                        <input {...register("IMDbScore")} type="number" min="0" max="10" step="0.01" id="IMDbScore" />
                        {errors?.IMDbScore && (<p className="text-error">{errors.IMDbScore.message}</p>)}
                    </div>

                    <div className="d-flex flex-column mb20">
                        <label htmlFor="sensCritiqueScore" className="mb10">Note sensCritique (entre 0 et 10)</label>
                        <input {...register("sensCritiqueScore")} type="number" min="0" max="10" step="0.01" id="sensCritiqueScore" />
                        {errors?.sensCritiqueScore && (<p className="text-error">{errors.sensCritiqueScore.message}</p>)}
                    </div>

                    <button className="btn btn-primary">Soumettre</button>

                    {feedback && <p className={`${styles.feedback}`}>{feedback}</p>}
                    {feedbackGood && (<p className={`${styles.feedbackGood}`}>{feedbackGood}</p>)}
                </form>
        </>
    )
}