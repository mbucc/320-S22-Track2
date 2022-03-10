package com.clog.Clog;

import java.util.HashMap;
import java.util.Map;

public class PriorityMap {
    private Map<String,Integer> priomap;
    public PriorityMap() {
        priomap = new HashMap<String,Integer>();
        priomap.put("high",10);
    }
    public Integer get(String input){
        return priomap.get(input);
    }
}
