package com.clog.Clog.BusinessProcess;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import com.clog.Clog.SeverityMap;
import com.clog.Clog.LogEventFiles.LogEvent;

import org.springframework.data.jpa.domain.Specification;

public class BusinessGridSpecification implements Specification<LogEvent> {
    private BusinessGridFilter filter;
    public BusinessGridSpecification(BusinessGridFilter businessFilter) {
        super();
        this.filter = businessFilter;
    }

    @Override
    public Predicate toPredicate(Root<LogEvent> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        Predicate toReturn = criteriaBuilder.equal(root.get("eai_transaction_id"), filter.getEai_transaction_id());
       
        if (filter.getSeverities() != null){
            Predicate sevPredicate = null;
            SeverityMap getCrit = new SeverityMap();
            for (String x : filter.getSeverities()) {
                int[] range = getCrit.getRange(x);
                if(sevPredicate == null) {
                    sevPredicate = criteriaBuilder.between(root.get("severity"), range[0], range[1]);
                }
                else {
                    sevPredicate = criteriaBuilder.or(criteriaBuilder.between(root.get("severity"), range[0], range[1]), sevPredicate);
                }
            }
            toReturn = criteriaBuilder.and(sevPredicate, toReturn);
        }

            
        if(filter.getBusinessDomainList() != null){
            Predicate pubPredicate = null;
            for(String pubString : filter.getBusinessDomainList()) {
                if(pubPredicate == null) {
                    pubPredicate = criteriaBuilder.equal(root.get("business_domain"), pubString);
                }
                else {
                    pubPredicate = criteriaBuilder.or(criteriaBuilder.equal(root.get("business_domain"), pubString),pubPredicate);
                }
            }
            toReturn = criteriaBuilder.and(pubPredicate, toReturn);
           
        }
        return toReturn;
    }
}
