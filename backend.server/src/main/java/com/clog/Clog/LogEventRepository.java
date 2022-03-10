package com.clog.Clog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;

public interface LogEventRepository extends JpaRepository<LogEvent, String>, JpaSpecificationExecutor<LogEvent>{

} 

