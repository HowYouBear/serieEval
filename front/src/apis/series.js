export async function getSeries(){
    const response = await fetch("http://localhost:8000/api/series/getSeries");
    return response.json();
}