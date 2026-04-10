let resources = [];

// Load resources from localStorage on page load
function loadResourcesFromStorage() {
    const stored = localStorage.getItem('optimaq_resources');
    if (stored) {
        resources = JSON.parse(stored);
    }
}

// Save resources to localStorage
function saveResourcesToStorage() {
    localStorage.setItem('optimaq_resources', JSON.stringify(resources));
}

// Initialize on page load
window.onload = function() {
    loadResourcesFromStorage();
    loadDataFromMemory();

    let savedTheme = localStorage.getItem("optimaqTheme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark");
    }

    // Show initial toast if resources exist
    if (resources.length > 0) {
        showToast(`Loaded ${resources.length} resources from storage`, "success");
    }
};

/* ADD RESOURCE */
function addResource() {
    let id = document.getElementById("rid").value;
    let capacity = parseInt(document.getElementById("capacityInput").value);
    let load = parseInt(document.getElementById("loadInput").value);
    let tasks = document.getElementById("tasksInput").value.split(",").map(t => t.trim()).filter(t => t != "");

    if (!id || !capacity || load == null) {
        showToast("Please fill all required fields", "warning");
        return;
    }

    // Check if resource already exists
    if (resources.some(r => r.id === id)) {
        showToast("Resource with this ID already exists", "warning");
        return;
    }

    let utilization = capacity > 0 ? (load / capacity) * 100 : 0;

    resources.push({
        id: id,
        capacity: capacity,
        load: load,
        tasks: tasks,
        utilization: utilization.toFixed(1)
    });

    saveResourcesToStorage();

    /* clear inputs */
    document.getElementById("rid").value = "";
    document.getElementById("capacityInput").value = "";
    document.getElementById("loadInput").value = "";
    document.getElementById("tasksInput").value = "";

    loadDataFromMemory();
    showToast("Resource added successfully", "success");
}


/* MASTER RENDER ENGINE */

function renderAll(data){

/* KPIs */

document.getElementById("capacity").innerText=
data.totalCapacity;

document.getElementById("load").innerText=
data.totalLoad;

document.getElementById("efficiency").innerText=
data.efficiency+" %";

let smartScore=
Math.round(data.efficiency*1.08);

document.getElementById("smartscore").innerText=
smartScore;


let potential=

Math.min(
100,
data.efficiency+
(Math.random()*8)
.toFixed(1)
);

let suggest=
document.getElementById("aiSuggestions");

if(suggest){

suggest.innerHTML=

"Potential efficiency after optimization: <b>"+

potential+

"%</b>";

}

let sim=
document.getElementById("simulationPanel");

if(sim){

let predicted=
Math.min(
100,
data.efficiency+
Math.floor(Math.random()*10)
);

let gain=
predicted-data.efficiency;

sim.innerHTML=

"Current Efficiency : "+data.efficiency+"%<br>"+

"Predicted Efficiency : "+predicted+"%<br>"+

"Improvement : <span class='simGain'>+"+
gain+"%</span>";

}
/* RESOURCE CARDS */

let resourceDiv=
document.getElementById("resources");

resourceDiv.innerHTML="";

data.resources.forEach(r=>{

let color="low";

if(r.utilization>80)
color="high";

else if(r.utilization>50)
color="medium";

let status="Optimal";

if(r.utilization>85)
status="Critical";

else if(r.utilization>60)
status="Moderate";

let card=document.createElement("div");

card.className="resource";

card.innerHTML=

"<div class='resourceHeader'>"+

"<h3>"+r.id+"</h3>"+

"<div class='menuBtn' onclick='toggleMenu(this)'>⋮</div>"+

"</div>"+

"<div class='menuDropdown'>"+

"<div onclick='optimizeResource(\""+r.id+"\")'>Optimize</div>"+

"<div onclick='deleteResource(\""+r.id+"\")'>Delete</div>"+

"</div>"+

"<p>Status: <span class='status "+status+"'>"+status+"</span></p>"+

"<p><b>Capacity:</b> "+r.capacity+"</p>"+

"<p><b>Load:</b> "+r.load+"</p>"+

"<p><b>Utilization:</b> "+r.utilization+"%</p>"+

"<div class='progress'>"+

"<div class='bar "+color+
"' style='width:"+r.utilization+"%'></div>"+

"</div>"+

"<p><b>Tasks:</b> "+r.tasks+"</p>";

resourceDiv.appendChild(card);

})

let ctx=
document
.getElementById("utilChart");

if(ctx){

let labels=
data.resources.map(r=>r.id);

let values=
data.resources.map(r=>
parseFloat(r.utilization)
);

if(window.chart)
window.chart.destroy();

window.chart=
new Chart(ctx,{

type:'bar',

data:{

labels:labels,

datasets:[{

label:
'Utilization %',

data:values,

backgroundColor:

values.map(v=>

v>85 ? '#ef4444' :

v>60 ? '#f59e0b' :

'#22c55e'

)

}]

},

options:{

responsive:true,

plugins:{

legend:{
display:false
}

},

scales:{

y:{
beginAtZero:true,
max:100
}

}

}

});

}
;


/* RANKING */

let table=
document.getElementById("ranking");

table.innerHTML=

"<tr><th>Rank</th><th>Resource</th><th>Utilization</th></tr>";

let sorted=[...data.resources];

sorted.sort((a,b)=>b.utilization-a.utilization);

sorted.forEach((r,i)=>{

let row=table.insertRow();

row.insertCell(0).innerText=i+1;

row.insertCell(1).innerText=r.id;

row.insertCell(2).innerText=r.utilization+" %";

});

/* TASK CHART */

let chart=
document.getElementById("taskChart");

chart.innerHTML="";

data.resources.forEach(r=>{

let bar=document.createElement("div");

bar.className="barChart";

bar.style.width=
(r.tasks.length*60)+"px";

bar.innerText=
r.id+" : "+r.tasks.length+" tasks";

chart.appendChild(bar);

});


/* SYSTEM HEALTH */

let overloaded=0;

let idle=0;

data.resources.forEach(r=>{

if(r.utilization>85)
overloaded++;

if(r.utilization<40)
idle++;

});

let health="HEALTHY";

if(overloaded>=2)
health="CRITICAL";

else if(overloaded==1)
health="MODERATE";

document.getElementById("health").innerHTML=

"Status : "+health+

"<br>Total Resources : "+data.resources.length+

"<br>Overloaded : "+overloaded+

"<br>Efficiency : "+data.efficiency+"%"+

"<br>Performance Grade : "+

(data.efficiency>85?"A":
data.efficiency>70?"B":"C");


/* AI INSIGHTS */

let insights=[];

if(overloaded>0)
insights.push(overloaded+" resources overloaded");

if(idle>0)
insights.push(idle+" underutilized resources");

if(data.efficiency<75)
insights.push("Efficiency improvement possible");

if(insights.length==0)
insights.push("System running optimally");

let ai=
document.getElementById("aiInsights");

if(ai){

ai.innerHTML="";

insights.forEach(i=>{

ai.innerHTML+="● "+i+"<br>";

});

}


/* BOTTLENECKS */

let bottleneckDiv=
document.getElementById("bottlenecks");

if(data.bottlenecks.length==0){

bottleneckDiv.innerHTML=

"<span style='color:#22c55e;font-weight:bold'>✓ System optimal</span>";

}

else{

bottleneckDiv.innerHTML=
data.bottlenecks;

}


/* SUMMARY */

let totalTasks=0;

data.resources.forEach(r=>{

totalTasks+=r.tasks.length;

});

let failed=
data.bottlenecks.length;

let success=
totalTasks>0 ?

(totalTasks/(totalTasks+failed))*100

:0;

document.getElementById("summary").innerHTML=

"Total Tasks : "+(totalTasks+failed)+

"<br>Allocated : "+totalTasks+

"<br>Failed : "+failed+

"<br>Success Rate : "+success.toFixed(1)+"%";


/* GAUGE */

let gauge=
document.getElementById("gauge");

let grade="C";

if(smartScore>90)
grade="A";

else if(smartScore>75)
grade="B";

if(smartScore>85)
gauge.style.borderColor="#22c55e";

else if(smartScore>70)
gauge.style.borderColor="#f59e0b";

else
gauge.style.borderColor="#ef4444";

gauge.innerHTML=

smartScore+

"<br><small>Smart Score</small>"+

"<br><small>Grade "+grade+"</small>";


/* ACTIVITY LOG */

let log=
document.getElementById("log");

log.innerHTML=

"● System initialized<br>"+

"● Resources processed : "+data.resources.length+"<br>"+

"● Tasks allocated<br>"+

"● Efficiency calculated<br>"+

"● Optimization ready";


let compare=
document.getElementById("compareTable");

if(compare){

compare.innerHTML=

"<tr><th>Resource</th><th>Capacity</th><th>Load</th><th>Utilization</th><th>Status</th></tr>";

let sorted=[...data.resources];

sorted.sort((a,b)=>b.utilization-a.utilization);

sorted.slice(0,3).forEach(r=>{

let status="Optimal";

if(r.utilization>85)
status="Critical";

else if(r.utilization>60)
status="Moderate";

let row=compare.insertRow();

row.insertCell(0).innerText=r.id;

row.insertCell(1).innerText=r.capacity;

row.insertCell(2).innerText=r.load;

row.insertCell(3).innerText=r.utilization+"%";

row.insertCell(4).innerText=status;

});

}

}


/* MEMORY DATA */

function loadDataFromMemory(){

let totalCap=
resources.reduce((a,b)=>a+b.capacity,0);

let totalLoad=
resources.reduce((a,b)=>a+b.load,0);

let efficiency=
totalCap>0 ?

Math.round((totalLoad/totalCap)*100)

:0;

let data={

resources:resources,

totalCapacity:totalCap,

totalLoad:totalLoad,

efficiency:efficiency,

bottlenecks:[]

};

renderAll(data);

}


/* FILE DATA */
async function loadData() {
    showLoader();

    try {
        const response = await fetch("../output/result.json");
        const data = await response.json();

        // Save fetched data to localStorage for persistence
        localStorage.setItem('optimaq_last_optimization', JSON.stringify(data));

        setTimeout(() => {
            renderAll(data);
            hideLoader();
            showToast("Optimization complete", "success");
        }, 800);
    } catch (error) {
        console.error('Error loading data:', error);
        hideLoader();
        showToast("Failed to load optimization data", "danger");

        // Try to load from localStorage as fallback
        const cached = localStorage.getItem('optimaq_last_optimization');
        if (cached) {
            const data = JSON.parse(cached);
            renderAll(data);
            showToast("Loaded cached optimization data", "warning");
        }
    }
}


/* MENU */

function toggleMenu(btn){

let menu=
btn.parentElement.parentElement
.querySelector(".menuDropdown");

menu.classList.toggle("showMenu");

}


/* DELETE */
function deleteResource(id) {
    resources = resources.filter(r => r.id !== id);
    saveResourcesToStorage();
    loadDataFromMemory();
    showToast("Resource deleted", "danger");
}


/* OPTIMIZE */

function optimizeResource(id){

showToast(
"Optimization suggested for "+id,
"warning"
);

}


/* DARK MODE */

function toggleDark(){

document.body.classList.toggle("dark");

let isDark=
document.body.classList.contains("dark");

localStorage.setItem(
"optimaqTheme",
isDark ? "dark" : "light"
);

}

function filterResources(){

let value=
document
.getElementById("searchResource")
.value
.toLowerCase();

let cards=
document.querySelectorAll(".resource");

cards.forEach(card=>{

let name=
card.querySelector("h3")
.innerText
.toLowerCase();

if(name.includes(value))

card.style.display="block";

else

card.style.display="none";

});

}

function exportReport(){
    let text = "OPTIMAQ REPORT\n\n" +
        "Resources: " + resources.length + "\n" +
        "Efficiency: " + (document.getElementById("efficiency") ? document.getElementById("efficiency").innerText : "N/A");

    let blob = new Blob([text], {type:"text/plain"});
    let a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "optimaq_report.txt";
    a.click();
}

function clearAllData() {
    if (confirm("Are you sure you want to clear all data? This cannot be undone.")) {
        resources = [];
        localStorage.removeItem('optimaq_resources');
        localStorage.removeItem('optimaq_last_optimization');
        localStorage.removeItem('optimaqTheme');
        loadDataFromMemory();
        showToast("All data cleared", "warning");
        location.reload(); // Reload to reset everything
    }
}

window.onload = function(){
    loadResourcesFromStorage();
    loadDataFromMemory();

    let savedTheme = localStorage.getItem("optimaqTheme");
    if(savedTheme === "dark") {
        document.body.classList.add("dark");
    }

    // Show initial toast if resources exist
    if (resources.length > 0) {
        showToast(`Loaded ${resources.length} resources from storage`, "success");
    }
}

function showToast(message,type="success"){

let toast=
document.getElementById("toast");

toast.innerText=message;

toast.className="showToast "+type;

setTimeout(()=>{

toast.className="";

},2500);

}

showToast("Resource added");

function showLoader(){

document
.getElementById("loader")
.classList.add("showLoader");

}

function hideLoader(){

document
.getElementById("loader")
.classList.remove("showLoader");

}