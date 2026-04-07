package models;

public class Task {

    private String taskId;

    private int load;

    private String priority;

    public Task(String taskId,int load,String priority){

        this.taskId = taskId;

        this.load = load;

        this.priority = priority;

    }

    public String getTaskId(){

        return taskId;

    }

    public int getLoad(){

        return load;

    }

    public String getPriority(){

        return priority;

    }

    public int getPriorityValue(){

        if(priority.equals("High"))
            return 3;

        if(priority.equals("Medium"))
            return 2;

        return 1;

    }

}