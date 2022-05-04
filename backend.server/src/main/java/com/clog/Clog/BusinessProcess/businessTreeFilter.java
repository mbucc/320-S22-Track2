package com.clog.Clog.BusinessProcess;

import java.sql.Timestamp;

public class businessTreeFilter {
    private Timestamp startTime;
    private Timestamp endTime;
    private String[] publishingBusinessDomain;
    private String[] eaiDomain;
    public businessTreeFilter() {

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
    public String[] getPublishingBusinessDomain() {
        return publishingBusinessDomain;
    }
    public void setPublishingBusinessDomain(String[] businessDomain) {
        this.publishingBusinessDomain = businessDomain;
    }
    public String[] getEaiDomain() {
        return eaiDomain;
    }
    public void setEaiDomain(String[] eaiDomain) {
        this.eaiDomain = eaiDomain;
    }
    
}
