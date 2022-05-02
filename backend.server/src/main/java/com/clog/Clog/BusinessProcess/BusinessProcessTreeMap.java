package com.clog.Clog.BusinessProcess;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;



public class BusinessProcessTreeMap {
    private Map<String, Map<String, Map<String, List<BusinessProcessTreeNode>>>> eai_domainTopLevel;
    public BusinessProcessTreeMap() {
        eai_domainTopLevel = new HashMap<String,Map<String,Map<String,List<BusinessProcessTreeNode>>>>();
    }
    public void addObj(EAIdomain treeEntry) {
        //If EAI in top level map
        int sev = -1;
       if(treeEntry.getLog() != null) {
           sev = treeEntry.getLog().getSeverity();
        }
        BusinessProcessTreeNode toAddNode = new BusinessProcessTreeNode(treeEntry.getBusiness_process(), treeEntry.getKey1_app_context_name(), 
        treeEntry.getKey1_app_context_value(), treeEntry.getKey2_app_context_name(),
         treeEntry.getKey2_app_context_value(), treeEntry.getEai_transaction_id(), sev, treeEntry.getEai_transaction_create_time());
        if(eai_domainTopLevel.containsKey(treeEntry.getEai_domain())) {
            Map<String, Map<String, List<BusinessProcessTreeNode>>> EaiMap = eai_domainTopLevel.get(treeEntry.getEai_domain());
            //Check if publishing business Domain is in EAI map
            if (EaiMap.containsKey(treeEntry.getPublishing_business_domain())) {
                Map<String, List<BusinessProcessTreeNode>> pubbusProc = EaiMap.get(treeEntry.getPublishing_business_domain());
                //Check if business Process is in pubDoamin Map 
                if(pubbusProc.containsKey(treeEntry.getBusiness_process())) {
                    List<BusinessProcessTreeNode> busProc = pubbusProc.get(treeEntry.getBusiness_process()); 
                    busProc.add(toAddNode);
                }
                else {
                    //If It is not in pubDomain
                    List<BusinessProcessTreeNode> listToAdd = new ArrayList<BusinessProcessTreeNode>();
                    listToAdd.add(toAddNode);
                    pubbusProc.put(treeEntry.getBusiness_process(), listToAdd);

                }
            }
            //publishing business domain not in EAI map
            else {

                Map<String, List<BusinessProcessTreeNode>> pubbusProc = new HashMap<String, List<BusinessProcessTreeNode>>();
                List<BusinessProcessTreeNode> listToAdd = new ArrayList<BusinessProcessTreeNode>();
                listToAdd.add(toAddNode);
                pubbusProc.put(treeEntry.getBusiness_process(), listToAdd);
                EaiMap.put(treeEntry.getPublishing_business_domain(), pubbusProc);
            }

        }
        //If eai not in map
        else {
            Map<String, Map<String, List<BusinessProcessTreeNode>>> EaiMap2 = new HashMap<String, Map<String, List<BusinessProcessTreeNode>>>();
            Map<String, List<BusinessProcessTreeNode>> pubbusProc = new HashMap<String, List<BusinessProcessTreeNode>>();
            List<BusinessProcessTreeNode> listToAdd = new ArrayList<BusinessProcessTreeNode>();
            listToAdd.add(toAddNode);
            pubbusProc.put(treeEntry.getBusiness_process(), listToAdd);
            EaiMap2.put(treeEntry.getPublishing_business_domain(), pubbusProc);
            eai_domainTopLevel.put(treeEntry.getEai_domain(), EaiMap2);
        }
        //If EAI not in top level map
            //Add new entry to top level map for string pointing map for all business process related to that one


    }
    public Map<String, Map<String, Map<String, List<BusinessProcessTreeNode>>>> getMap() {
        return this.eai_domainTopLevel;
    }

}
