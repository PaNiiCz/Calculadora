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

    def resize_window(self, modo):
        if modo == 'cientifica':
            webview.windows[0].resize(420, 820)
        else:
            webview.windows[0].resize(420, 650)

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
        width=420,
        height=650,
        min_size=(380, 500),
        resizable=True,
        frameless=True,
        easy_drag=True
    )

    webview.start()