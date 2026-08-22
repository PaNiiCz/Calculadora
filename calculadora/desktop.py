import threading
import webview
from app import app

class Api:
    def close_window(self):
        webview.windows[0].destroy()
    
    def minimize_window(self):
        webview.windows[0].minimize()
    
    def maximize_window(self):
        webview.windows[0].toggle_fullscreen()

if __name__ == '__main__':
    def start_flask():
        app.run(port=5001, use_reloader=False)

    t = threading.Thread(target=start_flask)
    t.daemon = True
    t.start()

    webview.create_window(
        'Calculadora',
        'http://127.0.0.1:5001',
        js_api=Api(),
        width=450,
        height=700,
        min_size=(400, 600),
        resizable=True,     # Continua podendo redimensionar (mas sem a setinha)
        frameless=True,     # Continua sem a barra padrão
        easy_drag=True      # <--- VOLTOU ISSO! Permite arrastar a janela em qualquer lugar
    )
    
    webview.start()