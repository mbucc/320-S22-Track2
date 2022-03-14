package com.clog.Clog;

import java.util.HashMap;
import java.util.Map;

public class PriorityMap {
    private Map<String,Integer> priomap;
    public PriorityMap() {
        priomap = new HashMap<String,Integer>();
        priomap.put("low",10);
        priomap.put("medium", 50);
        priomap.put("high", 70);
    }
    public Integer get(String input){
        return priomap.get(input);
    }
}
