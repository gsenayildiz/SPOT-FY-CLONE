import { API } from "./JS/api.js";
import { elements } from "./JS/helpers.js";
import { renderPlayingInfo, updateTitle } from "./JS/ui.js";

const api = new API();
//console.log(api);
//!form gönderildiği anda API ye istek at ve gelen cevabı ekrana bas
elements.form.addEventListener("submit", (e) => {
    e.preventDefault(); //sayfayı yenilenmesi engellendi
   // console.log("gönderildi");
   const query = e.target[0].value; //input içine girilen değeri aldık
if(!query){
    alert("Lütfen bir müzik ismi giriniz!");
    return; //inputa girilen değer boş ise durdur
}

  updateTitle(`${query} İçin Sonuçlar`);
  api.searchMusic(query); 
});
//!sayfa yüklendiği anda API ye istek atıp popüler müzikleri getir 
document.addEventListener("DOMContentLoaded", async() => {
   await api.topPopular()
});

const playMusic = (url) =>{
  //!müziğin URL sini html e aktardık
  elements.audioSource.src = url;
  //console.log(elements.audioSource);
  //!audio elementinin müziği yüklenmesini sağladık
  elements.audio.load();
//!audio elementinin müziği oynatmasını sağlar
  elements.audio.play();
};
//!listede tıklamalarda çalışır
const handleClick = (e) =>{
 // console.log("tıklanıldı")
  if(e.target.id === "play-btn"){
    const parent = e.target.closest(".card"); //en yakın kapsayıcıya götürür (parentElement yerine kullanılır)
   renderPlayingInfo(parent.dataset);
   //console.log(parent.dataset);
   //!müzik çalar
   playMusic(parent.dataset.url);

  }
}
//!liste alanındaki tıklamaları izler
document.addEventListener("click", handleClick);
//!fotografı dönderir
const animatePhoto = () => {
 const img = document.querySelector(".info img");
 //console.log(img);

 img.className = "animate";
};
//!img etiketine eklediğimiz animate classını kaldırırs
const stopAnimation = () => {
  const img = document.querySelector(".info img");
 img.classList.remove("animate");
}
//!müziği çalma ve durdurma olaylarını izler
elements.audio.addEventListener("play", animatePhoto);
elements.audio.addEventListener("pause", stopAnimation);
