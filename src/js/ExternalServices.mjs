async function convertToJson(res) {
    const jsonResponse = await res.json();
    
    if (res.ok) {
        return jsonResponse;
    } else {
        throw { 
            name: 'servicesError', 
            message: jsonResponse 
        };
    }
}

export { convertToJson };