
import java.security.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import org.hibernate.annotations.CreationTimestamp;

@Entity
public class LogDetail {
    private @Id String GLOBAL_INSTANCE_ID;
    private @Column String BUSINESS_DOMAIN;
    private @Column String BUSINESS_SUBDOMAIN;
    private @Column String VERSION;
    private @Column String LOCAL_INSTANCE_ID;
    private @Column String EAI_TRANSACTION_ID;
    private @Column String EAI_DOMAIN;
    private @Column String HOSTNAME;
    private @Column String APPLICATION;
    private @Column String SERVICE;
    private @Column String PROCESS;
    private @Column String SEVERITY;
    private @Column String PRIORITY;
    // Todo: Add @CreationTimeStamp
    private @Column String CREATION_TIME;
    private @Column String REASONING_SCOPE;
    private @Column String PROCESS_ID;
    private @Column String CATEGORY_NAME;
    private @Column String ACTIVITY;
    private @Column String MSG;

    public LogDetail() {
        GLOBAL_INSTANCE_ID = "";
        BUSINESS_DOMAIN = null;
        BUSINESS_DOMAIN = null;
        VERSION = null;
        LOCAL_INSTANCE_ID = null;
        EAI_TRANSACTION_ID = null;
        EAI_DOMAIN = null;
        HOSTNAME = null;
        APPLICATION = null;
        SERVICE = null;
        PROCESS = null;
        SEVERITY = null;
        PRIORITY = null;
        CREATION_TIME = null;
        REASONING_SCOPE = null;
        PROCESS_ID = null;
        CATEGORY_NAME = null;
        ACTIVITY = null;
        MSG = null;
    }
}
