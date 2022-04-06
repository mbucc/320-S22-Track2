package com.clog.Clog.LogEventFiles;
<<<<<<< HEAD

import java.util.List;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.lang.Nullable;
=======
import java.util.List;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;


public interface LogEventRepository extends JpaRepository<LogEvent, String>, JpaSpecificationExecutor<LogEvent>{
    @Cacheable("eaiDomains")
    @Query("SELECT DISTINCT a.eai_domain FROM LogEvent a")
    List<String> findDistinctEAI_Domains();
    @Cacheable("businessDomains")
    @Query("SELECT DISTINCT a.business_domain FROM LogEvent a")
    List<String> findDistinctBusinessDomains();
    @Cacheable("businessSubDomain")
    @Query("SELECT DISTINCT a.business_subdomain FROM LogEvent a")
    List<String> findDistinctBusinessSubDomains();
    @Cacheable("application")
    @Query("SELECT DISTINCT a.application FROM LogEvent a")
    List<String> findDistinctApplications();
    @Cacheable("service")
    @Query("SELECT DISTINCT a.event_context FROM LogEvent a")
    List<String> findDistinctServices();
}
>>>>>>> 616c1d18bbfbe993aef1fd4eb8e16aa407eeafbe

public interface LogEventRepository extends JpaRepository<LogEvent, String>, JpaSpecificationExecutor<LogEvent> {
    List<LogEvent> findAll(@Nullable Specification<LogEvent> spec);
}