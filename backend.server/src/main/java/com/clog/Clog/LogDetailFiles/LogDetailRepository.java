package com.clog.Clog.LogDetailFiles;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;

public interface LogDetailRepository extends JpaRepository<LogDetail, String>, JpaSpecificationExecutor<LogDetail>{

} 
