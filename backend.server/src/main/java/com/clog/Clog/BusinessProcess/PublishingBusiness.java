package com.clog.Clog.BusinessProcess;
import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.clog.Clog.LogEventFiles.LogEvent;
import com.fasterxml.jackson.annotation.JsonIgnore;
@Entity
@Table(name= "BUSINESS_PROCESS_LOG_T")
public class PublishingBusiness {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private String eai_transaction_id;
    private String publishing_business_domain;
    private String business_process;
    @OneToOne
    @JoinColumn(name = "global_instance_id")
    private LogEvent log;
    
    public LogEvent getLog() {
        return log;
    }

    public void setLog(LogEvent log) {
        this.log = log;
    }

    public String getEai_transaction_id() {
        return eai_transaction_id;
    }

    public void setEai_transaction_id(String eai_transaction_id) {
        this.eai_transaction_id = eai_transaction_id;
    }

    public String getBusiness_process() {
        return business_process;
    }

    public void setBusiness_process(String business_process) {
        this.business_process = business_process;
    }

    public String getPublishing_business_domain() {
        return publishing_business_domain;
    }

    public void setPublishing_business_domain(String publishing_business_domain) {
        this.publishing_business_domain = publishing_business_domain;
    }

}
