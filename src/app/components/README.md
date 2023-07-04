# Componente Formulário

O componente `FormComponent` é um formulário de localização que permite ao usuário inserir informações de endereço, como CEP, logradouro, complemento, bairro, cidade e estado. O formulário é construído usando o Angular e Angular Forms.

## Uso do Componente

O componente é usado dentro de um template HTML e é vinculado a um FormGroup chamado `enderecoForm`. Ele possui os seguintes campos de formulário:

- **cep**: Campo para inserir o CEP do endereço. É um campo obrigatório e deve ter o formato "00000-000".
- **logradouro**: Campo para inserir o logradouro do endereço. É um campo obrigatório.
- **complemento**: Campo para inserir o complemento do endereço. É um campo obrigatório e deve ter o formato "0.000".
- **bairro**: Campo para inserir o bairro do endereço. É um campo obrigatório.
- **cidade**: Campo para inserir a cidade do endereço. É um campo obrigatório e deve ter no mínimo 4 caracteres e no máximo 20 caracteres.
- **state**: Campo para inserir o estado do endereço. É um campo obrigatório e possui sugestões de estados disponíveis para seleção.
- **ibge**: Campo para exibir o código do IBGE do endereço. É um campo desabilitado que é preenchido automaticamente.
- **siafi**: Campo para exibir o código do SIAFI do endereço. É um campo desabilitado que é preenchido automaticamente.

O componente também possui os seguintes métodos:

- **ngOnInit()**: Método do ciclo de vida do Angular que é executado quando o componente é inicializado. Chama o método `initForm()` para inicializar o formulário.
- **initForm()**: Método que inicializa o `enderecoForm` com os campos e validações necessárias.
- **buscarEndereco()**: Método chamado quando o usuário clica no botão "Buscar". Obtém o valor do campo CEP e chama o serviço `viacepService` para buscar as informações do endereço correspondente ao CEP. Em caso de sucesso, as informações são preenchidas no formulário.
- **clear(control: string)**: Método chamado quando o usuário clica no ícone "clear" ao lado do campo "Estado". Limpa o valor do campo correspondente ao controle passado como argumento.
- **salvar()**: Método chamado quando o usuário clica no botão "Salvar". Obtém os valores do formulário e os salva no armazenamento local (localStorage).

## Observações

- A propriedade `isDisabled` é usada para definir o estado de desabilitação dos campos "IBGE" e "SIAFI". Seu valor pode ser ajustado para habilitar ou desabilitar esses campos.
- O componente usa o

módulo `mat-card` do Angular Material para renderizar o formulário em um card.

- O campo de CEP usa o módulo `matInput` do Angular Material e o atributo `mask` para aplicar uma máscara de formato no input.
- O campo de estado usa o recurso de autocomplete do Angular Material e exibe uma lista de sugestões de estados disponíveis.
- O campo de estado possui um ícone "clear" que é mostrado quando o campo tem um valor. Ao clicar no ícone, o valor do campo é limpo.

Espero que essa explicação tenha sido útil para você! Se você tiver mais alguma dúvida, sinta-se à vontade para perguntar.

## Propriedades

- `enderecoForm`: Representa o formulário de endereço e é construído usando o `FormGroup` do Angular Forms.
- `isDisabled`: Define se os campos "IBGE" e "SIAFI" devem estar habilitados ou desabilitados. Pode ser definido como `true` ou `false`.
- `estadoSuggestions`: Uma lista de sugestões de estados, que são preenchidas automaticamente para o campo "Estado".

## Métodos

- `ngOnInit()`: Método do ciclo de vida do Angular que é executado quando o componente é inicializado. Chama o método `initForm()` para inicializar o formulário.
- `initForm()`: Inicializa o formulário `enderecoForm` com os campos e validadores correspondentes.
- `buscarEndereco()`: Método chamado quando o usuário clica no botão de busca de endereço. Obtém o valor do campo "CEP" e faz uma chamada ao serviço ViaCepService para buscar o endereço correspondente. Os dados do endereço são preenchidos no formulário.
- `clear(control: string)`: Limpa o valor do campo especificado no parâmetro `control`.
- `salvar()`: Método chamado quando o usuário clica no botão "Salvar". Obtém o valor preenchido no formulário e o salva no armazenamento local.

## Template

O template do componente consiste em um formulário HTML que utiliza as classes do Angular Material (`mat-card`, `mat-form-field`, `mat-label`, `mat-input`, `mat-error`, `mat-hint`, `mat-autocomplete`, `mat-option`, `mat-icon`, `mat-raised-button`) para estilização e funcionalidades adicionais.

O formulário é associado ao `enderecoForm` usando a diretiva `formGroup` e cada campo é associado ao `FormControlName` correspondente.

## Dependências

O componente utiliza as seguintes dependências:

- `@angular/core`: Fornece os recursos básicos do Angular.
- `@angular/forms`: Fornece as classes e validadores para criar e validar formulários.
- `@angular/material`: Fornece os componentes do Angular Material para estilização e funcionalidades adicionais.
- `viacep.service`: Um serviço que lida com as chamadas à API do ViaCep para obter informações de endereço com base no CEP fornecido.
- `States`: Uma enumeração que contém os valores dos estados para preenchimento das sugestões no campo "Estado".
- `./../../services/viacep.service`: Importação do serviço `ViaCepService` para buscar informações de endereço usando o CEP.
- `src/app/models/enums/states.enum`: Importação do arquivo que contém a enumeração dos estados.

## Estilos

O componente usa um arquivo CSS externo para estilizar o formulário. O caminho do arquivo de estilo é `./form.component.css`.
