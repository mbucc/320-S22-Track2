package com.clog.Clog.LogDetailFiles;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface LogDetailRepository extends JpaRepository<LogDetail, String>, JpaSpecificationExecutor<LogDetail> {
    Optional<LogDetail> findById(String id);
}
