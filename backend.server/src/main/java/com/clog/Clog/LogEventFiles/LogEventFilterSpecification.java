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
        Predicate returnVal = cb.between(root.<Timestamp>get("creation_time"),
                                         filter.getStartTime(),
                                         filter.getEndTime());

        if(filter.getBusinessDomain() != null) {   
            Predicate busPredicate = null;
            for (String x: filter.getBusinessDomain()) {
                if (busPredicate == null) {
                    busPredicate = cb.equal(root.get("business_domain"),x);
                }
                else {
                    busPredicate = cb.or(busPredicate, cb.equal(root.get("business_domain"),x));
                }
            }
            returnVal = cb.and(busPredicate,returnVal);
        }
        if(filter.getBusinessSubDomain() != null) {
            Predicate subPredicate = null;
            for(String x : filter.getBusinessSubDomain()) {
                if(subPredicate == null) {
                    subPredicate = cb.equal(root.get("business_subdomain"),x);
                } else {
                    subPredicate = cb.or(cb.equal(root.get("business_subdomain"),x),subPredicate);
                }
            }
        }
        if(filter.getApplication() != null) {
            Predicate appPredicate = null;
            for (String x: filter.getApplication()) {
                if (appPredicate == null) {
                    appPredicate = cb.equal(root.get("application"), x);
                } else {
                    appPredicate = cb.or(cb.equal(root.get("application"),x),appPredicate);
                }
            }
            returnVal = cb.and(appPredicate, returnVal);
        }
        if(filter.getProcess() != null) {
            Predicate processPredicate = null;
            for (String x: filter.getProcess()) {
                if (processPredicate == null) {
                    processPredicate = cb.equal(root.get("component"), x);
                }
                else {
                    processPredicate = cb.or(cb.equal(root.get("component"),x),processPredicate);
                }
            }
           
            
        }
        if(filter.getEaiDomain() != null) { 
            Predicate eaiPredicate = null;
            for (String x: filter.getEaiDomain()) {
                if(eaiPredicate == null) {
                    eaiPredicate = cb.equal(root.get("eai_domain"),x);
                }
                else {
                    eaiPredicate = cb.or(cb.equal(root.get("eai_domain"),x), eaiPredicate);
                }
            }
            returnVal = cb.and(eaiPredicate, returnVal);
        }
        if(filter.getSeverities() != null) {
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
        }
        if (filter.getCategories() != null) {
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
        }
        if(filter.getPriorities() != null) {
            Predicate prioPredicate = null;
            PriorityMap prioMap = new PriorityMap();
            for (String x: filter.getPriorities()) {
                if(prioPredicate == null) {
                    prioPredicate = cb.equal(root.get("priority"), prioMap.get(x));
                }
                else {
                    prioPredicate = cb.or(cb.equal(root.get("priority"), prioMap.get(x)), prioPredicate);
                }
                
            }
            returnVal = cb.and(prioPredicate, returnVal);
        }
        return returnVal;
    }
    
}