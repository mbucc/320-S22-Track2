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

public class FilterSpecification implements Specification<LogDetail> {
    private LogEventsSearchCriteria filter;
    public FilterSpecification(LogEventsSearchCriteria logeven) {
        super();
        this.filter = logeven;
        
    }
    @Override
    public Predicate toPredicate(Root<LogDetail> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
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

            returnVal = cb.and(cb.equal(root.get("process_id"),filter.getProcess()),returnVal);
        }
        if(!filter.getEaiDomain().equals("All")) {

            returnVal = cb.and(cb.equal(root.get("eai_domain"),filter.getEaiDomain()),returnVal);
        }
        returnVal = cb.and(cb.between(root.get("severity"), 10, 11),returnVal);
        //TODO Severity, Type, and Priority

        return returnVal;
    }
    
}
