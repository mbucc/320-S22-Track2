create table LOG_DETAILS_T
(
  global_instance_id VARCHAR(64) not null,
  business_domain    VARCHAR(64),
  business_subdomain VARCHAR(64),
  version            VARCHAR(16),
  local_instance_id  VARCHAR(128),
  eai_transaction_id VARCHAR(128),
  eai_domain         VARCHAR(128),
  hostname           VARCHAR(256),
  application        VARCHAR(256),
  event_context      VARCHAR(64),
  component          VARCHAR(128),
  severity           INT,
  priority           INT,
  creation_time      TIMESTAMP(6),
  reasoning_scope    VARCHAR(16),
  process_id         VARCHAR(32),
  category_name      VARCHAR(32),
  activity           VARCHAR(256),
  msg                VARCHAR(1024),
  PRIMARY KEY (global_instance_id)
)
;

create table LOG_APP_CONTEXT_T
(
  global_instance_id VARCHAR(64) not null,
  app_context_name   VARCHAR(128) not null,
  app_context_value  VARCHAR(256),
  FOREIGN KEY (global_instance_id) REFERENCES LOG_DETAILS_T(global_instance_id)
)
;

create table BUSINESS_PROCESS_T
(
  business_process           VARCHAR(128) not null,
  publishing_business_domain VARCHAR(64) not null,
  key1_app_context_name      VARCHAR(128),
  key2_app_context_name      VARCHAR(128),
  PRIMARY KEY (business_process)
)
;

create table BUSINESS_PROCESS_LOG_T
(
  eai_transaction_id          VARCHAR(128) not null,
  eai_domain                  VARCHAR(128),
  publishing_business_domain  VARCHAR(64) not null,
  business_process            VARCHAR(128) not null,
  eai_transaction_create_time TIMESTAMP(6) not null,
  key1_app_context_name       VARCHAR(128),
  key1_app_context_value      VARCHAR(256),
  key2_app_context_name       VARCHAR(128),
  key2_app_context_value      VARCHAR(256),
  global_instance_id          VARCHAR(64) not null,
  business_domain             VARCHAR(64),
  application                 VARCHAR(256),
  activity                    VARCHAR(256),
  PRIMARY KEY (eai_transaction_id),
  FOREIGN KEY (global_instance_id) REFERENCES LOG_DETAILS_T(global_instance_id),
  FOREIGN KEY (business_process) REFERENCES BUSINESS_PROCESS_T(business_process)
)
;

INSERT INTO BUSINESS_PROCESS_T (business_process, publishing_business_domain, key1_app_context_name, key2_app_context_name)
VALUES
('CRM_APP', 'crm_app', 'Customer_Id', 'Effective_Date'),
#('CRM_APP', 'crm_app', 'Effective_Date', 'BAN'),
('OPERATIONS_APP', 'operations_app', 'Customer_ID', 'BAN'),
#('OPERATIONS_APP', 'operations_app', 'Customer_Name', 'Effective_Date'),
('ACCOUNTING_APP', 'accounting_app', 'Client_Id', 'BAN')
#('ACCOUNTING_APP', 'accounting_app', 'Start_Date', 'Effective_Date')
;











