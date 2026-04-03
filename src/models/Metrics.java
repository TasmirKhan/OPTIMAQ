package models;

import java.util.ArrayList;

public class Metrics {

    private ArrayList<Resource> resources;

    public Metrics(ArrayList<Resource> resources){

        this.resources = resources;

    }

    public int totalCapacity(){

        int sum = 0;

        for(Resource r:resources){

            sum += r.getCapacity();

        }

        return sum;

    }

    public int totalLoad(){

        int sum = 0;

        for(Resource r:resources){

            sum += r.getCurrentLoad();

        }

        return sum;

    }

    public double efficiency(){

        int capacity = totalCapacity();

        if(capacity==0)
            return 0;

        return ((double)totalLoad()/capacity)*100;

    }

}