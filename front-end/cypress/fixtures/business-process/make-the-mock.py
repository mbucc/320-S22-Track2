# Please run this program in Python 3.10 environment.
# Required library: Faker.

import datetime
import json
from faker import Faker


fake = Faker()
Faker.seed(12345)


def main():
    """
    This program is used to make the mock data for the business process page.
    """

    bp_pool_file = './business-process-table.json'
    log_pool_file = './log-event-table.json'

    bp_pool = []
    log_pool = []

    available_applications = []
    for _ in range(15):
        available_applications.append(fake.sentence(nb_words=2).upper())
    available_applications = tuple(available_applications)

    available_business_domains = []
    for _ in range(7):
        available_business_domains.append(fake.word().upper())
    available_business_domains = tuple(available_business_domains)

    eai_size = 3

    for i in range(eai_size):
        print('Progress: {}%'.format(round(i / eai_size * 100)))
        # Generate a name with random text in it.
        eai_name = fake.bothify(text='EAI {} ????-####'.format(fake.last_name()))
        # Generate a random number of publishing business domains.
        for _ in range(fake.random_int(min=1, max=4)):
            pub_name = fake.bothify(text='Publishing ???-####')
            for _ in range(fake.random_int(min=1, max=4)):
                bp_name = fake.bothify(text='Business Process ???-####')
                for _ in range(fake.random_int(min=10, max=50)):
                    # Create BP object.
                    bp_instance_name = fake.bothify(text='BP Instance ????-########')
                    bp_instance_creation_time = fake.date_time_between(
                        start_date='-10d', end_date='now',
                        tzinfo=datetime.timezone.utc,
                    )
                    bp_instance_severity = fake.random_int(min=0, max=99)
                    bp_instance_context_1_name = fake.bothify(text='ContextID')
                    bp_instance_context_1_value = fake.bothify(text='########')
                    bp_instance_context_2_name = fake.bothify(text='MockInformation')
                    bp_instance_context_2_value = fake.bothify(text='###.###.###')
                    eai_transaction_id = fake.bothify(text='eai-trans-id-??????-######')
                    bp_instance_object = dict()
                    bp_instance_object['name'] = bp_instance_name
                    bp_instance_object['eai_transaction_id'] = eai_transaction_id
                    bp_instance_object['eai_transaction_create_time'] =\
                        bp_instance_creation_time.isoformat()
                    bp_instance_object['severity'] = bp_instance_severity
                    bp_instance_object['key1_app_context_name'] = bp_instance_context_1_name
                    bp_instance_object['key1_app_context_value'] = bp_instance_context_1_value
                    bp_instance_object['key2_app_context_name'] = bp_instance_context_2_name
                    bp_instance_object['key2_app_context_value'] = bp_instance_context_2_value
                    bp_pool.append(bp_instance_object)

                    # Create corresponding log event object.
                    for _ in range(fake.random_int(min=2, max=10)):
                        log_object = dict()
                        log_object['eai_transaction_id'] = eai_transaction_id
                        log_object['activity'] = fake.sentence(
                            nb_words=fake.random_int(min=3, max=5)
                        )
                        log_object['application'] = fake.random_element(available_applications)
                        log_object['business_domain'] = fake.random_element(available_business_domains)
                        log_object['severity'] = fake.random_int(
                            min=0, max=bp_instance_severity
                        ) if i != 0 else bp_instance_severity
                        # Make sure that there is at least one matching the severity.
                        log_object['creation_time'] = fake.date_time_between(
                            start_date=bp_instance_creation_time,
                            end_date='now',
                            tzinfo=datetime.timezone.utc,
                        ).isoformat()
                        log_pool.append(log_object)

    # Convert pools from list to json.
    bp_pool_json = json.dumps(bp_pool, indent=2)
    log_pool_json = json.dumps(log_pool, indent=2)

    # Write pools to file.
    with open(bp_pool_file, 'w') as f:
        f.write(bp_pool_json)
    with open(log_pool_file, 'w') as f:
        f.write(log_pool_json)


if __name__ == '__main__':
    main()
    print('Done.')

    # You do not need to run this program again! All data is generated correctly.
