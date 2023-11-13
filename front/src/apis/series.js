export async function getSeries() {
    const response = await fetch("http://localhost:8000/api/series/getSeries");
    return response.json();
}

export async function addSerie(values) {
    console.log("addSerie values: ", values)
    try {
        const response = await 
fetch("http://localhost:8000/api/series/addSerie", {
            method: "POST",
            body: values,
        });
        const body = await response.json();
        console.log("response: ", response);
        if (response.ok) {
            return body;
        } else {
            if (body) {
                throw body;
            } else {
                throw new Error("Error register");
            }
        }
    } catch (error) {
        console.error(error);
    }
}