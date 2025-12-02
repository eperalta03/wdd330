export async function getMexicoCityTime(){
    try{
        const response = await fetch('https://worldtimeapi.org/api/timezone/America/Mexico_City');
        const data = await response.json();
        return new Date(data.datetime);
    } catch(error){
        console.error('Error fetching time:', error);
        return new Date();
    }
}