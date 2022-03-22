package com.clog.Clog.BusinessProcess;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface BusinessTreeRepository extends JpaRepository<EAIdomain, String>, JpaSpecificationExecutor<EAIdomain>{

} 
