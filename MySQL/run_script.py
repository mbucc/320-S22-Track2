import sys
import random as samp

#0 = GID_template - crm_server_+GENERATED NUMBER
#1 = EID_template  - eai_crm_server_+GENERATED NUMBER
#2 = Creation time, set to 'none' for current time
#3 = Process ID, set to 'none' for random integer
#4 = key1_app_context_name
#5 = key1_app_context_value - Should be contextually related to 4
#6 = key2_app_context_name
#7 = key2_app_context_value - should be contextually related to 5
#8 = Manual EID - overrides arg1. Set this to 'none' otherwise. Using 'none' will push new records to BUSINESS_PROCESS_LOG_T

###########################################

s = 1 #starting index
n = 24 #number of new records total

if (n%6) > 3:
    n = (n+(6-n%6))
else:
    n = n-(n%6)

gid = list(samp.sample(range(s, s+(n+1)), n))
eid = list(samp.sample(range(s, s+(n+1)), n))



while len(gid) > 0:
    print(len(gid))
    sys.argv = ['crm_server_'+str(gid.pop()).zfill(5), 'eai_crm_server_'+str(eid.pop()).zfill(5), 'rand', 'none', "Customer_Id", 'none', "Effective_Date", 'timestamp','eai_crm_server_01306' ]
    exec(open("./data_generator.py").read())
    sys.argv = ['crm_server_'+str(gid.pop()).zfill(5), 'eai_crm_server_'+str(eid.pop()).zfill(5), 'rand', 'none', "Effective_Date", 'none', "BAN", 'ban','eai_crm_server_06755']
    exec(open("./data_generator.py").read())
    sys.argv = ['operations_server_'+str(gid.pop()).zfill(5), 'eai_op_server_'+str(eid.pop()).zfill(5), 'rand', 'none', "Customer_Id", 'none', "BAN", 'ban','eai_op_server_13207']
    exec(open("./data_generator.py").read())
    sys.argv = ['operations_server_'+str(gid.pop()).zfill(5), 'eai_op_server_'+str(eid.pop()).zfill(5), 'rand', 'none', "Customer_Name", 'person', "Effective_Date", 'timestamp','eai_op_server_04920']
    exec(open("./data_generator.py").read())
    sys.argv = ['accounting_server_'+str(gid.pop()).zfill(5), 'eai_acc_server_'+str(eid.pop()).zfill(5), 'rand', 'none', "Client_Id", 'none', "BAN", 'ban','eai_acc_server_00336']
    exec(open("./data_generator.py").read())
    sys.argv = ['accounting_server_'+str(gid.pop()).zfill(5), 'eai_acc_server_'+str(eid.pop()).zfill(5), 'rand', 'none', "Start_Date", 'timestamp', "Effective_Date", 'timestamp','timestamp', 'eai_acc_server_000540']
    exec(open("./data_generator.py").read())

