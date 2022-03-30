import pymysql

host = 'track2-clog-master.c0pfgcylcs5z.us-east-1.rds.amazonaws.com'
user = 'thecafebabe'
password = ''
database = 'clog'

connection = pymysql.connect(
    host=host, user=user, password=password, db=database)

cursor = connection.cursor()

cursor.execute('SELECT * FROM LOG_DETAILS_T;')

global_instance_id = 0
business_domain = ['CRM', 'OPER', 'ACCOUNT']
business_subdomain = ['CUSTOMER', 'GRID', 'UPDATE']
version = 1.0
local_instance_id = ''  # some combo of busness_domanins and id
eai_transaction_id = ['server-1', 'computer-5', 'embeded-system-23']
eai_domain = ['EAI_DOMAIN_1', 'EAI_DOMAIN_2', 'EAI_DOMAIN_3', 'EAI_DOMAIN_4']
hostname = ['crm_server', 'acct_server', 'oper_server']
application = []  # business subdomain _ application
event_context = ['UPDATE', 'INFO']
component = ['UPDATE', 'INFO']
severity = [0, 9, 10, 20, 29, 30, 40, 49, 50, 60]
priority = [10, 50, 70]
creation_time = []
reasoning_scope = ['INTERNAL', 'EXTERNAL']
process_id = []
category_name = []
activity = []
msg = []
