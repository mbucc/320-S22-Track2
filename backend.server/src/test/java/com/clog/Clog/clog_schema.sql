create table BUSINESS_PROCESS_T
(
  business_process           VARCHAR2(128) not null,
  publishing_business_domain VARCHAR2(64) not null,
  key1_app_context_name      VARCHAR2(128),
  key2_app_context_name      VARCHAR2(128)
)
;

create table LOG_DETAILS_T
(
  global_instance_id VARCHAR2(64) not null,
  business_domain    VARCHAR2(64),
  business_subdomain VARCHAR2(64),
  version            VARCHAR2(16),
  local_instance_id  VARCHAR2(128),
  eai_transaction_id VARCHAR2(128),
  eai_domain         VARCHAR2(128),
  hostname           VARCHAR2(256),
  application        VARCHAR2(256),
  event_context      VARCHAR2(64),
  component          VARCHAR2(128),
  severity           NUMBER,
  priority           NUMBER,
  creation_time      TIMESTAMP(6),
  reasoning_scope    VARCHAR2(16),
  process_id         VARCHAR2(32),
  category_name      VARCHAR2(32),
  activity           VARCHAR2(256),
  msg                VARCHAR2(1024)
)
;

create table LOG_APP_CONTEXT_T
(
  global_instance_id VARCHAR2(64) not null,
  app_context_name   VARCHAR2(128) not null,
  app_context_value  VARCHAR2(256)
)
;

create table BUSINESS_PROCESS_LOG_T
(
  eai_transaction_id          VARCHAR2(128) not null,
  eai_domain                  VARCHAR2(128),
  publishing_business_domain  VARCHAR2(64) not null,
  business_process            VARCHAR2(128) not null,
  eai_transaction_create_time TIMESTAMP(6) not null,
  key1_app_context_name       VARCHAR2(128),
  key1_app_context_value      VARCHAR2(256),
  key2_app_context_name       VARCHAR2(128),
  key2_app_context_value      VARCHAR2(256),
  global_instance_id          VARCHAR2(64) not null,
  business_domain             VARCHAR2(64),
  application                 VARCHAR2(256),
  activity                    VARCHAR2(256)
)
;


