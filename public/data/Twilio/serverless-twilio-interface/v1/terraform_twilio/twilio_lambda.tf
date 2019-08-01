variable "twilio_zip_path" {
  type = "string"
  default = "../twilioLambda.zip"
}

variable "twilio_lambda_dir" {
  type = "string"
  default = "../lambda_code/"
}

data "archive_file" "lambda_zip" {
  type        = "zip"
  source_dir  = "${var.twilio_lambda_dir}"
  output_path = "${var.twilio_zip_path}"
}

resource "aws_lambda_permission" "apigw_lambda" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.twilio_lambda.function_name}"
  principal     = "apigateway.amazonaws.com"

  # More: http://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-control-access-using-iam-policies-to-invoke-api.html
  source_arn = "arn:aws:execute-api:${var.myregion}:${var.accountId}:${aws_api_gateway_rest_api.api.id}/*/${aws_api_gateway_method.method.http_method}${aws_api_gateway_resource.resource.path}"
}

resource "aws_lambda_function" "twilio_lambda" {
  filename      = "${var.twilio_zip_path}"
  function_name = "twilio_lambda"
  role          = "${aws_iam_role.lambda_role.arn}"
  handler       = "lambda_function.lambda_handler"
  runtime       = "python3.6"
  timeout       = 10

//  depends_on = ["archive_file.lambda_zip"]

  # The filebase64sha256() function is available in Terraform 0.11.12 and later
  # For Terraform 0.11.11 and earlier, use the base64sha256() function and the file() function:
  source_code_hash = "${data.archive_file.lambda_zip.output_base64sha256}"
//  source_code_hash = "${filebase64sha256("${var.twilio_zip_path}")}"
}

# IAM
resource "aws_iam_role" "lambda_role" {
  name = "iam_for_lambda"

  assume_role_policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
POLICY
}

resource "aws_iam_policy" "lambda_logging" {
  name = "lambda_logging"
  path = "/"
  description = "IAM policy for logging from a lambda"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*:*:*",
      "Effect": "Allow"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "lambda_logs" {
  role = "${aws_iam_role.lambda_role.name}"
  policy_arn = "${aws_iam_policy.lambda_logging.arn}"
}
