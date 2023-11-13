import SerieForm from "../form/SerieForm";
import Loading from "../../../components/Loading/Loading";
import Serie from "../../Homepage/components/Serie";
import { useEffect, useState } from "react";
import { getSeries } from "../../../apis/series";
import styles from "./UpdateSerie.module.scss"

export default function UpdateSerie() {

    const [filter, setFilter] = useState("");
    const [series, setSeries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchSeries() {
            try {
                const response = await getSeries()
                console.log("response: ", response);
                if (response) {
                    const modifiedSeries = response.map((s) =>
                        s.like === 1 ? { ...s, like: true } : { ...s, like: false }
                    );
                    setIsLoading(false);
                    setSeries(modifiedSeries);
                } else {
                    console.log("error fetch series");
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchSeries();
    }, []);

    function updateSeries(newSerie) {
        setSeries(series.map((s) => (s.id === newSerie.id ? newSerie : s)));
    }

    function deleteSeries(id) {
        setSeries(series.filter((s) => s.id !== id));
    }

    const handleInput = (e) => {
        const search = e.target.value;
        setFilter(search.trim().toLowerCase());
    };

    return (
        <>
            <div className={`d-flex flex-column justify-content-center align-items-center flex-fill`}>
                <h1>Update serie</h1>
                <div className="d-flex flex-column flex-fill container">
                    <div
                        className={`card p20 mb20 d-flex flex-column flex-fill ${styles.contentCard}`}
                    >
                        <div
                            className={`d-flex justify-content-center align-items-center my30 ${styles.searchBar}`}
                        >
                            <i className="fas fa-magnifying-glass mr10"></i>
                            <input
                                onInput={handleInput}
                                className="flex-fill"
                                type="text"
                                placeholder="Search..."
                            />
                        </div>

                        {isLoading ? (
                            <Loading />
                        ) : (
                            <div className={`${styles.flex}`}>
                                {series
                                    .filter((serie) => serie.title.toLowerCase().includes(filter))
                                    .map((serie) => (
                                        <Serie
                                            key={serie.id}
                                            serie={serie}
                                            updateSeries={updateSeries}
                                            deleteSeries={deleteSeries}
                                        />
                                    ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}