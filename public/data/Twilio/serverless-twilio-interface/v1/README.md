Project to spin up the infrastructure for a serverless text
message response interface using twilio, apigateway, and aws lambda.

Basically a one button operationalizing of [this tutorial](https://www.twilio.com/docs/sms/tutorials/how-to-receive-and-reply-python-amazon-lambda)

Setup
=====
1) Create a virtualenv and `pip install -e text_message_interface`
2) Install [terraform](https://learn.hashicorp.com/terraform/getting-started/install.html)
3) Create a [twilio](https://www.twilio.com/try-twilio) account and add a phone number
    * Create a secrets.yaml from the secrets.yaml.template setting account info from twilio
4) Create an [aws account](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/)
    * Add setup credentials in ~/.aws as described [here](https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/setup-credentials.html)

Development
===========
This code will allow you to write a text responder entirely in python.

All you need to do is modify `handle_text_message` in lambda_code/lambda_function.py which will receive the texted information as a string.


Deploy infrastructure
=====================
Make sure you have activated the venv you created above.

1) `cd terraform_twilio`
2) `terraform init`
3) `terraform plan`
4) `terraform apply`
