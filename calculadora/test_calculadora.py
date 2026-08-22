import unittest
import json
from app import app

class TestCalculadora(unittest.TestCase):
    
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True
    
    def test_soma(self):
        resposta = self.app.post('/calcular', 
            json={'expressao': '2+2'})
        dados = json.loads(resposta.data)
        self.assertEqual(dados['resultado'], 4)
    
    def test_subtracao(self):
        resposta = self.app.post('/calcular',
            json={'expressao': '10-3'})
        dados = json.loads(resposta.data)
        self.assertEqual(dados['resultado'], 7)
    
    def test_multiplicacao(self):
        resposta = self.app.post('/calcular',
            json={'expressao': '5*5'})
        dados = json.loads(resposta.data)
        self.assertEqual(dados['resultado'], 25)
    
    def test_divisao(self):
        resposta = self.app.post('/calcular',
            json={'expressao': '10/2'})
        dados = json.loads(resposta.data)
        self.assertEqual(dados['resultado'], 5)
    
    def test_divisao_por_zero(self):
        resposta = self.app.post('/calcular',
            json={'expressao': '10/0'})
        dados = json.loads(resposta.data)
        self.assertIn('erro', dados)
    
    def test_expressao_invalida(self):
        resposta = self.app.post('/calcular',
            json={'expressao': '2+*3'})
        dados = json.loads(resposta.data)
        self.assertIn('erro', dados)
    
    def test_expressao_com_espacos(self):
        resposta = self.app.post('/calcular',
            json={'expressao': ' 10 + 5 '})
        dados = json.loads(resposta.data)
        self.assertEqual(dados['resultado'], 15)
    
    def test_porcentagem(self):
        resposta = self.app.post('/calcular',
            json={'expressao': '100%'})
        dados = json.loads(resposta.data)
        self.assertEqual(dados['resultado'], 1)  # 100% = 1

if __name__ == '__main__':
    unittest.main()