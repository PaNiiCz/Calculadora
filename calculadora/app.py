from flask import Flask, render_template, request, jsonify, send_from_directory
import re
import os

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/favicon.ico')
def favicon():
    return send_from_directory('static', 'icone.ico', mimetype='image/vnd.microsoft.icon')

@app.route('/calcular', methods=['POST'])
def calcular():
    dados = request.get_json()
    expressao = dados.get('expressao', '')

    if not re.fullmatch(r'[0-9+\-*/.%\s()]+', expressao):
        return jsonify({'erro': 'Expressão inválida'}), 400

    try:
        expressao_tratada = expressao.replace('%', '/100')
        resultado = eval(expressao_tratada)
        if isinstance(resultado, float):
            resultado = round(resultado, 10)
        return jsonify({'resultado': resultado})
    except Exception:
        return jsonify({'erro': 'Não foi possível calcular'}), 400

if __name__ == '__main__':
    app.run(debug=True)