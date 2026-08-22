import webview
import threading
from app import app
import sys
import os

def rodar_flask():
    # Desativa o debug e o reloader para produção
    app.run(host='127.0.0.1', port=5001, debug=False, use_reloader=False)

class Api:
    def fechar(self):
        """Fecha a aplicação"""
        webview.windows[0].destroy()
        sys.exit(0)
    
    def minimizar(self):
        """Minimiza a janela"""
        webview.windows[0].minimize()

if __name__ == '__main__':
    # Inicia o Flask em uma thread separada
    thread_flask = threading.Thread(target=rodar_flask)
    thread_flask.daemon = True
    thread_flask.start()

    # Cria a API para comunicação Python-JS
    api = Api()
    
    # Cria a janela do app
    webview.create_window(
        'Calculadora',                          # Título da janela
        'http://localhost:5001',                # URL do Flask
        width=320,                              # Largura
        height=580,                             # Altura
        resizable=False,                        # Não redimensionável (como calculadora do Windows)
        frameless=False,                        # Com bordas (para parecer app normal)
        easy_drag=False,                        # Desativa drag (já temos bordas)
        transparent=False,                      # Fundo normal (não transparente)
        fullscreen=False,                       # Não inicia em tela cheia
        min_size=(320, 580),                    # Tamanho mínimo
        confirm_close=False,                    # Não pergunta ao fechar
        text_select=True,                       # Permite selecionar texto
        js_api=api                              # API para comunicação
    )
    
    # Inicia o webview com Edge Chromium
    webview.start(gui='edgechromium', ssl=False, debug=False)