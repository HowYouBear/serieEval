import SerieForm from "../form/SerieForm"

export default function AddSerie() {
    return (
        <>
            <div className={`d-flex flex-column justify-content-center align-items-center flex-fill`}>
                <h1>Add serie</h1>
                <SerieForm
                    title={"La petite maison dans la prairie"}
                    yearRelease={" 2023"}
                    resume={"Charle frappe sa femme"}
                    contryProducer={"France"}
                    stillProducing={false}
                    IMDbScore={10}
                    sensCritiqueScore={"10"}/>
                </div>
        </>
    )
}