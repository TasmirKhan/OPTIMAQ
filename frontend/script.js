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

        "<h3>"+r.id+"</h3>"+

        "<p><b>Status:</b> "+status+"</p>"+

        "<p><b>Capacity:</b> "+r.capacity+"</p>"+

        "<p><b>Load:</b> "+r.load+"</p>"+

        "<p><b>Utilization:</b> "+r.utilization+"%</p>"+

        "<div class='progress'>"+

        "<div class='bar "+color+
        "' style='width:"+r.utilization+"%'></div>"+

        "</div>"+

        "<p><b>Tasks:</b> "+r.tasks+"</p>";

        resourceDiv.appendChild(card);

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
        "No bottlenecks detected";

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

    document.getElementById("health").innerHTML=

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

    "System Loaded<br>"+

    "Resources : "+data.resources.length+"<br>"+

    "Tasks Allocated<br>"+

    "Efficiency Calculated<br>"+

    "Dashboard Updated";

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

gauge.innerHTML=

data.efficiency+"%"+
"<br><small>Efficiency</small>";

if(data.efficiency>85)

gauge.style.borderColor="#2ecc71";

else if(data.efficiency>70)

gauge.style.borderColor="#f39c12";

else

gauge.style.borderColor="#e74c3c";

let grade="B";

if(data.efficiency>90)

grade="A";

else if(data.efficiency>75)

grade="B";

else

grade="C";

gauge.innerHTML=

data.efficiency*1.08+

"<br><small>Smart Score</small>";


}

function toggleDark(){

    document.body.classList.toggle("dark");

}

