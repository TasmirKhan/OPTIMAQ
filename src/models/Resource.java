package models;

import java.util.ArrayList;

public class Resource {

    private String resourceId;

    private int capacity;

    private int currentLoad;

    private ArrayList<String> tasks;

    public Resource(String resourceId,int capacity){

        this.resourceId = resourceId;

        this.capacity = capacity;

        this.currentLoad = 0;

        this.tasks = new ArrayList<>();

    }

    public String getResourceId(){

        return resourceId;

    }

    public int getCapacity(){

        return capacity;

    }

    public int getCurrentLoad(){

        return currentLoad;

    }

    public ArrayList<String> getTasks(){

        return tasks;

    }

    public void addTask(Task task){

        tasks.add(task.getTaskId());

        currentLoad += task.getLoad();

    }

    public int getAvailableCapacity(){

        return capacity - currentLoad;

    }

    public double getUtilization(){

        if(capacity==0)
            return 0;

        return ((double)currentLoad/capacity)*100;

    }

}