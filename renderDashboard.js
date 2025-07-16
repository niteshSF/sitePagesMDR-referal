function newDashboard(key, value) {
  const images = {
    Documents: "assets/documents.png",
    Articles: "assets/articles.png",
    Books: "assets/books.png",
    Manuscripts: "assets/manuscripts.png",
    Users: "assets/icons/users.png",
  };

  const sizes = {
    Documents: { width: "700px", height: "360px" }, // Double size
    Articles: { width: "260px", height: "250px" },
    Books: { width: "260px", height: "250px" },
    Manuscripts: { width: "380px", height: "250px" },
    Users: { width: "140px", height: "140px" },
  };

  const divColmd2 = document.createElement("div");

// in dashboard, document structure is big (adjusted from here)
  let h4cardtitle, h3cardcount;

  if (key === "Documents") {
  divColmd2.className = "col-md-2 w-[510px] mt-24 mr-20";

  h4cardtitle = document.createElement("h4");
  h4cardtitle.className = "bg-purple-400 bg-opacity-60 rounded-xl px-2 h-14 w-80 text-center flex items-center justify-center text-white font-bold text-4xl";
  h4cardtitle.innerHTML = key;

  h3cardcount = document.createElement("h3");
  h3cardcount.className = "bg-purple-400 bg-opacity-60 rounded-xl px-2 h-14 w-52 text-center flex items-center justify-center text-white font-bold text-4xl";
  h3cardcount.innerHTML = value;

} else {
  divColmd2.className = "col-md-2 -mt-14 w-[280px]";

  h4cardtitle = document.createElement("h4");
  h4cardtitle.className = "bg-purple-400 bg-opacity-60 rounded-xl px-2 h-12 w-56 text-center flex items-center justify-center text-white font-semibold text-3xl";
  h4cardtitle.innerHTML = key;

  h3cardcount = document.createElement("h3");
  h3cardcount.className = "bg-purple-400 bg-opacity-60 rounded-xl px-2 h-12 w-36 text-center flex items-center justify-center text-white font-bold text-3xl";
  h3cardcount.innerHTML = value;
}

  const divCard = document.createElement("div");

  const divCardContent = document.createElement("div");
  divCardContent.className =
    "card-content content-primary flex flex-col items-center justify-center text-center gap-2";

  const img = document.createElement("img");
  img.src = images[key] || "assets/icons/default.png";
  img.alt = `${key} Icon`;

  const size = sizes[key] || { width: "260px", height: "160px" };
  img.style.width = size.width;
  img.style.height = size.height;
  img.className = "object-contain";  

  divCardContent.appendChild(img);

  divCardContent.appendChild(h4cardtitle);
  divCardContent.appendChild(h3cardcount);
  
  divCard.appendChild(divCardContent);
  divColmd2.appendChild(divCard);

  return divColmd2;
}

function renderDashboard(prefix, jsonKey) {
  // fetch(serverUrlPort() + prefix)
  fetch(serverUrl() + prefix)      
  
  // Previously used serverUrlPort() to support local development (127.0.0.1:5000)
  // Now replaced with serverUrl() to always use the Netcup server in production
   
    .then((response) => response.json())
    .then((json) => {
      const dataArray = json[jsonKey];
      if (dataArray != null) {
        const order = ["Documents", "Manuscripts", "Books", "Articles", ""];
        const dashboard = document.getElementById("dashboard");

        // Calculate Documents as sum of Manuscripts, Books, Articles
        const totalDocuments =
          (dataArray["Manuscripts"] || 0) +
          (dataArray["Books"] || 0) +
          (dataArray["Articles"] || 0);

        dataArray["Documents"] = totalDocuments;

        order.forEach((key) => {
          if (dataArray[key] != null) {
            dashboard.appendChild(newDashboard(key, dataArray[key]));
          }
        });
      } else {
        const para = document.createElement("p");
        para.innerHTML =
          "<b>This dashboard is empty. It is likely that no such database exists.</b>";
        const elements = document.getElementsByClassName("main main-raised");
        const div = document.createElement("div");
        div.appendChild(para);
        elements[0].appendChild(div);
      }
    });
}
