from flask import Flask, render_template, request, jsonify
import re

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/calcular', methods=['POST'])
def calcular():
    dados = request.get_json()
    expressao = dados.get('expressao', '')

    # Validação mais completa: permite números, operadores, parênteses, %, espaços
    if not re.fullmatch(r'[0-9+\-*/.%\s()]+', expressao):
        return jsonify({'erro': 'Expressão inválida'}), 400

    try:
        # Substitui % por /100 para funcionar corretamente
        expressao_tratada = expressao.replace('%', '/100')
        resultado = eval(expressao_tratada)
        
        # Arredonda para evitar problemas com floats
        if isinstance(resultado, float):
            resultado = round(resultado, 10)
        
        return jsonify({'resultado': resultado})
    except Exception as e:
        print(f"Erro ao calcular: {e}")  # Para debug
        return jsonify({'erro': 'Não foi possível calcular'}), 400

if __name__ == '__main__':
    app.run(debug=True)

