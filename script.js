const API_KEY = "e9b500a2f9ab4fa9a9b77bda99ce6ee9";
const url = "https://newsapi.org/v2/everything?q=";




window.addEventListener('load', () => fetchNews('world'));

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    // console.log(data);
    bindData(data.articles);

}

function bindData(articles) {
    const cardcontainer = document.getElementById("card_container_id");
    const card = document.getElementById("card_id");
    cardcontainer.innerHTML = '';


    articles.forEach(article => {
        if (!article.urlToImage) return;
        const cardclone = card.content.cloneNode(true);
        fillDataCard(article,cardclone);
        cardcontainer.appendChild(cardclone);

    });
}

function fillDataCard(article, cardclone){
    const newImg=cardclone.querySelector("#img_card");
    const newtitle=cardclone.querySelector("#news_title");
    const newdate=cardclone.querySelector("#news_date");
    const newpara=cardclone.querySelector("#news_para");
    const newSource=cardclone.querySelector("#news-source");

    newImg.src= article.urlToImage;
    newtitle.innerHTML=article.title;
    newpara.innerHTML=article.description;
    newSource.innerHTML=`${article.source.name}`;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newdate.innerHTML=date;

    cardclone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,"_blank");
    });
 
}

function onNavBarClickItem(id){
    fetchNews(id);
}


const searchButton=document.getElementById("searchBtn");
const searchText=document.getElementById("search_bar");


searchButton.addEventListener("click",()=>{

    const text=searchText.value;
    if(!text) return ;
    fetchNews(text);

});




