package main;

import models.Resource;
import models.Task;
import optimizer.Optimizer;

import java.util.ArrayList;
import java.util.Scanner;

public class Main {

    static Scanner sc = new Scanner(System.in);

    public static ArrayList<Resource> sampleResources(){

        ArrayList<Resource> resources = new ArrayList<>();

        resources.add(new Resource("R1",20));
        resources.add(new Resource("R2",15));
        resources.add(new Resource("R3",25));

        return resources;

    }

    public static ArrayList<Task> sampleTasks(){

        ArrayList<Task> tasks = new ArrayList<>();

        tasks.add(new Task("T1",10,"High"));
        tasks.add(new Task("T2",5,"Medium"));
        tasks.add(new Task("T3",8,"High"));
        tasks.add(new Task("T4",7,"Low"));
        tasks.add(new Task("T5",6,"Medium"));
        tasks.add(new Task("T6",12,"High"));

        return tasks;

    }

    public static ArrayList<Resource> customResources(){

        ArrayList<Resource> resources = new ArrayList<>();

        System.out.println("Enter number of resources:");

        int n = sc.nextInt();

        for(int i=0;i<n;i++){

            System.out.println("Resource ID:");

            String id = sc.next();

            System.out.println("Capacity:");

            int cap = sc.nextInt();

            resources.add(new Resource(id,cap));

        }

        return resources;

    }

    public static ArrayList<Task> customTasks(){

        ArrayList<Task> tasks = new ArrayList<>();

        System.out.println("Enter number of tasks:");

        int n = sc.nextInt();

        for(int i=0;i<n;i++){

            System.out.println("Task ID:");

            String id = sc.next();

            System.out.println("Load:");

            int load = sc.nextInt();

            System.out.println("Priority (High/Medium/Low):");

            String p = sc.next();

            tasks.add(new Task(id,load,p));

        }

        return tasks;

    }

    public static void menu(){

        while(true){

            System.out.println("\nOPTIMAQ RESOURCE OPTIMIZER");

            System.out.println("1 Run Sample Test");

            System.out.println("2 Custom Input");

            System.out.println("3 Exit");

            int choice = sc.nextInt();

            if(choice==1){

                Optimizer opt = new Optimizer(
                        sampleResources(),
                        sampleTasks()
                );

                opt.run();

            }

            else if(choice==2){

                Optimizer opt = new Optimizer(
                        customResources(),
                        customTasks()
                );

                opt.run();

            }

            else{

                System.exit(0);

            }

        }

    }

    public static void main(String[] args){

        menu();

    }

}
