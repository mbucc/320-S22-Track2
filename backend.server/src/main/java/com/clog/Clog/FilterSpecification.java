package com.clog.Clog;

import java.io.Console;
import java.sql.Date;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

public class FilterSpecification implements Specification<LogEvent> {
    private LogEventsSearchCriteria filter;
    public FilterSpecification(LogEventsSearchCriteria logeven) {
        super();
        this.filter = logeven;
        
    }
    @Override
    public Predicate toPredicate(Root<LogEvent> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
        // TODO Auto-generated method stub
        //Begin with range of dates possible
        System.out.println(root.get("creation_time").toString());
        Predicate returnVal = cb.between(root.<Timestamp>get("creation_time"),filter.getEndTime(),filter.getStartTime());
    //  returnVal = cb.and(returnVal,cb.greaterThanOrEqualTo(root.get("creation_time"), filter.getEndTime()));
        
        //For all the ones that can be all only add filter if its not
        if(!filter.getBusinessDomain().equals("All")) {
      
            returnVal = cb.and(cb.equal(root.get("business_domain"),filter.getBusinessDomain()),returnVal);
        }
        if(!filter.getBusinessSubDomain().equals("All")) {

            returnVal = cb.and(cb.equal(root.get("business_subdomain"),filter.getBusinessSubDomain()),returnVal);
        }
        if(!filter.getApplication().equals("All")) {

            returnVal = cb.and(cb.equal(root.get("application"),filter.getApplication()),returnVal);
        }
        if(!filter.getProcess().equals("All")) {

            returnVal = cb.and(cb.equal(root.get("component"),filter.getProcess()),returnVal);
        }
        if(!filter.getEaiDomain().equals("All")) {

            returnVal = cb.and(cb.equal(root.get("eai_domain"),filter.getEaiDomain()),returnVal);
        }
        //TODO Severity, Type, and Priority
        Predicate sevPredicate = null;
        SeverityMap getCrit = new SeverityMap();
        for (String x : filter.getSeverities()) {
            
            int[] range = getCrit.getRange(x);
            if(sevPredicate == null) {
                sevPredicate = cb.between(root.get("severity"), range[0], range[1]);
            }
            else {
                sevPredicate = cb.or(cb.between(root.get("severity"), range[0], range[1]), sevPredicate);
            }
        }
        returnVal = cb.and(returnVal,sevPredicate);
        Predicate categoryPredicate = null;
        for (String x : filter.getCategories()) {
            if (categoryPredicate == null) {
                categoryPredicate = cb.equal(root.get("category_name"), x);
            }
            else {
                categoryPredicate = cb.or(cb.equal(root.get("category_name"), x), categoryPredicate);
            }
        }
        returnVal = cb.and(categoryPredicate, returnVal);
        Predicate prioPredicate = null;
        PriorityMap prioMap = new PriorityMap();
        for (String x: filter.getPriorities()) {
            if(prioPredicate == null) {
                prioPredicate = cb.equal(root.get("priority"), prioMap.get(x));
            }
            else {
                prioPredicate = cb.or(cb.equal(root.get("priority"), prioMap.get(x)),prioPredicate);
            }
            
        }
        returnVal = cb.and(prioPredicate, returnVal);
        return returnVal;
        
    }
    
}