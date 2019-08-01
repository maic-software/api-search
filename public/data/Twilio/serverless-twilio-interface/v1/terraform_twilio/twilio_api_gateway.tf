variable accountId {}

variable myregion {}

# API Gateway
resource "aws_api_gateway_rest_api" "api" {
  name = "twilio_api"
}

resource "aws_api_gateway_resource" "resource" {
  path_part   = "message"
  parent_id   = "${aws_api_gateway_rest_api.api.root_resource_id}"
  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
}

resource "aws_api_gateway_method" "method" {
  rest_api_id   = "${aws_api_gateway_rest_api.api.id}"
  resource_id   = "${aws_api_gateway_resource.resource.id}"
  http_method   = "POST"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "integration" {
  rest_api_id             = "${aws_api_gateway_rest_api.api.id}"
  resource_id             = "${aws_api_gateway_resource.resource.id}"
  http_method             = "${aws_api_gateway_method.method.http_method}"
  integration_http_method = "POST"
  type                    = "AWS"
  request_templates = {
    "application/x-www-form-urlencoded"  = <<MAPPER
#set($httpPost = $input.path('$').split("&"))
{
#foreach( $kvPair in $httpPost )
 #set($kvTokenised = $kvPair.split("="))
 #if( $kvTokenised.size() > 1 )
   "$kvTokenised[0]" : "$kvTokenised[1]"#if( $foreach.hasNext ),#end
 #else
   "$kvTokenised[0]" : ""#if( $foreach.hasNext ),#end
 #end
#end
}
MAPPER
  }
  uri                     = "arn:aws:apigateway:${var.myregion}:lambda:path/2015-03-31/functions/${aws_lambda_function.twilio_lambda.arn}/invocations"
}

resource "aws_api_gateway_method_response" "200" {
  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  resource_id = "${aws_api_gateway_resource.resource.id}"
  http_method = "${aws_api_gateway_method.method.http_method}"
  status_code = "200"

  response_models {"application/xml" = "Empty"}
}

resource "aws_api_gateway_integration_response" "twilio_response" {
  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  resource_id = "${aws_api_gateway_resource.resource.id}"
  http_method = "${aws_api_gateway_method.method.http_method}"
  status_code = "${aws_api_gateway_method_response.200.status_code}"

  content_handling = "CONVERT_TO_TEXT"

  response_templates = {
    "application/xml" = <<MAPPER
#set($inputRoot = $input.path('$'))
$inputRoot
MAPPER
  }

  depends_on = ["aws_api_gateway_integration.integration"]
}

resource "aws_api_gateway_deployment" "twilio_api_deployment" {
  depends_on = ["aws_api_gateway_integration.integration"]

  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  stage_name  = "production"

  provisioner "local-exec" {
    command = "python ../update_twilio_webhook.py ${aws_api_gateway_deployment.twilio_api_deployment.invoke_url} ${aws_api_gateway_resource.resource.path}"
  }
}

output "api_url" {
  value = "${aws_api_gateway_deployment.twilio_api_deployment.invoke_url}"
}
