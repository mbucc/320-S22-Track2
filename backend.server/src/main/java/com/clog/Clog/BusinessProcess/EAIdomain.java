package com.clog.Clog.BusinessProcess;

import java.sql.Timestamp;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.clog.Clog.LogEventFiles.LogEvent;

@Entity
@Table(name= "BUSINESS_PROCESS_LOG_T")
public class EAIdomain {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private String global_instance_id;
    private String eai_transaction_id;
    private String eai_domain;
    private Timestamp eai_transaction_create_time;
    private String publishing_business_domain;
    private String business_process;
    private String key1_app_context_name;
    private String key1_app_context_value;
    private String key2_app_context_name;
    private String key2_app_context_value;
    
    @OneToOne(cascade=CascadeType.ALL)
    @JoinColumn(name="global_instance_id")
    private LogEvent log;
    
    public LogEvent getLog() {
        return log;
    }

    public void setLog(LogEvent log) {
        this.log = log;
    }
    public String getBusiness_process() {
        return business_process;
    }
    public void setBusiness_process(String business_process) {
        this.business_process = business_process;
    }

    public String getKey1_app_context_name() {
        return key1_app_context_name;
    }
    public void setKey1_app_context_name(String key1_app_context_name) {
        this.key1_app_context_name = key1_app_context_name;
    }
    public String getKey1_app_context_value() {
        return key1_app_context_value;
    }
    public void setKey1_app_context_value(String key1_app_context_value) {
        this.key1_app_context_value = key1_app_context_value;
    }
    public String getKey2_app_context_name() {
        return key2_app_context_name;
    }
    public void setKey2_app_context_name(String key2_app_context_name) {
        this.key2_app_context_name = key2_app_context_name;
    }
    public String getKey2_app_context_value() {
        return key2_app_context_value;
    }
    public void setKey2_app_context_value(String key2_app_context_value) {
        this.key2_app_context_value = key2_app_context_value;
    }



    public String getEai_domain() {
        return eai_domain;
    }
    public void setEai_domain(String eai_domain) {
        this.eai_domain = eai_domain;
    }
    
    public String getEai_transaction_id() {
        return eai_transaction_id;
    }
    public void setEai_transaction_id(String eai_transaction_id) {
        this.eai_transaction_id = eai_transaction_id;
    }
    public Timestamp getEai_transaction_create_time() {
        return eai_transaction_create_time;
    }
    public void setEai_transaction_create_time(Timestamp eai_transaction_create_time) {
        this.eai_transaction_create_time = eai_transaction_create_time;
    }
    public String getPublishing_business_domain() {
        return publishing_business_domain;
    }
    public void setPublishing_business_domain(String publishing_business_domain) {
        this.publishing_business_domain = publishing_business_domain;
    }

}
