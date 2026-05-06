"use strict";

const movieSearch = () => {
  const form = document.querySelector("form");
  const input = document.querySelector("#search");
  const movieNameList = document.querySelector("#movieNameList");

  form.addEventListener("submit", async (e) => {
    try {

      e.preventDefault();

      movieNameList.innerHTML = "";
      const movieNameInput = input.value;
      
      if (!movieNameInput.trim()) return;

      const res = await fetch(
        `https://api.tvmaze.com/search/shows?q=${movieNameInput}`,
      );
      const resJson = await res.json();

      if (resJson.length === 0) {
        movieNameList.textContent = "No shows found.";
        return;
      }

      for (const val of resJson) {
        createMovieList(val.show.name, val.show.image?.medium, movieNameList);
      }

      input.value = "";
      console.log(resJson);

    } catch (e) {
      console.log("Error: ", e);
    }
  });
};

movieSearch();

const createMovieList = (nameVal, url, movieNameList) => {
  const box = document.createElement("div");

  if (url) {
    const img = document.createElement("img");
    img.src = url;
    img.alt = nameVal;
    img.classList.add("sizeImg");
    box.append(img);
  }

  box.classList.add("cleaner");
  box.append(nameVal);
  movieNameList.append(box);
};
