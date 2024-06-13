from bluetooth import *
from bluetooth import BluetoothSocket

server_sock = BluetoothSocket(RFCOMM)
server_sock.bind(("", 2222))
server_sock.listen(1)

port = server_sock.getsockname()[1]

advertise_service(server_sock, "BluetoothServer",
                  service_id=UUID_SERVCLASS_FILE_TRANSFER)

print("Waiting for connection on RFCOMM channel %d" % port)

client_sock, client_info = server_sock.accept()
print("Accepted connection from", client_info)

try:
    while True:
        # Code pour recevoir et sauvegarder les images
        data = client_sock.recv(1024)
        if not data:
            break
        # Traitement des données reçues (sauvegarde des images, etc.)
        print("Received data:", data)
except IOError:
    pass

print("Disconnected.")

client_sock.close()
server_sock.close()
