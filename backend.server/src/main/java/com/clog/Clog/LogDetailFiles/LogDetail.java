package com.clog.Clog.LogDetailFiles;

import java.sql.Date;
import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name= "LOG_DETAILS_T")
public class LogDetail {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private String global_instance_id;
    private String business_domain;
    private String business_subdomain;
    private String version;
    private String local_instance_id;
    private String eai_transaction_id;
    private String eai_domain;
    private String hostname;
    private String application;
    private String event_context;
    private String component;
    private String severity;
    private String priority;
    private Timestamp creation_time;
    private String reasoning_scope;
    private String process_id;
    private String category_name;
    private String activity;
    private String msg;
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
    public String getVersion() {
        return version;
    }
    public void setVersion(String version) {
        this.version = version;
    }
    public String getLocal_instance_id() {
        return local_instance_id;
    }
    public void setLocal_instance_id(String local_instance_id) {
        this.local_instance_id = local_instance_id;
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
    public String getSeverity() {
        return severity;
    }
    public void setSeverity(String severity) {
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
    public String getReasoning_scope() {
        return reasoning_scope;
    }
    public void setReasoning_scope(String reasoning_scope) {
        this.reasoning_scope = reasoning_scope;
    }
    public String getProcess_id() {
        return process_id;
    }
    public void setProcess_id(String process_id) {
        this.process_id = process_id;
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
    public String getMsg() {
        return msg;
    }
    public void setMsg(String msg) {
        this.msg = msg;
    }
    
}
