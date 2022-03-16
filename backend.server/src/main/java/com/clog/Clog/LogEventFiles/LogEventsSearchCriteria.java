package com.clog.Clog.LogEventFiles;

import java.sql.Timestamp;

public class LogEventsSearchCriteria {
    private String businessDomain;
    private String eaiDomain;
    private Timestamp startTime;
    private Timestamp endTime;
    private String application;
    private String businessSubDomain;
    private String process;
    private String[] categories;
    private String[] priorities;
    private String[] severities;
  
    public String[] getSeverities() {
        return severities;
    }
    public void setSeverities(String[] severities) {
        this.severities = severities;
    }
    public Timestamp getStartTime() {
        return startTime;
    }
    public void setStartTime(Timestamp startTime) {
        this.startTime = startTime;
    }
    public Timestamp getEndTime() {
        return endTime;
    }
    public void setEndTime(Timestamp endTime) {
        this.endTime = endTime;
    }
    public String getApplication() {
        return application;
    }
    public void setApplication(String application) {
        this.application = application;
    }
    public String getBusinessSubDomain() {
        return businessSubDomain;
    }
    public void setBusinessSubDomain(String businessSubDomain) {
        this.businessSubDomain = businessSubDomain;
    }
    public String getProcess() {
        return process;
    }
    public void setProcess(String process) {
        this.process = process;
    }
    public String[] getCategories() {
        return categories;
    }
    public void setCategories(String[] categories) {
        this.categories = categories;
    }
    public String[] getPriorities() {
        return priorities;
    }
    public void setPriorities(String[] priorities) {
        this.priorities = priorities;
    }
    public LogEventsSearchCriteria() {

    }
    public String getBusinessDomain() {
        return businessDomain;
    }
    public void setBusinessDomain(String businessDomain) {
        this.businessDomain = businessDomain;
    }
    public String getEaiDomain() {
        return eaiDomain;
    }
    public void setEaiDomain(String eaiDomain) {
        this.eaiDomain = eaiDomain;
    }
    
}
