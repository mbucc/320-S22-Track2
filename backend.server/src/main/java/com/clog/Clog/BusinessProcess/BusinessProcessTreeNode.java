package com.clog.Clog.BusinessProcess;

import java.sql.Timestamp;

public class BusinessProcessTreeNode {
    private String name;
    private String key1_app_context_name;
    private String key1_app_context_value;
    private String key2_app_context_name;
    private String key2_app_context_value;
    private String eai_transaction_id;
    private int severity;
    private Timestamp eai_transaction_create_time;
    
    public BusinessProcessTreeNode(String name, String key1_app_context_name,
        String key1_app_context_value, String key2_app_context_name, 
        String key2_app_context_value, String eai_transaction_id, int severity,
        Timestamp eai_transaction_create_time) {
        this.eai_transaction_create_time = eai_transaction_create_time;
        this.name = name;
        this.key1_app_context_name = key1_app_context_name;
        this.key1_app_context_value = key1_app_context_value;
        this.key2_app_context_name = key2_app_context_name;
        this.key2_app_context_value = key2_app_context_value;
        this.eai_transaction_id = eai_transaction_id;
        this.severity = severity;
    }

    public Timestamp getEai_transaction_create_time() {
        return eai_transaction_create_time;
    }

    public void setEai_transaction_create_time(Timestamp eai_transaction_create_time) {
        this.eai_transaction_create_time = eai_transaction_create_time;
    }

    public int getSeverity() {
        return severity;
    }

    public void setSeverity(int severity) {
        this.severity = severity;
    }

    public String getEai_transaction_id() {
        return eai_transaction_id;
    }

    public void setEai_transaction_id(String eai_transaction_id) {
        this.eai_transaction_id = eai_transaction_id;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
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

    
}
