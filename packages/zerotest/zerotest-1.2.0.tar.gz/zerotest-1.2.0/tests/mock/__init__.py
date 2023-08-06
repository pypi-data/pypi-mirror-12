import socket


def pickup_port():
    s = socket.socket()
    s.bind(('127.0.0.1', 0))
    port = s.getsockname()[-1]
    s.close()
    return port
