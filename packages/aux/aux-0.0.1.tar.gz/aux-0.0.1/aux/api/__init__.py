import paramiko
from aux.protocol.http import HTTPClient
from aux.protocol.ssh import SSHClient
from aux.internals.credentials import Credentials

# def run(engine, func, *args, **kwargs):
#     engine.start()
#     try:
#         func(*args, **kwargs)
#     finally:
#         results = engine.stop()
#     return results

ssh = SSHClient()
http = HTTPClient()






