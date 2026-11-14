import http.server
import os
import socketserver
import webbrowser

PORT = 8080
ROOT = os.path.dirname(os.path.abspath(__file__))

class ReusableTCPServer(socketserver.TCPServer):
    allow_reuse_address = True

os.chdir(ROOT)
with ReusableTCPServer(("", PORT), http.server.SimpleHTTPRequestHandler) as httpd:
    print(f"Web Dev: Zero to Grandmaster running at http://localhost:{PORT}")
    print("Press Ctrl+C to stop.")
    webbrowser.open(f"http://localhost:{PORT}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")