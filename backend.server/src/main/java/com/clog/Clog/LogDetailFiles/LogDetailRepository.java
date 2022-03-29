package com.clog.Clog.LogDetailFiles;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;


public interface LogDetailRepository extends JpaRepository<LogDetail, String>, JpaSpecificationExecutor<LogDetail> {

} 
