import os
from PIL import Image

# Procura automaticamente por qualquer arquivo PNG na pasta
arquivos_png = [f for f in os.listdir('.') if f.endswith('.png')]

if arquivos_png:
    # Pega o primeiro PNG encontrado
    nome_png = arquivos_png[0]
    print(f"📂 Encontrado: {nome_png}")
    
    # Abre e converte
    img = Image.open(nome_png)
    img.save('icone.ico', format='ICO', sizes=[(256, 256)])
    print("✅ Ícone convertido com sucesso! -> icone.ico")
else:
    print("❌ Nenhum arquivo PNG encontrado!")
    print("📂 Certifique-se de que o ícone PNG está nesta pasta.")