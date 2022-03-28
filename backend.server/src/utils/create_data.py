import pymysql

host = 'track2-clog-master.c0pfgcylcs5z.us-east-1.rds.amazonaws.com'
user = 'thecafebabe'
password = 'idn3XtSV6McnzU'
database = 'clog'

connection = pymysql.connect(
    host=host, user=user, password=password, db=database)

cursor = connection.cursor()

cursor.execute('SELECT * FROM LOG_DETAILS_T;')

global_instance_id = 0
business_domain = ['CRM', 'OPER', 'ACCOUNT']
business_subdomain = ['CUSTOMER', 'GRID', 'UPDATE']
version = 1.0
local_instance_id = []  # some combo of busness_domanins
eai_transaction_id = []
eai_domain = []
hostname = []
application = []
event_context = []
component = []
severity = []
priority = []
creation_time = []
reasoning_scope = []
process_id = []
category_name = []
activity = []
msg = []

for row in cursor:
    business_domain.append(row[1])
    business_subdomain.append(row[2])
