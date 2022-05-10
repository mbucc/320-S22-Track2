INSERT INTO LOG_DETAILS_T VALUES
    ('crm_server_000001', 
        'CRM', 
        'Customer', 
        '1.0', 
        'CRM-Customer-CRM_Adapter-Publish_Customer_Update-1212', 
        'eai_crm_server_111111', 
        'EAI_DOMAIN_1', 
        'crm_server', 
        'CRM_Adapter', 
        'Publish_Customer_Update', 
        'Publish_Customer_Update', 
        '10', 
        '71', 
        '2020-12-12 01:24:23', 
        'INTERNAL',
        '1212',
        'ReportSituation',
        'Customer Update Started',
        'Received a customer update start event'
    ),
    ('crm_server_000002', 
        'BS', 
        'BUSINESS', 
        '1.0', 
        'BUSINESS-UPDATE-1212', 
        'eai_crm_server_111111', 
        'EAI_DOMAIN_2', 
        'crm_server', 
        'CRM_Adapter', 
        'Business_Update', 
        'Business_Update', 
        '8', 
        '25', 
        '2020-12-12 01:24:23', 
        'INTERNAL',
        '1212',
        'ReportSituation',
        'Business Update Started',
        'Received a customer update start event'
    );

INSERT INTO BUSINESS_PROCESS_LOG_T VALUES
    (
        'eai_crm_server_111111',
        'EAI_DOMAIN_1',
        'CRM_SERVER',
        'CRM_PROCESS',
        '2020-12-12 01:24:23',
        'CRM_CONTEXT',
        'CRM_VALUE',
        'EFFECTIVE_DATE',
        '03/01/2022 05:00:00',
        'crm_server_000001',
        'CRM',
        'Publish_Customer_Update',
        'Customer Update Started'
    );

INSERT INTO BUSINESS_PROCESS_T VALUES
    (
        'CRM_APP',
        'crm_app',
        '',
        ''
    ),
    (
        'CUSTOMER_APP',
        'customer_app',
        '',
        ''
    ),
    (
        'ACCOUNTING_APP',
        'accounting_app',
        '',
        ''
    );