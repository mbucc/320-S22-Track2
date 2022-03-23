package com.clog.Clog.BusinessProcess;

import java.sql.Timestamp;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

public class businessTreeSpecification implements Specification<EAIdomain> {
    private businessTreeFilter filter;
    public businessTreeSpecification(businessTreeFilter businessTreeFilter) {
        super();
        filter = businessTreeFilter;
    }
    @Override
    public Predicate toPredicate(Root<EAIdomain> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
        // TODO Auto-generated method stub
        Predicate returnVal = cb.between(root.<Timestamp>get("eai_transaction_create_time"),filter.getEndTime(),filter.getStartTime());
        Predicate eaiPred = null;
        for (String eaiDom : filter.getEaiDomain()) {
            if(eaiPred == null) {
                eaiPred = cb.equal(root.get("eai_domain"), eaiDom);
            } else {
                eaiPred = cb.or(cb.equal(root.get("eai_domain"), eaiDom), eaiPred);
            }
        }
        returnVal = cb.and(eaiPred, returnVal);
        Predicate pubPredicate = null;
        for(String pubString : filter.getPublishingBusinessDomain()) {
            if(pubPredicate == null) {
                pubPredicate = cb.equal(root.get("publishing_business_domain"), pubString);
            }
            else {
                pubPredicate = cb.or(cb.equal(root.get("publishing_business_domain"), pubString),pubPredicate);
            }
        }
        returnVal = cb.and(eaiPred,returnVal);
        return returnVal;
    }
    
    
}
