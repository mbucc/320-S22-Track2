package com.clog.Clog.LogEventFiles;

import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name= "LOG_DETAILS_T")
public class LogEvent {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private String global_instance_id;
    private String business_domain;
    private String business_subdomain;
    private String eai_transaction_id;
    private String eai_domain;
    private String hostname;
    private String application;
    private String event_context;
    private String component;
    private int severity;
    private String priority;
    private Timestamp creation_time;
    private String category_name;
    private String activity;

    public String getGlobal_instance_id() {
        return global_instance_id;
    }
    public void setGlobal_instance_id(String global_instance_id) {
        this.global_instance_id = global_instance_id;
    }
    public String getBusiness_domain() {
        return business_domain;
    }
    public void setBusiness_domain(String business_domain) {
        this.business_domain = business_domain;
    }
    public String getBusiness_subdomain() {
        return business_subdomain;
    }
    public void setBusiness_subdomain(String business_subdomain) {
        this.business_subdomain = business_subdomain;
    }
    public String getEai_transaction_id() {
        return eai_transaction_id;
    }
    public void setEai_transaction_id(String eai_transaction_id) {
        this.eai_transaction_id = eai_transaction_id;
    }
    public String getEai_domain() {
        return eai_domain;
    }
    public void setEai_domain(String eai_domain) {
        this.eai_domain = eai_domain;
    }
    public String getHostname() {
        return hostname;
    }
    public void setHostname(String hostname) {
        this.hostname = hostname;
    }
    public String getApplication() {
        return application;
    }
    public void setApplication(String application) {
        this.application = application;
    }
    public String getEvent_context() {
        return event_context;
    }
    public void setEvent_context(String event_context) {
        this.event_context = event_context;
    }
    public String getComponent() {
        return component;
    }
    public void setComponent(String component) {
        this.component = component;
    }
    public int getSeverity() {
        return severity;
    }
    public void setSeverity(int severity) {
        this.severity = severity;
    }
    public String getPriority() {
        return priority;
    }
    public void setPriority(String priority) {
        this.priority = priority;
    }
    public Timestamp getCreation_time() {
        return creation_time;
    }
    public void setCreation_time(Timestamp creation_time) {
        this.creation_time = creation_time;
    }
    public String getCategory_name() {
        return category_name;
    }
    public void setCategory_name(String category_name) {
        this.category_name = category_name;
    }
    public String getActivity() {
        return activity;
    }
    public void setActivity(String activity) {
        this.activity = activity;
    }
    
    
}
