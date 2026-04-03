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

    public double efficiencyScore(){

    int capacity = totalCapacity();

    if(capacity==0)
        return 0;

    double efficiency =
            ((double)totalLoad()/capacity)*100;

    return Math.round(efficiency*100.0)/100.0;

}
public String overloadStatus(Resource r){

    double util = r.getUtilization();

    if(util>=90)
        return "OVERLOAD RISK";

    if(util>=70)
        return "HIGH USAGE";

    if(util>=40)
        return "STABLE";

    return "UNDERUSED";

}
public double smartAllocationScore(){

    double efficiency = efficiencyScore();

    int balancedResources = 0;

    for(Resource r:resources){

        if(r.getUtilization()>40 &&
           r.getUtilization()<85){

            balancedResources++;

        }

    }

    double balanceFactor =
            ((double)balancedResources/resources.size())*100;

    return (efficiency*0.7)+(balanceFactor*0.3);

}

}