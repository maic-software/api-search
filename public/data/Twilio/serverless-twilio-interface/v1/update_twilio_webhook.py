import os
import yaml

from twilio.rest import Client


def update_twilio_webhook(api_url_base, endpoint):
    """
    Update
    :param api_url_base: url for api
    :param endpoint: endpoint in api to direct messages too
    :param number_to_set: number to set for webhook url, i.e. "+12345678901"
    """
    config_url = "{}/secrets.yml".format(os.path.dirname(os.path.abspath( __file__ )))
    with open(config_url, 'r') as f:
        config = yaml.safe_load(f)

    twilio_client = Client(
        config['account_sid'],
        config['auth_token']
    )
    number_to_set = str(config['service_phone'])
    if not number_to_set.startswith('+'):
        number_to_set = "+" + number_to_set

    webhook_url = "{}{}".format(api_url_base, endpoint)
    numbers = twilio_client.incoming_phone_numbers.list()
    if number_to_set:
        numbers = [number for number in numbers if number.phone_number == number_to_set]
        print("Setting webhook for: {}".format([n.phone_number for n in numbers]))
    for number in numbers:
        number.update(sms_url=webhook_url)

if __name__ == "__main__":
    import argparse

    PARSER = argparse.ArgumentParser()
    PARSER.add_argument('api_url_base')
    PARSER.add_argument('endpoint')
    PARSED_ARGS = PARSER.parse_args()

    update_twilio_webhook(
        PARSED_ARGS.api_url_base,
        PARSED_ARGS.endpoint
    )
