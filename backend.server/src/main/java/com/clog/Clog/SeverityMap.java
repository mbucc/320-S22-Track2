package com.clog.Clog;

import java.util.HashMap;

public class SeverityMap {
    private HashMap<String,int[]> severMap;
    public SeverityMap() {
        severMap = new HashMap<String,int[]>();
        severMap.put("error", new int[]{0,50});
        
    }
    public int[] getRange(String input) {
        return severMap.get(input);
    }
}
