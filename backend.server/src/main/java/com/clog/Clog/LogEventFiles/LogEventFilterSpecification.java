package com.clog.Clog.LogEventFiles;

import java.sql.Timestamp;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import com.clog.Clog.PriorityMap;
import com.clog.Clog.SeverityMap;

import org.springframework.data.jpa.domain.Specification;

public class LogEventFilterSpecification implements Specification<LogEvent> {
    private LogEventsSearchCriteria filter;
    public LogEventFilterSpecification(LogEventsSearchCriteria logeven) {
        super();
        this.filter = logeven;
        
    }
    @Override
    public Predicate toPredicate(Root<LogEvent> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
        // TODO Auto-generated method stub
        //Begin with range of dates possible
        Predicate returnVal = cb.between(root.<Timestamp>get("creation_time"),filter.getEndTime(),filter.getStartTime());
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
        Predicate sevPredicate = null;
        SeverityMap getSever = new SeverityMap();
        for (String x : filter.getSeverities()) {
            
            int[] range = getSever.getRange(x);
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