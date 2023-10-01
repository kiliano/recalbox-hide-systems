// Function to extract system details from the specified XML
function systemsFromXml(xml) {
    let systemsArray = [];
    let systems = xml.getElementsByTagName('system');
    for (let i = 0; i < systems.length; i++) {
        let system = systems[i];
        let name = system.getAttribute('name');
        let fullname = system.getAttribute('fullname');
        systemsArray.push({name, fullname});
    }
    return systemsArray;
}

// Function to load the XML file and parse it into a list of systems
function loadXMLAndParseSystems() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "systemlist.xml", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let xmlDoc = xhr.responseXML;
            let systemsArray = systemsFromXml(xmlDoc);
            let innerHtmlSystems = "";

            systemsArray.forEach(function(obj){
                const htmlObj = `
                <label><input type="checkbox" name="emulator" value="${obj.name}" checked> <p>${obj.fullname}</p></label>`;
                innerHtmlSystems += htmlObj;
            });



            
            // Update the #emulators div after successfully loading the XML
            document.getElementById('emulators').innerHTML = innerHtmlSystems;
        }
    };
    xhr.send(null);
}


// Btn Generate
document.getElementById("generateBtn").addEventListener("click", function() {
    let uncheckedValues = [];
    let checkboxes = document.querySelectorAll('input[name="emulator"]:not(:checked)');

    checkboxes.forEach(checkbox => {
        uncheckedValues.push(checkbox.value);
    });
    
    if(uncheckedValues.length > 0) {
        let recalboxConf = "#Hide Systems\n\n";

        uncheckedValues.forEach(function(str){
            recalboxConf += `${str}.ignore=1\n`;
        });

        document.getElementById("code").innerHTML = recalboxConf;

    } else {
        alert("Select some systems to hide.");
    }
});

// Btn Copy the Code
function copyCode() {
    let code = document.querySelector("pre").textContent;
    let textarea = document.createElement('textarea');
    textarea.textContent = code;
    document.body.append(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert("Code copied to clipboard!");
}

// Load the XML upon page load
window.onload = loadXMLAndParseSystems;
