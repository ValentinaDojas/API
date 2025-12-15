document.getElementById("generate").addEventListener("click", () => {
    const color = document.getElementById("picker").value.replace("#", "");
    const mode = document.getElementById("mode").value;

    const url = `https://www.thecolorapi.com/scheme?hex=${color}&mode=${mode}&count=5`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            const paletteDiv = document.getElementById("palette");
            paletteDiv.innerHTML = "";

            data.colors.forEach(col => {
                const hex = col.hex.value;

                const boxWrapper = document.createElement("div");
                boxWrapper.className = "color-box";

                const box = document.createElement("div");
                box.className = "color";
                box.style.background = hex;

                const label = document.createElement("p");
                label.textContent = hex;

                box.addEventListener("click", () => {
                    navigator.clipboard.writeText(hex);
                    alert("HEX copiado: " + hex);
                });

                boxWrapper.appendChild(box);
                boxWrapper.appendChild(label);

                paletteDiv.appendChild(boxWrapper);
            });
        })
        .catch(() => {
            alert("Error al obtener los datos de la API.");
        });
});
