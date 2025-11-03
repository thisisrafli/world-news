// mengambil data waktu saat ini
const date = String(new Date().getDate()).padStart(2, "0");
const month = String(new Date().getMonth()).padStart(2, "0");
const year = new Date().getFullYear();
const api = `https://newsapi.org/v2/everything?q=world&from=${year}-${month}-${date}&sortBy=publishedAt&apiKey=e8cf1fe1cbbb4bc28a17a7d3fedf8a84`;
const newsContainer = document.getElementById("newsContainer");

// fetch api
async function getData() {
   try {
      const res = await fetch(api);
      const data = await res.json();
      return data;
   } catch (error) {
      return error;
   }
}

getData().then(function(results) {
   if (results.status === "ok") {
      console.log(results);
      results.articles.forEach(function(result) {
         const news = document.createElement("a");
         news.classList.add("bg-white", "shadow-md", "shadow-gray-200", "overflow-hidden", "rounded");
         news.setAttribute("href", result.url);
         if (result.urlToImage === null) {
            news.innerHTML = `
               <div class="p-5 flex flex-col gap-3">
                  <span class="font-semibold">${result.title}</span>
                  <span class="text-[13px] text-gray-500">${result.publishedAt}</span>
               </div>
            `;
         } else {
            news.innerHTML = `
               <div class="flex flex-col">
                  <div class="border overflow-hidden">
                     <img class="w-full h-full object-cover flex items-center justify-center" src="${result.urlToImage}" alt="${result.title}">
                  </div>
                  <div class="p-5 flex flex-col gap-3">
                     <span class="font-semibold">${result.title}</span>
                     <span class="text-[13px] text-gray-500">${result.publishedAt}</span>
                  </div>
               </div>
            `;
         }
         newsContainer.appendChild(news);
      });
   } else {
      news.innerHTML = `<span>There was annoyance.</span>`;
   }
});