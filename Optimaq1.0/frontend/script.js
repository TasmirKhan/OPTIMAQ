let resources = [];
const AUTH_KEY = 'optimaq_logged_in';
const LAST_OPTIMIZATION_KEY = 'optimaq_last_optimization';
const DATASET_NAME_KEY = 'optimaq_dataset_name';
const DATASET_TYPE_KEY = 'optimaq_dataset_type';

/* DATA IMPORT & NORMALIZATION */
function normalizeDataset(data, datasetType = 'generic') {
    const normalized = [];
    
    if (!Array.isArray(data)) {
        throw new Error('Data must be an array of resources');
    }
    
    data.forEach((item, index) => {
        try {
            // Extract ID
            let id = item.id || item.name || item.resourceName || item.resource_name || `Resource_${index + 1}`;
            
            // Extract capacity with fallbacks
            let capacity = item.capacity || item.max_capacity || item.totalBeds || item.total_capacity || item.max_load || 0;
            capacity = parseFloat(capacity) || 0;
            
            // Extract current load with fallbacks
            let load = item.load || item.current_load || item.occupiedBeds || item.occupied || item.usage || 0;
            load = parseFloat(load) || 0;
            
            // Extract tasks
            let tasks = item.tasks || item.activities || item.allocations || item.assignments || [];
            
            // Convert tasks to array if needed
            if (!Array.isArray(tasks)) {
                if (typeof tasks === 'string') {
                    tasks = tasks.split(',').map(t => t.trim()).filter(t => t);
                } else {
                    tasks = [];
                }
            }
            
            // Validate and constrain values
            capacity = Math.max(0, capacity);
            load = Math.max(0, Math.min(load, capacity)); // Load cannot exceed capacity
            
            // Calculate utilization
            let utilization = capacity > 0 ? parseFloat(((load / capacity) * 100).toFixed(1)) : 0;
            utilization = Math.max(0, Math.min(utilization, 100)); // Keep between 0-100
            
            normalized.push({
                id: String(id),
                capacity: capacity,
                load: load,
                tasks: tasks,
                utilization: utilization
            });
        } catch (err) {
            console.warn(`Warning: Error normalizing record ${index}:`, err);
            // Skip this record but continue processing others
        }
    });
    
    if (normalized.length === 0) {
        throw new Error('No valid resources could be extracted from the dataset');
    }
    
    return normalized;
}

function validateDataset(data) {
    if (!Array.isArray(data) || data.length === 0) {
        throw new Error('Dataset must be a non-empty array');
    }
}

function importDataset(data, datasetName = 'Custom Dataset', datasetType = 'generic') {
    try {
        console.log('📥 Starting import:', { datasetName, datasetType, itemCount: data.length });
        validateDataset(data);
        const normalized = normalizeDataset(data, datasetType);
        resources = normalized;
        
        // Triple-check: save to storage immediately
        saveResourcesToStorage();
        
        // Verify the save
        const verify = localStorage.getItem('optimaq_resources');
        const verifyCount = verify ? JSON.parse(verify).length : 0;
        console.log(`✓ Saved to localStorage: ${verifyCount} resources`);
        
        localStorage.setItem(DATASET_NAME_KEY, datasetName);
        localStorage.setItem(DATASET_TYPE_KEY, datasetType);
        
        console.log(`✓ Import successful: ${normalized.length} resources processed`);
        return { success: true, resourceCount: resources.length };
    } catch (error) {
        console.error('❌ Import failed:', error.message);
        return { success: false, error: error.message };
    }
}

function parseCSV(csvText) {
    const lines = csvText.split('\n').filter(line => line.trim());
    if (lines.length < 2) throw new Error('CSV must have header and at least one data row');
    
    // Parse header
    const headers = parseCSVLine(lines[0]).map(h => h.trim().toLowerCase());
    const data = [];
    
    // Parse data rows
    for (let i = 1; i < lines.length; i++) {
        const values = parseCSVLine(lines[i]);
        const record = {};
        headers.forEach((header, idx) => {
            record[header] = values[idx] ? values[idx].trim() : '';
        });
        data.push(record);
    }
    
    return data;
}

// Helper function to parse CSV line respecting quoted fields
function parseCSVLine(line) {
    const result = [];
    let current = '';
    let insideQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        const nextChar = line[i + 1];
        
        if (char === '"') {
            if (insideQuotes && nextChar === '"') {
                // Escaped quote
                current += '"';
                i++;
            } else {
                // Toggle quote state
                insideQuotes = !insideQuotes;
            }
        } else if (char === ',' && !insideQuotes) {
            // Field separator
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    
    result.push(current.trim());
    return result;
}

function getDatasetInfo() {
    return {
        name: localStorage.getItem(DATASET_NAME_KEY) || 'Default Dataset',
        type: localStorage.getItem(DATASET_TYPE_KEY) || 'generic',
        resourceCount: resources.length
    };
}

// Load resources from localStorage
function loadResourcesFromStorage() {
    const stored = localStorage.getItem('optimaq_resources');
    if (stored) {
        try {
            resources = JSON.parse(stored);
            // Ensure tasks are arrays
            resources = resources.map(r => ({
                ...r,
                tasks: Array.isArray(r.tasks) ? r.tasks : [],
                capacity: Number(r.capacity) || 0,
                load: Number(r.load) || 0,
                utilization: Number(r.utilization) || 0
            }));
        } catch (err) {
            console.error('Error loading resources from storage:', err);
            resources = [];
        }
    }
}

// Save resources to localStorage
function saveResourcesToStorage() {
    localStorage.setItem('optimaq_resources', JSON.stringify(resources));
}

function isUserLoggedIn() {
    return localStorage.getItem(AUTH_KEY) === 'true';
}

function requireLogin() {
    if (!isUserLoggedIn()) {
        window.location.href = 'login.html';
    }
}

function loginUser(username, password) {
    const validUsername = 'admin';
    const validPassword = 'optimaq123';

    if (username === validUsername && password === validPassword) {
        localStorage.setItem(AUTH_KEY, 'true');
        showToast('Login successful', 'success');
        window.location.href = 'dashboard.html';
        return true;
    }

    showToast('Invalid credentials', 'danger');
    return false;
}

function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    loginUser(username, password);
}

function logoutUser() {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(LAST_OPTIMIZATION_KEY);
    window.location.href = 'login.html';
}

function renderAuthButton() {
    const authButton = document.getElementById('authButton');
    if (!authButton) {
        return;
    }

    if (isUserLoggedIn()) {
        authButton.innerHTML = '<i class="fas fa-sign-out-alt"></i> Logout';
        authButton.href = 'javascript:void(0)';
        authButton.onclick = logoutUser;
    } else {
        authButton.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login';
        authButton.href = 'login.html';
        authButton.onclick = null;
    }
}


function getSharedWorkspaceState() {
    const datasetName = localStorage.getItem(DATASET_NAME_KEY) || 'Default Dataset';
    const datasetType = localStorage.getItem(DATASET_TYPE_KEY) || 'generic';
    const storedResources = localStorage.getItem('optimaq_resources');
    const resourceCount = storedResources ? JSON.parse(storedResources).length : resources.length;
    const optimized = localStorage.getItem('optimaq_last_optimization');
    return { datasetName, datasetType, resourceCount, hasOptimization: !!optimized };
}

function renderGlobalWorkspaceBanner() {
    const nav = document.querySelector('.navbar');
    if (!nav || document.getElementById('workspaceBanner')) return;
    const state = getSharedWorkspaceState();
    const banner = document.createElement('section');
    banner.id = 'workspaceBanner';
    banner.className = 'workspace-banner';
    banner.innerHTML = `
        <div class="workspace-item"><strong>Dataset:</strong> ${state.datasetName}</div>
        <div class="workspace-item"><strong>Type:</strong> ${state.datasetType}</div>
        <div class="workspace-item"><strong>Resources:</strong> ${state.resourceCount}</div>
        <div class="workspace-item"><strong>Status:</strong> ${state.hasOptimization ? 'Optimization available' : 'Awaiting optimization'}</div>
    `;
    nav.insertAdjacentElement('afterend', banner);
}

function initGlobal() {
    loadResourcesFromStorage();
    renderAuthButton();
    renderGlobalWorkspaceBanner();

    let savedTheme = localStorage.getItem('optimaqTheme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
    }

    if (resources.length > 0) {
        showToast(`Loaded ${resources.length} resources from storage`, 'success');
    }
}

document.addEventListener('DOMContentLoaded', initGlobal);

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

const capacityEl = document.getElementById("capacity") || document.getElementById("metric-capacity");
const loadEl = document.getElementById("load") || document.getElementById("metric-load");
const efficiencyEl = document.getElementById("efficiency") || document.getElementById("metric-efficiency");

if (capacityEl) capacityEl.innerText = data.totalCapacity;
if (loadEl) loadEl.innerText = data.totalLoad;
if (efficiencyEl) efficiencyEl.innerText = data.efficiency + " %";

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

let resourceDiv=document.getElementById("resources");

if(resourceDiv) {
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
            "<div class='bar "+color+"' style='width:"+r.utilization+"%'></div>"+
            "</div>"+
            "<p><b>Tasks:</b> "+(Array.isArray(r.tasks) ? r.tasks.join(', ') : r.tasks)+"</p>";
        resourceDiv.appendChild(card);
    });
}

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

let table=document.getElementById("ranking");
if(table) {
    table.innerHTML="<tr><th>Rank</th><th>Resource</th><th>Utilization</th></tr>";
    let sorted=[...data.resources];
    sorted.sort((a,b)=>b.utilization-a.utilization);
    sorted.forEach((r,i)=>{
        let row=table.insertRow();
        row.insertCell(0).innerText=i+1;
        row.insertCell(1).innerText=r.id;
        row.insertCell(2).innerText=r.utilization+" %";
    });
}

/* TASK CHART */

let chart=document.getElementById("taskChart");
if(chart) {
    chart.innerHTML="";
    data.resources.forEach(r=>{
        let bar=document.createElement("div");
        bar.className="barChart";
        let taskCount=Array.isArray(r.tasks) ? r.tasks.length : 0;
        let calculatedWidth=Math.min(taskCount*45,600);
        bar.style.width=calculatedWidth+"px";
        bar.style.flexBasis=calculatedWidth+"px";
        bar.title=r.id+" : "+taskCount+" tasks";
        bar.innerText=r.id+" : "+taskCount+" tasks";
        chart.appendChild(bar);
    });
}


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

const healthEl = document.getElementById("health") || document.getElementById("healthPanel");
if (healthEl) {
    healthEl.innerHTML=
    "Status : "+health+
    "<br>Total Resources : "+data.resources.length+
    "<br>Overloaded : "+overloaded+
    "<br>Efficiency : "+data.efficiency+"%"+
    "<br>Performance Grade : "+
    (data.efficiency>85?"A":
    data.efficiency>70?"B":"C");
}


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

let bottleneckDiv=document.getElementById("bottlenecks");
if(bottleneckDiv) {
    if(data.bottlenecks && data.bottlenecks.length==0){
        bottleneckDiv.innerHTML="<span style='color:#22c55e;font-weight:bold'>✓ System optimal</span>";
    } else if(data.bottlenecks){
        bottleneckDiv.innerHTML=data.bottlenecks;
    }
}


/* SUMMARY */

let totalTasks=0;

data.resources.forEach(r=>{
    // Ensure tasks is an array
    let taskCount = Array.isArray(r.tasks) ? r.tasks.length : 0;
    totalTasks += taskCount;
});

let failed=data.bottlenecks && data.bottlenecks.length ? data.bottlenecks.length : 0;

let success=totalTasks>0 ? (totalTasks/(totalTasks+failed))*100 : 0;

const summaryEl = document.getElementById("summary");
if (summaryEl) {
    summaryEl.innerHTML=
        "Total Tasks : "+(totalTasks+failed)+
        "<br>Allocated : "+totalTasks+
        "<br>Failed : "+failed+
        "<br>Success Rate : "+success.toFixed(1)+"%";
}


/* GAUGE */

let gauge=document.getElementById("gauge");
if(gauge) {
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

    gauge.innerHTML=smartScore+"<br><small>Smart Score</small>"+"<br><small>Grade "+grade+"</small>";
}


/* ACTIVITY LOG */

let log=document.getElementById("log");
if(log) {
    log.innerHTML=
        "● System initialized<br>"+
        "● Resources processed : "+data.resources.length+"<br>"+
        "● Tasks allocated<br>"+
        "● Efficiency calculated<br>"+
        "● Optimization ready";
}


let compare=
document.getElementById("compareTable");

if(compare){

// Rebuild table completely with fresh HTML
let tableHTML = "<tr><th>Resource</th><th>Capacity</th><th>Load</th><th>Utilization</th><th>Status</th></tr>";

if(data.resources && data.resources.length>0){

let sorted=[...data.resources];

sorted.sort((a,b)=>b.utilization-a.utilization);

sorted.slice(0,3).forEach(r=>{

let status="Optimal";

if(r.utilization>85)
status="Critical";

else if(r.utilization>60)
status="Moderate";

tableHTML += "<tr>";
tableHTML += "<td>"+r.id+"</td>";
tableHTML += "<td>"+r.capacity+"</td>";
tableHTML += "<td>"+r.load+"</td>";
tableHTML += "<td>"+r.utilization+"%</td>";
tableHTML += "<td>"+status+"</td>";
tableHTML += "</tr>";

});

}

compare.innerHTML = tableHTML;

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
        const response = await fetch("output/result.json");
        const data = await response.json();

        // Persist the loaded resource dataset so all pages can use it
        if (Array.isArray(data.resources)) {
            resources = data.resources.map(r => ({
                id: r.id,
                capacity: Number(r.capacity) || 0,
                load: Number(r.load) || 0,
                tasks: Array.isArray(r.tasks) ? r.tasks : [],
                utilization: Number(r.utilization) || 0
            }));
            saveResourcesToStorage();
        }

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
    const resource = resources.find(r => r.id === id);
    if (!resource) {
        showToast("Resource not found", "danger");
        return;
    }

    const currentUtil = parseFloat(resource.utilization);
    let newLoad = resource.load;

    if (currentUtil > 85) {
        newLoad = Math.max(0, Math.round(resource.capacity * 0.85));
    } else if (currentUtil < 60) {
        newLoad = Math.min(resource.capacity, Math.round(resource.capacity * 0.65));
    } else {
        newLoad = Math.round(resource.capacity * 0.75);
    }

    resource.load = newLoad;
    resource.utilization = resource.capacity > 0 ? ((newLoad / resource.capacity) * 100).toFixed(1) : 0;
    saveResourcesToStorage();
    loadDataFromMemory();
    showToast("Resource " + id + " optimized successfully", "success");
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

function refreshDashboard() {
    loadDataFromMemory();
    showToast("Dashboard refreshed", "success");
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



function deriveAiMetricsFromResources(dataResources) {
    const rows = Array.isArray(dataResources) ? dataResources : [];
    const util = rows.map(r => Number(r.utilization ?? ((Number(r.load)||0)/(Math.max(Number(r.capacity)||1,1))*100)) || 0);
    const avg = util.length ? util.reduce((a,b)=>a+b,0)/util.length : 0;
    const high = util.filter(v=>v>85).length;
    const low = util.filter(v=>v<30).length;
    const spikes = util.filter(v=>v>avg+20).length;
    const missing = rows.filter(r=>!r.id || r.capacity==null || r.load==null).length;
    const score = Math.max(35, Math.min(98, Math.round(100 - high*8 - spikes*5 - missing*4 + low*2)));
    const confidence = Math.max(70, Math.min(97, 92 - missing*4 + Math.min(rows.length,10)/3));
    const risk = high>2 || spikes>2 ? 'High' : (high>0 || spikes>0 ? 'Medium' : 'Low');
    const potential = avg>75 || low>1 ? 'High' : (avg>55 ? 'Medium' : 'Low');
    return {rows,avg,high,low,spikes,missing,score,confidence:Math.round(confidence),risk,potential};
}

function buildAiRecommendations(m) {
    const rec=[]; const an=[];
    if (m.high>0) { rec.push(['Critical', `${m.high} resources exceed 85% utilization. Enable autoscaling and rebalance workloads immediately.`]); an.push('High utilization pressure detected in compute pool.'); }
    if (m.low>0) rec.push(['Important', `${m.low} resources are underutilized (<30%). Consolidate or reduce allocation to cut waste.`]);
    if (m.spikes>0) { rec.push(['Important', `Detected ${m.spikes} unusual utilization spikes. Configure burst limits and peak-hour policies.`]); an.push('Sudden traffic/resource spike pattern detected.'); }
    if (m.missing>0) { rec.push(['Suggested', `${m.missing} records have incomplete values. Improve data quality for better forecasts.`]); an.push('Missing value anomalies may reduce prediction quality.'); }
    rec.push(['Suggested', `Current average utilization is ${m.avg.toFixed(1)}%. Target 60-75% range for stable efficiency.`]);
    if (!an.length) an.push('No critical anomalies found. Environment is stable.');
    return {rec,an};
}

function renderAiAdvisor() {
    const m=deriveAiMetricsFromResources(resources);
    const x=buildAiRecommendations(m);
    const summaryTemplates=[
      `Dataset analysis indicates ${m.avg.toFixed(1)}% average utilization with ${m.high} high-pressure nodes and ${m.low} underutilized nodes.`,
      `Operational review shows ${m.spikes} spike events and risk level ${m.risk.toLowerCase()}. Optimization potential is ${m.potential.toLowerCase()}.`,
      `AI assessment found ${m.missing} data-quality gaps; confidence remains ${m.confidence}% based on available telemetry.`
    ];
    const summaryEl=document.getElementById('aiSummaryText'); if(summaryEl) summaryEl.textContent=summaryTemplates.join(' ');
    const map={aiOptScore:m.score,aiConfidence:`${m.confidence}%`,aiRisk:m.risk,aiPotential:m.potential};
    Object.entries(map).forEach(([id,v])=>{const el=document.getElementById(id); if(el) el.textContent=v;});
    const reco=document.getElementById('aiRecoList'); if(reco) reco.innerHTML=x.rec.map(([p,t])=>`<li><strong>${p}:</strong> ${t}</li>`).join('');
    const ano=document.getElementById('aiAnomalyList'); if(ano) ano.innerHTML=x.an.map(a=>`<li>${a}</li>`).join('');
    const log=document.getElementById('aiChatLog'); if(log && !log.children.length) log.innerHTML='<div class="chat-msg ai">AI: Analysis ready. Ask about risk, anomalies, scaling, or efficiency.</div>';
}

function aiAnswerForQuestion(q,m){
    const t=q.toLowerCase();
    if(t.includes('risk')) return `Current risk level is ${m.risk}. High-pressure: ${m.high}, spikes: ${m.spikes}.`;
    if(t.includes('scale')||t.includes('autoscale')) return m.high>0?`Scale up hot resources and enable autoscaling for peak windows.`:`No urgent scale-up needed; maintain current footprint and monitor trends.`;
    if(t.includes('anomal')) return `Detected anomalies: ${m.spikes} spike patterns, ${m.missing} missing-value issues.`;
    if(t.includes('efficien')) return `Efficiency score is ${m.score}/100 with ${m.avg.toFixed(1)}% average utilization.`;
    return `Based on dataset telemetry, prioritize workload rebalance and keep utilization in 60-75% operating range.`;
}

function askAiAdvisor(event){
    event.preventDefault(); const i=document.getElementById('aiChatInput'),log=document.getElementById('aiChatLog'),thinking=document.getElementById('aiThinking');
    if(!i||!log) return; const q=i.value.trim(); if(!q) return;
    log.innerHTML += `<div class="chat-msg user">You: ${q}</div>`; i.value='';
    if(thinking) thinking.style.display='block';
    const m=deriveAiMetricsFromResources(resources);
    setTimeout(()=>{ if(thinking) thinking.style.display='none'; log.innerHTML += `<div class="chat-msg ai">AI: ${aiAnswerForQuestion(q,m)}</div>`; log.scrollTop=log.scrollHeight; }, 700);
}

function downloadAiReport(){
    const m=deriveAiMetricsFromResources(resources),x=buildAiRecommendations(m);
    const text=`OPTIMAQ AI REPORT
Score: ${m.score}
Confidence: ${m.confidence}%
Risk: ${m.risk}
Potential: ${m.potential}

Recommendations:
- ${x.rec.map(r=>`[${r[0]}] ${r[1]}`).join('\n- ')}`;
    const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([text],{type:'text/plain'})); a.download='ai_insights_report.txt'; a.click();
}
