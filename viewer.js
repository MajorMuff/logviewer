var output = "";

function toggleDisplay(lineType) {
    let target = document.getElementsByClassName(lineType);

    for(let i = 0; i < target.length; i++) {
        if(target[i].style.opacity != "0.3") {
            target[i].style.opacity = "0.3";
            target[i].getElementsByClassName("icons")[0].style.opacity = "0.3";
        } else {
            target[i].style.opacity = "100%";
            target[i].getElementsByClassName("icons")[0].style.opacity = "100%";
        }
    }
}

function processLine(line) {
    var tmpLine = line.toLowerCase();
    var newLine = "";

    warning = tmpLine.includes("warning");
    error = tmpLine.includes("error");
    info = tmpLine.includes("info");
    user = tmpLine.includes("user");
    security = tmpLine.includes("security");
    s1 = (tmpLine.includes("socket #1") || tmpLine.includes("socket 1"));
    s2 = (tmpLine.includes("socket #2") || tmpLine.includes("socket 2"));
    modem = tmpLine.includes("modem");
    fw = tmpLine.includes("firmware");
    connect = (tmpLine.includes("connect") || tmpLine.includes("ethernet"));

    if(warning) {
        newLine += "<div class=\"warning\">";
    } else if (info) {
        newLine += "<div class=\"info\">";
    } else if (error) {
        newLine += "<div class=\"error\">";
    } else if (security) {
        newLine += "<div class=\"security\">";
    } else if (user) {
        newLine += "<div class=\"user\">";
    } else {
        newLine += "<div class=\"other\">";
    }

    newLine += line;

    newLine += "<span class=\"icons\">";

    if(s1) {
        newLine += "<span class=\"socket\" title=\"Socket 1\">S1</span>";
    }
    if (s2) {
        newLine += "<span class=\"socket\" title=\"Socket 2\">S2</span>";
    }
    if (modem) {
        newLine += "<span class=\"modem\" title=\"Modem\">M</span>";
    }
    if (fw) {
        newLine += "<span class=\"fw\" title=\"Firmware\">F</span>";
    }
    if (connect) {
        newLine += "<span class=\"connect\" title=\"Connection/Ethernet\">C</span>";
    }

    
    newLine += "</span></div>";

    newLine = newLine.replace("T", " ");
    newLine = newLine.replace("Z:", " :    ");

    output += newLine;
}

document.getElementById("logfile").addEventListener("change", function () {
    document.getElementById("errorsToggle").checked = true;
    document.getElementById("warningsToggle").checked = true;
    document.getElementById("userToggle").checked = true;
    document.getElementById("infoToggle").checked = true;
    document.getElementById("securityToggle").checked = true;
    document.getElementById("otherToggle").checked = true;

    document.getElementById("checkboxes").style.display = "block";
    output = ""
    document.getElementById("output").innerHTML = output;
    
    const file = this.files[0];
    const reader = new FileReader();

    reader.onload = function () {
        const lines = reader.result.split('\n');
        lines.forEach(line => processLine(line));
        document.getElementById("output").innerHTML = output;
    };

    reader.readAsText(file);
});

document.getElementById("errorsToggle").addEventListener("change", function () { 
    toggleDisplay("error");
});
document.getElementById("warningsToggle").addEventListener("change", function () {
    toggleDisplay("warning");
});
document.getElementById("infoToggle").addEventListener("change", function () {
    toggleDisplay("info");
});
document.getElementById("userToggle").addEventListener("change", function () {
    toggleDisplay("user");
});
document.getElementById("securityToggle").addEventListener("change", function () {
    toggleDisplay("security");
});
document.getElementById("otherToggle").addEventListener("change", function () {
    toggleDisplay("other");
});