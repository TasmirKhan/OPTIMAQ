// async function loadData(){

//     const response = await fetch("/output/result.json");

//     const data = await response.json();

//     document.getElementById("capacity").innerText =
//         data.totalCapacity;

//     document.getElementById("load").innerText =
//         data.totalLoad;

//     document.getElementById("efficiency").innerText =
//         data.efficiency+" %";

//     let resourceDiv =
//         document.getElementById("resources");

//     resourceDiv.innerHTML="";

//     data.resources.forEach(r => {

//         let card = document.createElement("div");

//         card.className="resource";

//         let color="low";

// let status="Optimal";

// if(r.utilization>85)
// status="Critical";

// else if(r.utilization>80)
// color="high";

// else if(r.utilization>60)
// status="Moderate";

// else if(r.utilization>50)
// color="medium";

// card.innerHTML=

// "<h3>"+r.id+"</h3>"+

// "<p><b>Status:</b> "+status+"</p>"+

// "<p><b>Capacity:</b> "+r.capacity+"</p>"+

// "<p><b>Load:</b> "+r.load+"</p>"+

// "<p><b>Utilization:</b> "+r.utilization+"%</p>"+

// "<div class='progress'>"+

// "<div class='bar "+color+"' style='width:"+r.utilization+"%'></div>"+

// "</div>"+

// "<p><b>Tasks:</b> "+r.tasks+"</p>";
//         resourceDiv.appendChild(card);
//     });

//     let bottleneckDiv =
// document.getElementById("bottlenecks");

// if(data.bottlenecks.length===0){

// bottleneckDiv.innerHTML="No bottlenecks detected";

// }
// else{

// bottleneckDiv.innerHTML=
// "<b>Unallocated Tasks:</b><br>"+
// data.bottlenecks;

// }

// document.getElementById("smartscore").innerText =
// Math.round((data.efficiency*0.7)+30);
// }

// function toggleDark(){

// document.body.classList.toggle("dark");

// }

// let overloaded=0;

// data.resources.forEach(r=>{

// if(r.utilization>85)
// overloaded++;

// });

// let health="HEALTHY";

// if(overloaded>=2)
// health="CRITICAL";

// else if(overloaded==1)
// health="MODERATE";

// document.getElementById("health").innerHTML=

// "Status : "+health+
// "<br>Overloaded Resources : "+overloaded;


// let sorted=[...data.resources];

// sorted.sort((a,b)=>b.utilization-a.utilization);

// let table=document.getElementById("ranking");

// sorted.forEach((r,i)=>{

// let row=table.insertRow();

// row.insertCell(0).innerText=i+1;

// row.insertCell(1).innerText=r.id;

// row.insertCell(2).innerText=r.utilization+" %";

// });

// let totalTasks=0;

// data.resources.forEach(r=>{

// totalTasks+=r.tasks.length;

// });

// let failed=data.bottlenecks.length;

// let success=totalTasks/(totalTasks+failed)*100;

// document.getElementById("summary").innerHTML=

// "Total Tasks : "+(totalTasks+failed)+
// "<br>Allocated : "+totalTasks+
// "<br>Failed : "+failed+
// "<br>Success Rate : "+success.toFixed(1)+"%";

// document.getElementById("gauge").innerText=
// data.efficiency+"%";

// let chart=document.getElementById("taskChart");

// data.resources.forEach(r=>{

// let div=document.createElement("div");

// div.className="barChart";

// div.style.width=(r.tasks.length*40)+"px";

// div.innerText=r.id+" : "+r.tasks.length;

// chart.appendChild(div);

// });

// let log=document.getElementById("log");

// log.innerHTML=

// "System Loaded<br>"+
// "Resources Processed : "+data.resources.length+"<br>"+
// "Efficiency Calculated<br>"+
// "Allocation Completed";
let resources=[];
function addResource(){

let id=document.getElementById("rid").value;

let capacity=parseInt(
document.getElementById("capacityInput").value);

let load=parseInt(
document.getElementById("loadInput").value);

let tasks=
document
.getElementById("tasksInput")
.value
.split(",")
.map(t=>t.trim())
.filter(t=>t!="");

let utilization=(load/capacity)*100;

resources.push({

id:id,

capacity:capacity,

load:load,

tasks:tasks,

utilization:utilization.toFixed(1)

});

document.getElementById("rid").value="";
document.getElementById("capacityInput").value="";
document.getElementById("loadInput").value="";
document.getElementById("tasksInput").value="";

loadDataFromMemory();

}


function updateDashboard(){

let data={

resources:resources,

totalCapacity:
resources.reduce((a,b)=>a+b.capacity,0),

totalLoad:
resources.reduce((a,b)=>a+b.load,0),

efficiency:Math.round(
(resources.reduce((a,b)=>a+b.load,0)/
resources.reduce((a,b)=>a+b.capacity,0))*100
),

bottlenecks:[]

};

renderDashboard(data);

}

async function loadData(){

    const response = await fetch("../output/result.json");

    const data = await response.json();

    // Metrics
    document.getElementById("capacity").innerText =
        data.totalCapacity;

    document.getElementById("load").innerText =
        data.totalLoad;

    document.getElementById("efficiency").innerText =
        data.efficiency+" %";

    document.getElementById("smartscore").innerText =
        Math.round(data.efficiency*1.08);

    document.getElementById("allocationData")

    // Resource cards
    let resourceDiv =
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

"<p><b>Status:</b> "+status+"</p>"+

"<p><b>Capacity:</b> "+r.capacity+"</p>"+

"<p><b>Load:</b> "+r.load+"</p>"+

"<p><b>Utilization:</b> "+r.utilization+"%</p>"+

"<div class='progress'>"+

"<div class='bar "+color+
"' style='width:"+r.utilization+"%'></div>"+

"</div>"+

"<p><b>Tasks:</b> "+r.tasks+"</p>";
    });

    // Resource ranking
    let table=document.getElementById("ranking");

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

    // Bottlenecks
    let bottleneckDiv =
        document.getElementById("bottlenecks");

    if(data.bottlenecks.length===0){

        bottleneckDiv.innerHTML=

"<span style='color:#22c55e;font-weight:bold'>✓ System optimal</span>";

    }

    else{

        bottleneckDiv.innerHTML=
        data.bottlenecks;

    }

    // Task distribution
    let chart=document.getElementById("taskChart");

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

    // System health
    let overloaded=0;

    data.resources.forEach(r=>{

        if(r.utilization>85)
            overloaded++;

    });

    let health="HEALTHY";

    if(overloaded>=2)
        health="CRITICAL";

    else if(overloaded==1)
        health="MODERATE";

    

data.resources.forEach(r=>{

if(r.utilization>85)
overloadedCount++;

if(r.utilization<40)
idleCount++;

});

if(overloadedCount>0)
insights.push(
overloadedCount+" resources overloaded"
);

if(idleCount>0)
insights.push(
idleCount+" underutilized resources"
);

if(data.efficiency<75)
insights.push(
"Efficiency improvement possible"
);

if(insights.length===0)
insights.push(
"System running optimally"
);

let ai=document.getElementById("aiInsights");

ai.innerHTML="";

insights.forEach(i=>{

ai.innerHTML+="● "+i+"<br>";

});

"Status : "+health+

"<br>Total Resources : "+data.resources.length+

"<br>Overloaded : "+overloaded+

"<br>Efficiency : "+data.efficiency+"%"+

"<br>Performance Grade : "+
(data.efficiency>85?"A":
data.efficiency>70?"B":"C");

    // Activity log
    let log=document.getElementById("log");

    log.innerHTML=

"● System initialized<br>"+

"● Resources processed : "+data.resources.length+"<br>"+

"● Tasks allocated<br>"+

"● Efficiency calculated<br>"+

"● Optimization ready";

    let totalTasks=0;

data.resources.forEach(r=>{
totalTasks+=r.tasks.length;
});

let failed=data.bottlenecks.length;

let success=
(totalTasks/(totalTasks+failed))*100;

document.getElementById("summary").innerHTML=

"Total Tasks : "+(totalTasks+failed)+
"<br>Allocated : "+totalTasks+
"<br>Failed : "+failed+
"<br>Success Rate : "+success.toFixed(1)+"%";

let gauge=document.getElementById("gauge");

let smartScore=Math.round(data.efficiency*1.08);

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


}

function toggleDark(){

    document.body.classList.toggle("dark");

}

function toggleMenu(btn){

let menu=
btn.parentElement.parentElement
.querySelector(".menuDropdown");

menu.classList.toggle("showMenu");

}

function loadDataFromMemory(){

let data={

resources:resources,

totalCapacity:
resources.reduce((a,b)=>a+b.capacity,0),

totalLoad:
resources.reduce((a,b)=>a+b.load,0),

efficiency:
resources.length>0 ?

Math.round(
(resources.reduce((a,b)=>a+b.load,0)/
resources.reduce((a,b)=>a+b.capacity,0))*100
) : 0,

bottlenecks:[]

};

renderAll(data);

}

function deleteResource(id){

resources=
resources.filter(r=>r.id!==id);

loadDataFromMemory();

}

function optimizeResource(id){

alert("AI recommends optimization for "+id);

}

