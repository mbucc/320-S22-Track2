package com.clog.Clog;

import java.util.HashMap;
//Severity - Decode Severity as follows: Info >= 10 and < 30, Warning >= 30 and < 50, Error >= 50
public class SeverityMap {
    private HashMap<String,int[]> severMap;
    public SeverityMap() {
        severMap = new HashMap<String,int[]>();
        severMap.put("error", new int[]{50,Integer.MAX_VALUE});
        severMap.put("info", new int[]{10,29});
        severMap.put("warning", new int[]{30,49});
        severMap.put("success", new int[]{0,9});
    }
    public int[] getRange(String input) {
        return severMap.get(input);
    }
}
