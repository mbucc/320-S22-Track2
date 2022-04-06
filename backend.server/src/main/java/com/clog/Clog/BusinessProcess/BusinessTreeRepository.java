package com.clog.Clog.BusinessProcess;

import java.util.List;

import org.springframework.cache.annotation.Cacheable;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

public interface BusinessTreeRepository extends JpaRepository<EAIdomain, String>, JpaSpecificationExecutor<EAIdomain>{

    @Cacheable("publishingBusinessDomains")
    @Query("SELECT DISTINCT a.publishing_business_domain FROM EAIdomain a")
    List<String> findDistinctPublishingBusinessDomains();

} 
