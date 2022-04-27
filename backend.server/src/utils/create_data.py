import pymysql
from faker import Faker
from numpy import random
from numpy.random import choice
import time

fake = Faker()

host = ''
user = ''
password = ''
database = ''

connection = pymysql.connect(
    host=host, user=user, password=password, db=database)

cursor = connection.cursor()

# stuff for both log details and business process tables
global_instance_id = 0
eai_transaction_id = ''
eai_domain = ['EAI_DOMAIN_1', 'EAI_DOMAIN_2', 'EAI_DOMAIN_3', 'EAI_DOMAIN_4']
business_domain = ['CRM', 'OPER', 'ACCOUNT']
application = ''  # {business domain} _ application

activity = ['Customer Update Recieved',
            'Customer Update Failed', 'Customer Update Persisted']

# log detail stuff
business_subdomain = ['CUSTOMER', 'GRID', 'UPDATE']
version = [1.0, 2.0, 3.4]
local_instance_id = ''  # busness_domanins-business_subdomain
hostname = ['crm_server', 'acct_server', 'oper_server']
event_context = ['UPDATE', 'INFO']
component = ['UPDATE', 'INFO']
severity = [10, 20, 29, 30, 40, 49, 50, 60]
priority = [10, 50, 70]
creation_time = ''  # create a time when inserting
reasoning_scope = ['INTERNAL', 'EXTERNAL']
process_id = 1234  # random number
category_name = ['ReportUpdate', 'ReportFail', 'ReportPersisted']
msg = ''  # random sentence

# business process stuff
bus_pub_dom = ['pub_bus_domain_1', 'pub_bus_domain_2',
               'pub_bus_domain_3', 'pub_bus_domain_4']

business_process = ['Process_1', 'Process_2', 'Process_3', 'Process_4']

app_context_1 = 'name'

app_context_2 = 'BAN'


# for i in range(100):

log_details_query = 'INSERT INTO LOG_DETAILS_T VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)'

business_process_query = 'INSERT INTO BUSINESS_PROCESS_LOG_T VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)'

global_instance_id = 'id_' + str(random.randint(100000)).zfill(5)
eai_transaction_id = 'eai_id_' + str(random.randint(1000)).zfill(3)

bus_dom = choice(business_domain)
bus_sub = choice(business_subdomain)
local_instance_id = bus_dom + '-' + bus_sub
application = bus_dom + '_application'

creation_time = time.strftime('%Y-%m-%d %H:%M:%S')
process_id = str(random.randint(10000)).zfill(4)


cursor.execute(log_details_query, (global_instance_id, bus_dom, bus_sub, choice(version), local_instance_id,
                                   eai_transaction_id, choice(eai_domain), choice(
    hostname), application, choice(event_context),
    choice(component), choice(severity), choice(
    priority), creation_time, choice(reasoning_scope), process_id,
    choice(category_name), choice(activity), fake.sentence(nb_words=8)))


connection.commit()

cursor.execute(business_process_query, (eai_transaction_id, choice(eai_domain), choice(bus_pub_dom), choice(business_process), creation_time,
                                        app_context_1, fake.name(), app_context_2, fake.bban(), global_instance_id, choice(business_domain), application, choice(activity)))


connection.commit()
