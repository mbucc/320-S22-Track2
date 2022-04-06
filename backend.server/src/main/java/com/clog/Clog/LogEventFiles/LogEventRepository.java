package com.clog.Clog.LogEventFiles;

import java.util.List;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.lang.Nullable;

public interface LogEventRepository extends JpaRepository<LogEvent, String>, JpaSpecificationExecutor<LogEvent> {
    List<LogEvent> findAll(@Nullable Specification<LogEvent> spec);
}