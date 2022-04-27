package com.clog.Clog.DashboardView;

import java.sql.Timestamp;

public class DashBoardLineGraphFilter {
    private String severityString;
    private Timestamp startTime;
    private Timestamp endTime;
    public DashBoardLineGraphFilter(String severityString, Timestamp startTime, Timestamp endTime) {
        this.severityString = severityString;
        this.startTime = startTime;
        this.endTime = endTime;
    }
    public String getSeverityString() {
        return severityString;
    }
    public void setSeverityString(String severityString) {
        this.severityString = severityString;
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
    
}
