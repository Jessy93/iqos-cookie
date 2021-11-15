
let parent = document.getElementById('container-sequins');


for (let index = 0; index < 500; index++) {
  let sequin = document.createElement("div"); 
  sequin.innerHTML = `
    <div id="sequin" 
      style="top: ${(Math.random() * 100) + '%'}; 
      left: ${(Math.random() * 100) + '%'};
      right: ${(Math.random() * 100) + '%'};
      bottom: ${(Math.random() * 100) + '%'};
      animation-delay: ${(Math.random() * 100) + '%'}">
    </div>`;

  console.log(sequin);
  parent.append(sequin);
}


