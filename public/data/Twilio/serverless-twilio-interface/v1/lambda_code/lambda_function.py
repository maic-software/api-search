import io
import urllib
import xml.etree.ElementTree as ET


def lambda_handler(event, context):
    print("Received event: " + str(event))
    message_text = event['Body']
    text_response = urllib.parse.unquote_plus(handle_text_message(message_text))
    return _create_xml_for_message(text_response)


def handle_text_message(message_text):
    """
    :param message_text: String representing the message sent
    :return: String response to be texted back to messager
    """
    response = "{} to you too".format(message_text)
    return response


def _create_xml_for_message(message):
    resp = ET.Element('Response')
    msg = ET.SubElement(resp, 'Message')
    msg.text = message

    tree = ET.ElementTree(resp)
    buf = io.BytesIO()
    tree.write(buf, xml_declaration=True, encoding='utf-8')
    return buf.getvalue().decode()
