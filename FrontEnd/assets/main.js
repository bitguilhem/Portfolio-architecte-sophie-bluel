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
   // console.log(data);
  });

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
  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    //console.log(element);
    const projects = document.querySelector("#projects");
    const figure = '<figure><img src="' + element.imageUrl + '" alt="' + element.title +'"><figcaption> ' + element.title +' </figcaption></figure>';
    projects.innerHTML += figure;
  }
});


let typesUniques = new Set();
maisons.forEach(maison => {
    typesUniques.add(maison.type);
});