export function newsApi(page=1){
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=7900c016c15d400ba3f750a23ec10bcc&page=${page}`;
    return fetch(url)
        .then(response =>{
            return response.json();
        })
        .then(data => {
            return data;
        });
}