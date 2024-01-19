  async function postData(url = "", data = {}) {
  const response = await fetch(url, {
  method: "GET",
  mode: "cors",
  cache: "no-cache",
  credentials: "same-origin",
  headers: {
    "Content-Type": "application/json",
  },
  redirect: "follow",
  referrerPolicy: "no-referrer",
  //body: JSON.stringify(data),
  });
  return response.json();
}

postData("http://localhost:5678/api/works", {
  //"email": "sophie.bluel@test.tld",
  //"password": "S0phie",
  //"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiO…DI4fQ.2dkOL2Vz8HdgFxha2xzm1RmJjehohb8J3uHWcirGqHk"
}).then((data) => {
  let typesUniques = new Set();
  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    //console.log(element);
    const projects = document.querySelector("#projects");
    const figure = '<figure><img src="' + element.imageUrl + '" alt="' + element.title +'"><figcaption> ' + element.title +' </figcaption></figure>';
    projects.innerHTML += figure;
    typesUniques.add(data[i].category.name)
  }
  //console.log(typesUniques);
});


function filterWorks(type) {
  postData("http://localhost:5678/api/works", {
    }).then((data) => {
      const projects = document.querySelector("#projects");
      projects.innerHTML = "";
      if (type === "Tous") {
        for (let i = 0; i < data.length; i++) {
          const element = data[i];
          const figure = '<figure><img src="' + element.imageUrl + '" alt="' + element.title +'"><figcaption> ' + element.title +' </figcaption></figure>';
          projects.innerHTML += figure;
        }
      } else {
        const filteredData = data.filter((element) => element.category.name === type);
        for (let i = 0; i < filteredData.length; i++) {
          const element = filteredData[i];
          const figure = '<figure><img src="' + element.imageUrl + '" alt="' + element.title +'"><figcaption> ' + element.title +' </figcaption></figure>';
          projects.innerHTML += figure;
        }
      }
  });
 // Mettre à jour le HTML avec les éléments filtrés
 
}
