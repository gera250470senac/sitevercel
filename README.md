# Hanover Tecnologia — site de página única

## Como visualizar
1. Extraia o ZIP.
2. Abra `index.html` no navegador. Para melhores resultados, use a extensão **Live Server** no Visual Studio Code.

## Personalizar o portfólio
Baixe cinco banners no Canva e salve-os na pasta `assets` como:
- `banner-1.jpg`
- `banner-2.jpg`
- `banner-3.jpg`
- `banner-4.jpg`
- `banner-5.jpg`

Se os arquivos forem PNG, altere os caminhos no HTML de `.jpg` para `.png`.

## Personalizar os logos de clientes
Coloque cinco imagens na pasta `assets` com os nomes `cliente-1.png` até `cliente-5.png`.

## Atualizar o Google Maps
No `index.html`, procure o `iframe` com `google.com/maps?q=Novo...` e substitua o endereço por uma localização da empresa. Também atualize o texto de endereço exibido na seção.

## Formulário
O formulário possui validação JavaScript para CPF (incluindo dígitos verificadores), nome completo, e-mail e telefone com DDD. Neste exemplo ele **não envia dados** para um servidor: após a validação, exibe uma mensagem. Para produção, conecte a um back-end/API e implemente consentimento, política de privacidade e proteção dos dados.

## Estrutura
- `index.html` — conteúdo e estrutura da página
- `css/styles.css` — identidade visual, layout responsivo e animações
- `js/script.js` — slider, menu mobile, máscaras e validação do formulário
- `assets/logo.png` — logo fornecido
