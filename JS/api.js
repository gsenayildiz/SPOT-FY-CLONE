import { renderSearchMusic, renderSongs } from "./ui.js";

//!ınputa girilen veriye göre aratacağımız API nin keyi
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'e552ca3b70msh455368d175ebc4bp1e7692jsn5d54ecf619e2',
		'x-rapidapi-host': 'shazam.p.rapidapi.com'
	}
};

//!popüler müzikleri getireceğimiz API key
const optionsTop = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'e552ca3b70msh455368d175ebc4bp1e7692jsn5d54ecf619e2',
		'x-rapidapi-host': 'spotify23.p.rapidapi.com'
	}
};


export class API {
    constructor(){
       this.songs = [];
    }
//!inputa girilen veriye göre API den cavabı getirir
    async searchMusic(query){
     try{
      const res = await fetch(
        `https://shazam.p.rapidapi.com/search?term=${query}&locale=tr-TR&offset=0&limit=5`,
        options
       );
       const data = await res.json();
       let newData = data.tracks.hits;
        newData = newData.map((song) => ({...song.track}));
       this.songs = newData;
      //! ekrana gelen herbir şarkıyı yazdıracağımız method 
       renderSearchMusic(this.songs);
     }catch(err){
            console.log(err)
        }
    }

   async topPopular(){
        const url = "https://spotify23.p.rapidapi.com/recommendations/?limit=20&seed_tracks=0c6xIDDpzE81m2q797ordA&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=classical%2Ccountry"
        try {
        //!API ye istek at    
        const response = await  fetch(url, optionsTop);
        //!veriyi JSON formatına çevir
        const result = await response.json();
        //!tanımladığımız song dizisine gelen cevabı aktar
        this.songs = result.tracks;
        renderSongs(this.songs);
        } catch (error) {
            console.log(error)
        }
    }
}
