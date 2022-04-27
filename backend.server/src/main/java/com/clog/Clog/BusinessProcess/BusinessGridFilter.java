package com.clog.Clog.BusinessProcess;

public class BusinessGridFilter {
    private String eai_transaction_id;
    private String[] severities;
    private String[] businessDomainList;
    public BusinessGridFilter() {

    }
    public String getEai_transaction_id() {
        return eai_transaction_id;
    }
    public void setEai_transaction_id(String eai_transaction_id) {
        this.eai_transaction_id = eai_transaction_id;
    }
    public String[] getSeverities() {
        return severities;
    }
    public void setSeverities(String[] severities) {
        this.severities = severities;
    }
    public String[] getBusinessDomainList() {
        return businessDomainList;
    }
    public void setBusinessDomainList(String[] businessDomainList) {
        this.businessDomainList = businessDomainList;
    }
    
}
