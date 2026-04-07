package optimizer;

import java.io.FileWriter;
import java.io.IOException;
import models.Resource;
import models.Task;
import models.Metrics;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;

public class Optimizer {

    private ArrayList<Resource> resources;

    private ArrayList<Task> tasks;

    // private ArrayList<String> bottlenecks;
    private ArrayList<String> bottlenecks;

    public Optimizer(ArrayList<Resource> resources, ArrayList<Task> tasks){

        this.resources = resources;

        this.tasks = tasks;

        this.bottlenecks = new ArrayList<>();

    }

    //Task 2 
       public void sortTasks(){

    Collections.sort(tasks,new Comparator<Task>(){

        public int compare(Task t1, Task t2){

            if(t2.getPriorityValue() == t1.getPriorityValue()){

                return t2.getLoad() - t1.getLoad();

            }

            return t2.getPriorityValue() - t1.getPriorityValue();

        }

    });

}

    //Task 3 
        public void sortResources(){

        Collections.sort(resources,new Comparator<Resource>(){

            public int compare(Resource r1, Resource r2){

                return r1.getCurrentLoad() - r2.getCurrentLoad();

            }

        });

    }

    //Task 4
        public void allocate(){

        sortTasks();

        for(Task task:tasks){

            sortResources();

            boolean allocated = false;

            for(Resource resource:resources){

                if(resource.getAvailableCapacity() >= task.getLoad()){

                    resource.addTask(task);

                    allocated = true;

                    break;

                }

            }

            if(!allocated){

    bottlenecks.add(
            task.getTaskId()+
            " (Required:"+task.getLoad()+")"
    );

}

        }

    }

    //Task 5
        public void displayAllocation(){

    System.out.println("\n==============================");

    System.out.println("RESOURCE ALLOCATION REPORT");

    System.out.println("==============================");

    for(Resource r:resources){

        System.out.println("\nResource ID      : "+r.getResourceId());

        System.out.println("Capacity         : "+r.getCapacity());

        System.out.println("Current Load     : "+r.getCurrentLoad());

        System.out.printf("Utilization      : %.2f %%\n",r.getUtilization());

        System.out.println("Allocated Tasks  : "+r.getTasks());

        System.out.println("------------------------------");

    }

}

    //Task 6
      public void displayMetrics(){

    Metrics metrics = new Metrics(resources);

    System.out.println("\nSYSTEM PERFORMANCE");

    System.out.println("==============================");

    System.out.println("Total Capacity : "+metrics.totalCapacity());

    System.out.println("Total Load     : "+metrics.totalLoad());

    System.out.printf("Efficiency     : %.2f %%\n",metrics.efficiency());

    System.out.println("\nUNALLOCATED TASK ANALYSIS");

    

if(bottlenecks.isEmpty()){

    System.out.println("No rejected tasks");

}
else{

    for(String b:bottlenecks){

        System.out.println(b);

    }

}
System.out.println(
"Efficiency Score : "+
metrics.efficiencyScore()+" %"
);

System.out.println(
"Smart Allocation Score : "+
metrics.smartAllocationScore()
);

}

public void resourceRanking(){

    Collections.sort(resources,new Comparator<Resource>(){

        public int compare(Resource r1, Resource r2){

            return Double.compare(
                    r2.getUtilization(),
                    r1.getUtilization()
            );

        }

    });

    System.out.println("\nRESOURCE EFFICIENCY RANKING");

    int rank = 1;

    for(Resource r:resources){

        System.out.println(
                rank+" : "+
                r.getResourceId()+
                " ("+
                String.format("%.2f",r.getUtilization())
                +" %)"
        );

        rank++;

    }

    

}

// Task 6.5
 public void exportToJSON(){

    try{

        FileWriter file = new FileWriter("../output/result.json");

        Metrics metrics = new Metrics(resources);

        file.write("{\n");

        file.write("\"totalCapacity\":"+metrics.totalCapacity()+",\n");

        file.write("\"totalLoad\":"+metrics.totalLoad()+",\n");

        file.write("\"efficiency\":"+String.format("%.2f",metrics.efficiency())+",\n");

        file.write("\"resources\": [\n");

        for(int i=0;i<resources.size();i++){

            Resource r = resources.get(i);

            file.write("{");

            file.write("\"id\":\""+r.getResourceId()+"\",");

            file.write("\"capacity\":"+r.getCapacity()+",");

            file.write("\"load\":"+r.getCurrentLoad()+",");

            file.write("\"utilization\":"+String.format("%.2f",r.getUtilization())+",");

            file.write("\"tasks\":[");

for(int j=0;j<r.getTasks().size();j++){

    file.write("\""+r.getTasks().get(j)+"\"");

    if(j!=r.getTasks().size()-1)
        file.write(",");

}

file.write("]");

            file.write("}");

            if(i!=resources.size()-1)
                file.write(",");

            file.write("\n");

        }

        file.write("],\n");

        file.write("\"bottlenecks\":[");

for(int i=0;i<bottlenecks.size();i++){

    file.write("\""+bottlenecks.get(i)+"\"");

    if(i!=bottlenecks.size()-1)
        file.write(",");

}

file.write("]");
        file.write("}");

        file.close();

        System.out.println("Results exported");

    }

    catch(Exception e){

        System.out.println("Export failed");

    }

}

    //Task 7
       public void run(){

    allocate();

    displayAllocation();

    displayMetrics();

    resourceRanking();

    exportToJSON();

}



}

