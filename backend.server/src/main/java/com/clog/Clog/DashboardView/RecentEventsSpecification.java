package com.clog.Clog.DashboardView;

import java.sql.Timestamp;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import com.clog.Clog.SeverityMap;
import com.clog.Clog.LogEventFiles.LogEvent;

import org.springframework.data.jpa.domain.Specification;

public class RecentEventsSpecification implements Specification<LogEvent>{
    DashBoardLineGraphFilter filter;
    public RecentEventsSpecification(DashBoardLineGraphFilter filter) {
        super();
        this.filter = filter;
    }

    @Override
    public Predicate toPredicate(Root<LogEvent> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        Predicate toReturn = criteriaBuilder.between(root.<Timestamp>get("creation_time"),filter.getStartTime(),filter.getEndTime());
        SeverityMap severityMap = new SeverityMap();
        int[] range = severityMap.getRange(filter.getSeverityString());
        toReturn = criteriaBuilder.and(toReturn, criteriaBuilder.between(root.get("severity"), range[0], range[1]));
        return toReturn;
    }
    
}
