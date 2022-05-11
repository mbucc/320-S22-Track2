from importlib_metadata import NullFinder
import pymysql
from faker import Faker
from numpy import random
from numpy.random import choice
import random as r
import time
import datetime
import sys

fake = Faker()

host = 'hostname'
user = 'username'
password ='password'
database = 'database'

connection = pymysql.connect(
    host=host, user=user, password=password, db=database)

#COMMON VARIABLES:

global_instance_id = sys.argv[0]# + str(random.randint(100000)).zfill(5) add number to gid
if sys.argv[8].lower == 'none':
    eai_transaction_id = sys.argv[1] + str(random.randint(100000)).zfill(3) #add number to eai
else:
    eai_transaction_id = sys.argv[8]
creation_time = sys.argv[2]  # Leave 'None' for current time, 'rand' for time between now and 5/12
process_id = sys.argv[3] # Leave 'None' for random number
app_context_1 = sys.argv[4] 
app_context_2 = sys.argv[6]

def generate_value(arg):
    if arg.lower() == 'none':
        return random.randint(100000)
    elif arg.lower() == 'person':
        return fake.name()
    elif arg.lower() == 'timestamp':
        return time.strftime('%Y-%m-%d %H:%M:%S')
    elif arg.lower() == 'ban':
        return fake.bban()

def generate_timestamp():
    start_date = datetime.datetime.today()
    end_date = datetime.datetime(2022, 12, 31)

    time_between_dates = end_date - start_date
    days_between_dates = time_between_dates.days
    random_number_of_days = r.randrange(days_between_dates)
    random_date = start_date + datetime.timedelta(days=random_number_of_days)
    return random_date

app_context_value_1 = generate_value(sys.argv[5]) #use fake.name() to generate names
app_context_value_2 = generate_value(sys.argv[7])



cursor = connection.cursor()
# stuff for both log details and business process tables
#global_instance_id = 0 
#eai_transaction_id = 'test_domain_' 
eai_domain = ['EAI_DOMAIN_1', 'EAI_DOMAIN_2', 'EAI_DOMAIN_3', 'EAI_DOMAIN_4']
business_domain = ['CRM', 'OPER', 'ACCOUNT']
application = ''  # {business domain} _ application
activity = ['Customer Update Received',
            'Customer Update Failed', 'Customer Update Persisted']
# log detail stuff
business_subdomain = ['CUSTOMER', 'GRID', 'UPDATE']
version = [1.0, 2.0, 3.4]
local_instance_id = ''  # business_domanins-business_subdomain
hostname = ['crm_server', 'acct_server', 'oper_server']
event_context = ['UPDATE', 'INFO']
component = ['UPDATE', 'INFO']
severity = [10, 20, 29, 30, 40, 49, 50, 60]
priority = [10, 50, 70]

reasoning_scope = ['INTERNAL', 'EXTERNAL']

category_name = ['ReportUpdate', 'ReportFail', 'ReportPersisted']
msg = ''  # random sentence
# business process stuff
business_process = choice(['CRM_APP', 'OPERATIONS_APP', 'ACCOUNTING_APP'])
publishing_business_domain = business_process.lower()

# for i in range(100):

#define queries
log_details_t_query = 'INSERT INTO LOG_DETAILS_T VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)'
if sys.argv[8].lower == 'none':
    business_process_log_t_query = 'INSERT INTO BUSINESS_PROCESS_LOG_T VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)'
log_app_context_t_query = 'INSERT INTO LOG_APP_CONTEXT_T VALUES (%s, %s, %s)'
#business_process_t_query = 'INSERT INTO BUSINESS_PROCESS_T VALUES (%s, %s, %s, %s)'

bus_dom = choice(business_domain)
bus_sub = choice(business_subdomain)
local_instance_id = bus_dom + '-' + bus_sub
application = bus_dom + '_application'
if (creation_time.lower() == 'none'):
    creation_time = time.strftime('%Y-%m-%d %H:%M:%S.')
    creation_time += str(random.randint(0, 999999)).ljust(6, '0')
else:
    creation_time = generate_timestamp()
if process_id.lower() == 'none':
    process_id = str(random.randint(10000)).zfill(4)

#run queries
cursor.execute(log_details_t_query, (global_instance_id, bus_dom, bus_sub, choice(version), local_instance_id,
                                   eai_transaction_id, choice(eai_domain), choice(
    hostname), application, choice(event_context),
    choice(component), choice(severity), choice(
    priority), creation_time, choice(reasoning_scope), process_id,
    choice(category_name), choice(activity), fake.sentence(nb_words=8)))
connection.commit()
if sys.argv[8].lower == 'none':
    cursor.execute(business_process_log_t_query, (eai_transaction_id, choice(eai_domain), publishing_business_domain, business_process, creation_time,
                                        app_context_1, app_context_value_1, app_context_2, app_context_value_2, global_instance_id, choice(business_domain), application, choice(activity)))
connection.commit()

cursor.execute(log_app_context_t_query, (global_instance_id, app_context_1, app_context_value_1))
connection.commit()

#cursor.execute(BUSINESS_PROCESS_T_query, (choice(business_process),  choice(bus_pub_dom), app_context_1, app_context_2))
#connection.commit()
connection.close()
