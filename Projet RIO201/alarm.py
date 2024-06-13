import asyncio
from aiocoap import *

async def send_post_request():
    # Define the CoAP server endpoint
    server_endpoint = "coap://example.com/resource"

    # Create a CoAP context
    protocol = await Context.create_client_context()

    # Create a CoAP request with the payload "bedtime"
    payload = b"bedtime"
    request = Message(code=POST, uri=server_endpoint, payload=payload)

    try:
        # Send the CoAP request and wait for the response
        response = await protocol.request(request).response

        # Print the response payload
        print("Response payload:", response.payload.decode())

    except Exception as e:
        print("Failed to send POST request:", e)

    # Close the CoAP context
    await protocol.shutdown()

# Run the code
asyncio.get_event_loop().run_until_complete(send_post_request())
