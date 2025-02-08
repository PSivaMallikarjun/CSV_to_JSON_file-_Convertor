function convertCSVtoJSON() {
    const fileInput = document.getElementById("csvFile");
    const jsonOutput = document.getElementById("jsonOutput");
    const downloadBtn = document.getElementById("downloadBtn");

    if (fileInput.files.length === 0) {
        alert("Please upload a CSV file first.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
        const csv = event.target.result;
        const lines = csv.split("\n");
        const headers = lines[0].split(",").map(header => header.trim());
        const jsonData = [];

        for (let i = 1; i < lines.length; i++) {
            if (!lines[i].trim()) continue;
            const values = lines[i].split(",").map(value => value.trim());
            let obj = {};
            headers.forEach((header, index) => {
                obj[header] = values[index];
            });
            jsonData.push(obj);
        }

        const jsonString = JSON.stringify(jsonData, null, 2);
        jsonOutput.textContent = jsonString;
        downloadBtn.style.display = "block";
        downloadBtn.setAttribute("data-json", jsonString);
    };

    reader.readAsText(fileInput.files[0]);
}

function downloadJSON() {
    const jsonString = document.getElementById("downloadBtn").getAttribute("data-json");
    const blob = new Blob([jsonString], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "data.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
