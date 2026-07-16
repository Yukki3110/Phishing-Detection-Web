import ssl
import socket

def get_ssl_certificate(domain):
    
    try:
        
        context = ssl.create_default_context()
        
        with socket.create_connection((domain,443)) as sock:
            
            with context.wrap_socket(
                sock,
                server_hostname=domain
            ) as secure_sock:
                
                return secure_sock.getpeercert()
            
    except Exception:
        
        return None