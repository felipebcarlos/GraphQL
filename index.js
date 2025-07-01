const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');

// 1. DEFINIÇÃO DO SCHEMA (TYPEDEFS)
// Agora temos dois tipos principais: Livro e Autor, e eles se referenciam.
const typeDefs = `#graphql
  """
  Representa um livro na nossa biblioteca.
  """
  type Livro {
    id: ID!
    titulo: String
    genero: String
    edicao: String
    precoMedio: Float
    quantidadeVendas: Int
    dataLancamento: String
    editora: String
    notaMediaLeitores: Float
    autor: Autor
  }

  """
  Representa um autor, que pode ter escrito múltiplos livros.
  """
  type Autor {
    id: ID!
    nome: String
    pais: String
    livros: [Livro]
  }

  type Query {
    livros: [Livro]
    livro(id: ID!): Livro
    autores: [Autor]
    autor(id: ID!): Autor
  }
`;

// 2. BASE DE DADOS
// Agora temos duas listas: uma para autores e outra para livros.

const autores = [
    { id: "1", nome: "Gabriel García Márquez", pais: "Colômbia" },
    { id: "2", nome: "George Orwell", pais: "Reino Unido" },
    { id: "3", nome: "Miguel de Cervantes", pais: "Espanha" },
    { id: "4", nome: "F. Scott Fitzgerald", pais: "EUA" },
    { id: "5", nome: "Sun Tzu", pais: "China" },
    { id: "6", nome: "J.R.R. Tolkien", pais: "Reino Unido" },
    { id: "7", nome: "Antoine de Saint-Exupéry", pais: "França" },
    { id: "8", nome: "Fiódor Dostoiévski", pais: "Rússia" },
    { id: "9", nome: "J.D. Salinger", pais: "EUA" },
    { id: "10", nome: "Jane Austen", pais: "Reino Unido" },
    { id: "11", nome: "Franz Kafka", pais: "República Tcheca" },
    { id: "12", nome: "Liev Tolstói", pais: "Rússia" },
    { id: "13", nome: "José Saramago", pais: "Portugal" },
    { id: "14", nome: "Umberto Eco", pais: "Itália" },
    { id: "15", nome: "Ray Bradbury", pais: "EUA" },
    { id: "16", nome: "Harper Lee", pais: "EUA" },
    { id: "17", nome: "Mary Shelley", pais: "Reino Unido" },
    { id: "18", nome: "Bram Stoker", pais: "Irlanda" },
    { id: "19", nome: "Herman Melville", pais: "EUA" },
    { id: "20", nome: "James Joyce", pais: "Irlanda" },
    { id: "21", nome: "Dante Alighieri", pais: "Itália" },
    { id: "22", nome: "William Shakespeare", pais: "Reino Unido" },
    { id: "23", nome: "Emily Brontë", pais: "Reino Unido" },
    { id: "24", nome: "Victor Hugo", pais: "França" },
    { id: "25", nome: "Oscar Wilde", pais: "Irlanda" },
    { id: "26", nome: "John Steinbeck", pais: "EUA" },
    { id: "27", nome: "Vladimir Nabokov", pais: "Rússia" },
    { id: "28", nome: "William Faulkner", pais: "EUA" },
    { id: "29", nome: "Jean-Paul Sartre", pais: "França" },
    { id: "30", nome: "Albert Camus", pais: "França" },
    { id: "31", nome: "João Guimarães Rosa", pais: "Brasil" },
    { id: "32", nome: "Machado de Assis", pais: "Brasil" },
    { id: "33", nome: "Graciliano Ramos", pais: "Brasil" },
    { id: "34", nome: "Clarice Lispector", pais: "Ucrânia" },
    { id: "35", nome: "Paulo Coelho", pais: "Brasil" },
    { id: "36", nome: "Aldous Huxley", pais: "Reino Unido" },
    { id: "37", nome: "C.S. Lewis", pais: "Reino Unido" },
    { id: "38", nome: "Margaret Atwood", pais: "Canadá" },
    { id: "39", nome: "Frank Herbert", pais: "EUA" },
    { id: "40", nome: "Isaac Asimov", pais: "Rússia" },
    { id: "41", nome: "Douglas Adams", pais: "Reino Unido" },
    { id: "42", nome: "Neil Gaiman", pais: "Reino Unido" },
    { id: "43", nome: "Markus Zusak", pais: "Austrália" },
    { id: "44", nome: "Yuval Noah Harari", pais: "Israel" },
    { id: "45", nome: "Charles Duhigg", pais: "EUA" },
    { id: "46", nome: "Carol S. Dweck", pais: "EUA" },
    { id: "47", nome: "Ernest Hemingway", pais: "EUA" },
    { id: "48", nome: "George R.R. Martin", pais: "EUA" },
    { id: "49", nome: "J.K. Rowling", pais: "Reino Unido" },
    { id: "50", nome: "Stephen King", pais: "EUA" },
    { id: "51", nome: "Agatha Christie", pais: "Reino Unido" },
    { id: "52", nome: "Arthur Conan Doyle", pais: "Reino Unido" },
    { id: "53", nome: "Jules Verne", pais: "França" },
    { id: "54", nome: "H.G. Wells", pais: "Reino Unido" },
    { id: "55", nome: "Philip K. Dick", pais: "EUA" },
    { id: "56", nome: "William Gibson", pais: "EUA" },
    { id: "57", nome: "George Orwell", pais: "Reino Unido" },
    { id: "58", nome: "H.P. Lovecraft", pais: "EUA" },
    { id: "59", nome: "Edgar Allan Poe", pais: "EUA" },
    { id: "60", nome: "Virginia Woolf", pais: "Reino Unido" },
    { id: "61", nome: "Simone de Beauvoir", pais: "França" },
    { id: "62", nome: "Jorge Luis Borges", pais: "Argentina" },
    { id: "63", nome: "Julio Cortázar", pais: "Argentina" },
    { id: "64", nome: "Mario Vargas Llosa", pais: "Peru" },
    { id: "65", nome: "Isabel Allende", pais: "Chile" },
    { id: "66", nome: "Carlos Ruiz Zafón", pais: "Espanha" },
    { id: "67", nome: "Elena Ferrante", pais: "Itália" },
    { id: "68", nome: "Haruki Murakami", pais: "Japão" },
    { id: "69", nome: "Kazuo Ishiguro", pais: "Reino Unido" },
    { id: "70", nome: "Chimamanda Ngozi Adichie", pais: "Nigéria" },
];

const livros = [
    { id: "1", autorId: "1", titulo: "Cem Anos de Solidão", genero: "Realismo Mágico", edicao: "Capa Comum", precoMedio: 59.90, quantidadeVendas: 50000000, dataLancamento: "1967-05-30", editora: "Record", notaMediaLeitores: 4.8 },
    { id: "2", autorId: "2", titulo: "1984", genero: "Distopia", edicao: "Edição de Luxo", precoMedio: 45.50, quantidadeVendas: 65000000, dataLancamento: "1949-06-08", editora: "Companhia das Letras", notaMediaLeitores: 4.9 },
    { id: "3", autorId: "3", titulo: "Dom Quixote", genero: "Sátira", edicao: "Edição Comentada", precoMedio: 89.90, quantidadeVendas: 500000000, dataLancamento: "1605-01-16", editora: "Penguin Classics", notaMediaLeitores: 4.7 },
    { id: "4", autorId: "4", titulo: "O Grande Gatsby", genero: "Ficção", edicao: "Clássicos Modernos", precoMedio: 39.99, quantidadeVendas: 25000000, dataLancamento: "1925-04-10", editora: "Scribner", notaMediaLeitores: 4.5 },
    { id: "5", autorId: "5", titulo: "A Arte da Guerra", genero: "Estratégia", edicao: "Edição de Bolso", precoMedio: 25.00, quantidadeVendas: 100000000, dataLancamento: "500 a.C.", editora: "Jardim dos Livros", notaMediaLeitores: 4.6 },
    { id: "6", autorId: "6", titulo: "O Senhor dos Anéis", genero: "Fantasia", edicao: "Volume Único", precoMedio: 120.00, quantidadeVendas: 150000000, dataLancamento: "1954-07-29", editora: "HarperCollins", notaMediaLeitores: 4.9 },
    { id: "7", autorId: "7", titulo: "O Pequeno Príncipe", genero: "Fábula", edicao: "Capa Dura", precoMedio: 35.90, quantidadeVendas: 200000000, dataLancamento: "1943-04-06", editora: "Agir", notaMediaLeitores: 4.8 },
    { id: "8", autorId: "8", titulo: "Crime e Castigo", genero: "Ficção Psicológica", edicao: "Tradução Direta", precoMedio: 65.70, quantidadeVendas: 15000000, dataLancamento: "1866-11-12", editora: "Editora 34", notaMediaLeitores: 4.7 },
    { id: "9", autorId: "9", titulo: "O Apanhador no Campo de Centeio", genero: "Ficção", edicao: "Standard", precoMedio: 42.00, quantidadeVendas: 65000000, dataLancamento: "1951-07-16", editora: "Little, Brown and Company", notaMediaLeitores: 4.2 },
    { id: "10", autorId: "10", titulo: "Orgulho e Preconceito", genero: "Romance", edicao: "Edição Vitoriana", precoMedio: 49.90, quantidadeVendas: 20000000, dataLancamento: "1813-01-28", editora: "Martin Claret", notaMediaLeitores: 4.8 },
    { id: "11", autorId: "11", titulo: "A Metamorfose", genero: "Ficção Absurda", edicao: "Capa Comum", precoMedio: 29.90, quantidadeVendas: 10000000, dataLancamento: "1915-10-15", editora: "L&PM", notaMediaLeitores: 4.6 },
    { id: "12", autorId: "12", titulo: "Guerra e Paz", genero: "Ficção Histórica", edicao: "Box com 2 volumes", precoMedio: 150.50, quantidadeVendas: 36000000, dataLancamento: "1869-01-01", editora: "Cosac Naify", notaMediaLeitores: 4.5 },
    { id: "13", autorId: "13", titulo: "Ensaio sobre a Cegueira", genero: "Ficção", edicao: "Contemporânea", precoMedio: 55.00, quantidadeVendas: 2000000, dataLancamento: "1995-10-10", editora: "Companhia das Letras", notaMediaLeitores: 4.9 },
    { id: "14", autorId: "14", titulo: "O Nome da Rosa", genero: "Mistério Histórico", edicao: "Edição Histórica", precoMedio: 75.00, quantidadeVendas: 50000000, dataLancamento: "1980-09-05", editora: "Record", notaMediaLeitores: 4.7 },
    { id: "15", autorId: "15", titulo: "Fahrenheit 451", genero: "Distopia", edicao: "Capa Dura", precoMedio: 48.00, quantidadeVendas: 10000000, dataLancamento: "1953-10-19", editora: "Globo Livros", notaMediaLeitores: 4.7 },
    { id: "16", autorId: "16", titulo: "O Sol é para Todos", genero: "Ficção", edicao: "Clássicos Americanos", precoMedio: 52.30, quantidadeVendas: 40000000, dataLancamento: "1960-07-11", editora: "José Olympio", notaMediaLeitores: 4.8 },
    { id: "17", autorId: "17", titulo: "Frankenstein", genero: "Terror Gótico", edicao: "Edição Gótica", precoMedio: 44.90, quantidadeVendas: 9000000, dataLancamento: "1818-01-01", editora: "Darkside Books", notaMediaLeitores: 4.6 },
    { id: "18", autorId: "18", titulo: "Drácula", genero: "Terror Gótico", edicao: "Edição de Luxo", precoMedio: 51.90, quantidadeVendas: 12000000, dataLancamento: "1897-05-26", editora: "Zahar", notaMediaLeitores: 4.7 },
    { id: "19", autorId: "19", titulo: "Moby Dick", genero: "Aventura", edicao: "Edição Marítima", precoMedio: 68.00, quantidadeVendas: 5000000, dataLancamento: "1851-10-18", editora: "Editora 34", notaMediaLeitores: 4.3 },
    { id: "20", autorId: "20", titulo: "Ulisses", genero: "Modernismo", edicao: "Modernista", precoMedio: 95.00, quantidadeVendas: 6000000, dataLancamento: "1922-02-02", editora: "Penguin", notaMediaLeitores: 3.9 },
    { id: "21", autorId: "21", titulo: "A Divina Comédia", genero: "Poema Épico", edicao: "Edição Bilíngue", precoMedio: 110.00, quantidadeVendas: 100000000, dataLancamento: "1320-01-01", editora: "Editora 34", notaMediaLeitores: 4.8 },
    { id: "22", autorId: "22", titulo: "Hamlet", genero: "Tragédia", edicao: "Teatral", precoMedio: 33.00, quantidadeVendas: 400000000, dataLancamento: "1603-01-01", editora: "L&PM", notaMediaLeitores: 4.7 },
    { id: "23", autorId: "23", titulo: "O Morro dos Ventos Uivantes", genero: "Romance Gótico", edicao: "Capa Comum", precoMedio: 47.80, quantidadeVendas: 10000000, dataLancamento: "1847-12-01", editora: "Zahar", notaMediaLeitores: 4.6 },
    { id: "24", autorId: "2", titulo: "A Revolução dos Bichos", genero: "Sátira Política", edicao: "Edição de Bolso", precoMedio: 28.50, quantidadeVendas: 20000000, dataLancamento: "1945-08-17", editora: "Companhia das Letras", notaMediaLeitores: 4.8 },
    { id: "25", autorId: "11", titulo: "O Processo", genero: "Ficção Absurda", edicao: "Standard", precoMedio: 38.00, quantidadeVendas: 8000000, dataLancamento: "1925-01-01", editora: "Companhia de Bolso", notaMediaLeitores: 4.5 },
    { id: "26", autorId: "24", titulo: "Os Miseráveis", genero: "Ficção Histórica", edicao: "Completa", precoMedio: 130.00, quantidadeVendas: 70000000, dataLancamento: "1862-01-01", editora: "Martin Claret", notaMediaLeitores: 4.9 },
    { id: "27", autorId: "25", titulo: "O Retrato de Dorian Gray", genero: "Ficção Filosófica", edicao: "Capa Dura", precoMedio: 49.00, quantidadeVendas: 10000000, dataLancamento: "1890-07-01", editora: "Zahar", notaMediaLeitores: 4.7 },
    { id: "28", autorId: "26", titulo: "As Vinhas da Ira", genero: "Ficção Social", edicao: "Clássicos", precoMedio: 62.00, quantidadeVendas: 15000000, dataLancamento: "1939-04-14", editora: "Record", notaMediaLeitores: 4.6 },
    { id: "29", autorId: "27", titulo: "Lolita", genero: "Ficção", edicao: "Controversa", precoMedio: 58.00, quantidadeVendas: 50000000, dataLancamento: "1955-09-18", editora: "Alfaguara", notaMediaLeitores: 4.1 },
    { id: "30", autorId: "28", titulo: "O Som e a Fúria", genero: "Modernismo", edicao: "Modernista", precoMedio: 61.50, quantidadeVendas: 6000000, dataLancamento: "1929-10-07", editora: "Companhia das Letras", notaMediaLeitores: 4.2 },
    { id: "31", autorId: "29", titulo: "A Náusea", genero: "Ficção Filosófica", edicao: "Existencialista", precoMedio: 46.00, quantidadeVendas: 7000000, dataLancamento: "1938-04-01", editora: "Nova Fronteira", notaMediaLeitores: 4.4 },
    { id: "32", autorId: "30", titulo: "O Estrangeiro", genero: "Ficção Filosófica", edicao: "Capa Comum", precoMedio: 41.00, quantidadeVendas: 10000000, dataLancamento: "1942-05-19", editora: "Record", notaMediaLeitores: 4.6 },
    { id: "33", autorId: "31", titulo: "Grande Sertão: Veredas", genero: "Modernismo Brasileiro", edicao: "Brasileira", precoMedio: 85.00, quantidadeVendas: 500000, dataLancamento: "1956-05-22", editora: "Companhia das Letras", notaMediaLeitores: 4.8 },
    { id: "34", autorId: "32", titulo: "Memórias Póstumas de Brás Cubas", genero: "Realismo", edicao: "Clássicos Nacionais", precoMedio: 34.90, quantidadeVendas: 2000000, dataLancamento: "1881-01-01", editora: "Antofágica", notaMediaLeitores: 4.9 },
    { id: "35", autorId: "33", titulo: "Vidas Secas", genero: "Modernismo Brasileiro", edicao: "Modernista", precoMedio: 39.90, quantidadeVendas: 1500000, dataLancamento: "1938-08-11", editora: "Record", notaMediaLeitores: 4.7 },
    { id: "36", autorId: "34", titulo: "A Hora da Estrela", genero: "Ficção", edicao: "Intimista", precoMedio: 43.00, quantidadeVendas: 1000000, dataLancamento: "1977-10-14", editora: "Rocco", notaMediaLeitores: 4.5 },
    { id: "37", autorId: "35", titulo: "O Alquimista", genero: "Autoajuda", edicao: "Internacional", precoMedio: 39.90, quantidadeVendas: 65000000, dataLancamento: "1988-01-01", editora: "Sextante", notaMediaLeitores: 4.3 },
    { id: "38", autorId: "36", titulo: "Admirável Mundo Novo", genero: "Distopia", edicao: "Capa Dura", precoMedio: 53.00, quantidadeVendas: 20000000, dataLancamento: "1932-08-30", editora: "Globo Livros", notaMediaLeitores: 4.7 },
    { id: "39", autorId: "6", titulo: "O Hobbit", genero: "Fantasia", edicao: "Infantil", precoMedio: 49.90, quantidadeVendas: 100000000, dataLancamento: "1937-09-21", editora: "HarperCollins", notaMediaLeitores: 4.8 },
    { id: "40", autorId: "37", titulo: "As Crônicas de Nárnia", genero: "Fantasia", edicao: "Volume Único", precoMedio: 99.00, quantidadeVendas: 100000000, dataLancamento: "1956-10-16", editora: "WMF Martins Fontes", notaMediaLeitores: 4.8 },
    { id: "41", autorId: "38", titulo: "O Conto da Aia", genero: "Distopia", edicao: "Contemporânea", precoMedio: 54.50, quantidadeVendas: 8000000, dataLancamento: "1985-03-04", editora: "Rocco", notaMediaLeitores: 4.6 },
    { id: "42", autorId: "39", titulo: "Duna", genero: "Ficção Científica", edicao: "Ficção Científica", precoMedio: 79.90, quantidadeVendas: 20000000, dataLancamento: "1965-08-01", editora: "Aleph", notaMediaLeitores: 4.9 },
    { id: "43", autorId: "40", titulo: "Eu, Robô", genero: "Ficção Científica", edicao: "Clássicos da Ficção", precoMedio: 47.00, quantidadeVendas: 5000000, dataLancamento: "1950-12-02", editora: "Aleph", notaMediaLeitores: 4.7 },
    { id: "44", autorId: "41", titulo: "O Guia do Mochileiro das Galáxias", genero: "Ficção Científica Cômica", edicao: "Nerd", precoMedio: 42.42, quantidadeVendas: 20000000, dataLancamento: "1979-10-12", editora: "Sextante", notaMediaLeitores: 4.8 },
    { id: "45", autorId: "42", titulo: "Coraline", genero: "Fantasia Sombria", edicao: "Ilustrada", precoMedio: 55.00, quantidadeVendas: 10000000, dataLancamento: "2002-07-02", editora: "Intrínseca", notaMediaLeitores: 4.7 },
    { id: "46", autorId: "43", titulo: "A Menina que Roubava Livros", genero: "Ficção Histórica", edicao: "Best-seller", precoMedio: 49.90, quantidadeVendas: 16000000, dataLancamento: "2005-03-14", editora: "Intrínseca", notaMediaLeitores: 4.8 },
    { id: "47", autorId: "44", titulo: "Sapiens: Uma Breve História da Humanidade", genero: "Não-ficção", edicao: "Não-ficção", precoMedio: 69.90, quantidadeVendas: 23000000, dataLancamento: "2011-01-01", editora: "L&PM", notaMediaLeitores: 4.9 },
    { id: "48", autorId: "45", titulo: "O Poder do Hábito", genero: "Não-ficção", edicao: "Negócios", precoMedio: 62.90, quantidadeVendas: 10000000, dataLancamento: "2012-02-28", editora: "Objetiva", notaMediaLeitores: 4.7 },
    { id: "49", autorId: "46", titulo: "Mindset", genero: "Não-ficção", edicao: "Psicologia", precoMedio: 57.90, quantidadeVendas: 6000000, dataLancamento: "2006-02-26", editora: "Objetiva", notaMediaLeitores: 4.6 },
    { id: "50", autorId: "47", titulo: "O Sol Também se Levanta", genero: "Ficção", edicao: "Geração Perdida", precoMedio: 51.00, quantidadeVendas: 3000000, dataLancamento: "1926-10-22", editora: "Bertrand Brasil", notaMediaLeitores: 4.4 },
    { id: "51", autorId: "48", titulo: "A Guerra dos Tronos", genero: "Fantasia", edicao: "Crônicas de Gelo e Fogo", precoMedio: 65.50, quantidadeVendas: 90000000, dataLancamento: "1996-08-06", editora: "Suma", notaMediaLeitores: 4.8 },
    { id: "52", autorId: "49", titulo: "Harry Potter e a Pedra Filosofal", genero: "Fantasia", edicao: "Capa Dura", precoMedio: 59.90, quantidadeVendas: 500000000, dataLancamento: "1997-06-26", editora: "Rocco", notaMediaLeitores: 4.9 },
    { id: "53", autorId: "50", titulo: "O Iluminado", genero: "Terror", edicao: "Clássicos do Horror", precoMedio: 62.00, quantidadeVendas: 20000000, dataLancamento: "1977-01-28", editora: "Suma", notaMediaLeitores: 4.7 },
    { id: "54", autorId: "51", titulo: "O Assassinato no Expresso do Oriente", genero: "Mistério", edicao: "Hercule Poirot", precoMedio: 45.00, quantidadeVendas: 100000000, dataLancamento: "1934-01-01", editora: "L&PM", notaMediaLeitores: 4.8 },
    { id: "55", autorId: "52", titulo: "Um Estudo em Vermelho", genero: "Mistério", edicao: "Sherlock Holmes", precoMedio: 38.00, quantidadeVendas: 60000000, dataLancamento: "1887-12-01", editora: "Zahar", notaMediaLeitores: 4.7 },
    { id: "56", autorId: "53", titulo: "Vinte Mil Léguas Submarinas", genero: "Aventura", edicao: "Viagens Extraordinárias", precoMedio: 49.90, quantidadeVendas: 30000000, dataLancamento: "1870-03-20", editora: "Principis", notaMediaLeitores: 4.6 },
    { id: "57", autorId: "54", titulo: "A Máquina do Tempo", genero: "Ficção Científica", edicao: "Clássicos", precoMedio: 35.00, quantidadeVendas: 15000000, dataLancamento: "1895-01-01", editora: "Alfaguara", notaMediaLeitores: 4.5 },
    { id: "58", autorId: "55", titulo: "Androides Sonham com Ovelhas Elétricas?", genero: "Ficção Científica", edicao: "Cyberpunk", precoMedio: 55.00, quantidadeVendas: 10000000, dataLancamento: "1968-01-01", editora: "Aleph", notaMediaLeitores: 4.8 },
    { id: "59", autorId: "56", titulo: "Neuromancer", genero: "Ficção Científica", edicao: "Cyberpunk", precoMedio: 60.00, quantidadeVendas: 6500000, dataLancamento: "1984-07-01", editora: "Aleph", notaMediaLeitores: 4.7 },
    { id: "60", autorId: "58", titulo: "O Chamado de Cthulhu", genero: "Terror Cósmico", edicao: "Contos", precoMedio: 48.00, quantidadeVendas: 5000000, dataLancamento: "1928-02-01", editora: "Darkside Books", notaMediaLeitores: 4.8 },
    { id: "61", autorId: "59", titulo: "O Corvo", genero: "Poema Gótico", edicao: "Poesia", precoMedio: 29.90, quantidadeVendas: 20000000, dataLancamento: "1845-01-29", editora: "L&PM", notaMediaLeitores: 4.9 },
    { id: "62", autorId: "60", titulo: "Mrs Dalloway", genero: "Modernismo", edicao: "Fluxo de Consciência", precoMedio: 52.00, quantidadeVendas: 4000000, dataLancamento: "1925-05-14", editora: "L&PM", notaMediaLeitores: 4.3 },
    { id: "63", autorId: "61", titulo: "O Segundo Sexo", genero: "Não-ficção", edicao: "Filosofia Feminista", precoMedio: 89.00, quantidadeVendas: 2000000, dataLancamento: "1949-06-24", editora: "Nova Fronteira", notaMediaLeitores: 4.9 },
    { id: "64", autorId: "62", titulo: "Ficções", genero: "Contos", edicao: "Clássicos Latinos", precoMedio: 47.00, quantidadeVendas: 3000000, dataLancamento: "1944-01-01", editora: "Companhia das Letras", notaMediaLeitores: 4.8 },
    { id: "65", autorId: "63", titulo: "O Jogo da Amarelinha", genero: "Romance Experimental", edicao: "Contracultura", precoMedio: 72.00, quantidadeVendas: 2500000, dataLancamento: "1963-06-28", editora: "Companhia das Letras", notaMediaLeitores: 4.4 },
    { id: "66", autorId: "64", titulo: "A Cidade e os Cachorros", genero: "Ficção", edicao: "Boom Latino-americano", precoMedio: 58.00, quantidadeVendas: 1500000, dataLancamento: "1963-01-01", editora: "Alfaguara", notaMediaLeitores: 4.5 },
    { id: "67", autorId: "65", titulo: "A Casa dos Espíritos", genero: "Realismo Mágico", edicao: "Capa Dura", precoMedio: 68.00, quantidadeVendas: 10000000, dataLancamento: "1982-01-01", editora: "Bertrand Brasil", notaMediaLeitores: 4.8 },
    { id: "68", autorId: "66", titulo: "A Sombra do Vento", genero: "Mistério", edicao: "O Cemitério dos Livros Esquecidos", precoMedio: 75.00, quantidadeVendas: 15000000, dataLancamento: "2001-01-01", editora: "Suma", notaMediaLeitores: 4.9 },
    { id: "69", autorId: "67", titulo: "A Amiga Genial", genero: "Ficção", edicao: "Série Napolitana", precoMedio: 54.00, quantidadeVendas: 10000000, dataLancamento: "2011-01-01", editora: "Biblioteca Azul", notaMediaLeitores: 4.7 },
    { id: "70", autorId: "68", titulo: "1Q84", genero: "Ficção Surrealista", edicao: "Volume Único", precoMedio: 99.00, quantidadeVendas: 8000000, dataLancamento: "2009-05-29", editora: "Alfaguara", notaMediaLeitores: 4.6 },
    { id: "71", autorId: "69", titulo: "Não me Abandone Jamais", genero: "Distopia", edicao: "Ficção Literária", precoMedio: 57.00, quantidadeVendas: 3000000, dataLancamento: "2005-04-05", editora: "Companhia das Letras", notaMediaLeitores: 4.5 },
    { id: "72", autorId: "70", titulo: "Americanah", genero: "Ficção", edicao: "Contemporânea", precoMedio: 63.00, quantidadeVendas: 2000000, dataLancamento: "2013-05-14", editora: "Companhia das Letras", notaMediaLeitores: 4.8 },
    { id: "73", autorId: "42", titulo: "Deuses Americanos", genero: "Fantasia Urbana", edicao: "Completa", precoMedio: 78.00, quantidadeVendas: 5000000, dataLancamento: "2001-06-19", editora: "Intrínseca", notaMediaLeitores: 4.7 },
    { id: "74", autorId: "50", titulo: "It: A Coisa", genero: "Terror", edicao: "Capa Dura", precoMedio: 95.00, quantidadeVendas: 15000000, dataLancamento: "1986-09-15", editora: "Suma", notaMediaLeitores: 4.8 },
    { id: "75", autorId: "49", titulo: "Harry Potter e a Câmara Secreta", genero: "Fantasia", edicao: "Capa Dura", precoMedio: 59.90, quantidadeVendas: 77000000, dataLancamento: "1998-07-02", editora: "Rocco", notaMediaLeitores: 4.8 },
    { id: "76", autorId: "48", titulo: "A Fúria dos Reis", genero: "Fantasia", edicao: "Crônicas de Gelo e Fogo", precoMedio: 65.50, quantidadeVendas: 50000000, dataLancamento: "1998-11-16", editora: "Suma", notaMediaLeitores: 4.7 },
    { id: "77", autorId: "32", titulo: "Dom Casmurro", genero: "Realismo", edicao: "Clássicos Nacionais", precoMedio: 32.00, quantidadeVendas: 3000000, dataLancamento: "1899-01-01", editora: "L&PM", notaMediaLeitores: 4.9 },
    { id: "78", autorId: "22", titulo: "Romeu e Julieta", genero: "Tragédia", edicao: "Teatral", precoMedio: 31.00, quantidadeVendas: 300000000, dataLancamento: "1597-01-01", editora: "Penguin", notaMediaLeitores: 4.7 },
    { id: "79", autorId: "53", titulo: "A Volta ao Mundo em 80 Dias", genero: "Aventura", edicao: "Viagens Extraordinárias", precoMedio: 42.00, quantidadeVendas: 25000000, dataLancamento: "1872-10-30", editora: "Zahar", notaMediaLeitores: 4.6 },
    { id: "80", autorId: "51", titulo: "E Não Sobrou Nenhum", genero: "Mistério", edicao: "Capa Dura", precoMedio: 48.00, quantidadeVendas: 100000000, dataLancamento: "1939-11-06", editora: "Globo Livros", notaMediaLeitores: 4.9 },
    { id: "81", autorId: "40", titulo: "A Trilogia de Fundação", genero: "Ficção Científica", edicao: "Clássicos da Ficção", precoMedio: 85.00, quantidadeVendas: 20000000, dataLancamento: "1951-05-01", editora: "Aleph", notaMediaLeitores: 4.9 },
    { id: "82", autorId: "6", titulo: "O Silmarillion", genero: "Fantasia", edicao: "Mitologia", precoMedio: 70.00, quantidadeVendas: 10000000, dataLancamento: "1977-09-15", editora: "HarperCollins", notaMediaLeitores: 4.6 },
    { id: "83", autorId: "10", titulo: "Razão e Sensibilidade", genero: "Romance", edicao: "Clássicos", precoMedio: 48.00, quantidadeVendas: 15000000, dataLancamento: "1811-10-30", editora: "Zahar", notaMediaLeitores: 4.7 },
    { id: "84", autorId: "36", titulo: "O Homem Invisível", genero: "Ficção Científica", edicao: "Clássicos", precoMedio: 39.90, quantidadeVendas: 10000000, dataLancamento: "1897-01-01", editora: "Principis", notaMediaLeitores: 4.4 },
    { id: "85", autorId: "39", titulo: "Messias de Duna", genero: "Ficção Científica", edicao: "Série Duna", precoMedio: 55.00, quantidadeVendas: 8000000, dataLancamento: "1969-01-01", editora: "Aleph", notaMediaLeitores: 4.7 },
    { id: "86", autorId: "47", titulo: "O Velho e o Mar", genero: "Ficção", edicao: "Clássicos Modernos", precoMedio: 35.00, quantidadeVendas: 12000000, dataLancamento: "1952-09-01", editora: "Bertrand Brasil", notaMediaLeitores: 4.6 },
    { id: "87", autorId: "15", titulo: "As Crônicas Marcianas", genero: "Ficção Científica", edicao: "Contos", precoMedio: 53.00, quantidadeVendas: 5000000, dataLancamento: "1950-05-04", editora: "Biblioteca Azul", notaMediaLeitores: 4.7 },
    { id: "88", autorId: "26", titulo: "Ratos e Homens", genero: "Ficção Social", edicao: "Capa Comum", precoMedio: 38.00, quantidadeVendas: 10000000, dataLancamento: "1937-02-06", editora: "L&PM", notaMediaLeitores: 4.5 },
    { id: "89", autorId: "50", titulo: "A Torre Negra: O Pistoleiro", genero: "Fantasia Sombria", edicao: "Série A Torre Negra", precoMedio: 52.00, quantidadeVendas: 7000000, dataLancamento: "1982-06-10", editora: "Suma", notaMediaLeitores: 4.6 },
    { id: "90", autorId: "42", titulo: "Sandman: Prelúdios e Noturnos", genero: "Graphic Novel", edicao: "Capa Dura", precoMedio: 85.00, quantidadeVendas: 12000000, dataLancamento: "1989-01-01", editora: "Panini", notaMediaLeitores: 4.9 },
    { id: "91", autorId: "55", titulo: "Ubik", genero: "Ficção Científica", edicao: "Clássicos", precoMedio: 54.00, quantidadeVendas: 3000000, dataLancamento: "1969-01-01", editora: "Suma", notaMediaLeitores: 4.6 },
    { id: "92", autorId: "70", titulo: "Meio Sol Amarelo", genero: "Ficção Histórica", edicao: "Contemporânea", precoMedio: 68.00, quantidadeVendas: 1500000, dataLancamento: "2006-08-01", editora: "Companhia das Letras", notaMediaLeitores: 4.8 },
    { id: "93", autorId: "69", titulo: "O Gigante Enterrado", genero: "Fantasia", edicao: "Ficção Literária", precoMedio: 61.00, quantidadeVendas: 1000000, dataLancamento: "2015-03-03", editora: "Companhia das Letras", notaMediaLeitores: 4.3 },
    { id: "94", autorId: "68", titulo: "Kafka à Beira-Mar", genero: "Realismo Mágico", edicao: "Capa Comum", precoMedio: 79.00, quantidadeVendas: 5000000, dataLancamento: "2002-09-12", editora: "Alfaguara", notaMediaLeitores: 4.7 },
    { id: "95", autorId: "34", titulo: "O Alienista", genero: "Sátira", edicao: "Contos", precoMedio: 28.00, quantidadeVendas: 1000000, dataLancamento: "1882-01-01", editora: "L&PM", notaMediaLeitores: 4.8 },
    { id: "96", autorId: "41", titulo: "A Odisseia", genero: "Poema Épico", edicao: "Tradução Direta", precoMedio: 65.00, quantidadeVendas: 50000000, dataLancamento: "800 a.C.", editora: "Editora 34", notaMediaLeitores: 4.7 },
    { id: "97", autorId: "1", titulo: "O Amor nos Tempos do Cólera", genero: "Romance", edicao: "Capa Comum", precoMedio: 58.00, quantidadeVendas: 10000000, dataLancamento: "1985-01-01", editora: "Record", notaMediaLeitores: 4.7 },
    { id: "98", autorId: "45", titulo: "Rápido e Devagar: Duas Formas de Pensar", genero: "Não-ficção", edicao: "Psicologia", precoMedio: 75.00, quantidadeVendas: 2000000, dataLancamento: "2011-10-25", editora: "Objetiva", notaMediaLeitores: 4.8 },
    { id: "99", autorId: "52", titulo: "O Cão dos Baskervilles", genero: "Mistério", edicao: "Sherlock Holmes", precoMedio: 41.00, quantidadeVendas: 15000000, dataLancamento: "1902-04-01", editora: "Zahar", notaMediaLeitores: 4.8 },
    { id: "100", autorId: "25", titulo: "A Importância de Ser Prudente", genero: "Comédia", edicao: "Teatro", precoMedio: 35.00, quantidadeVendas: 8000000, dataLancamento: "1895-02-14", editora: "L&PM", notaMediaLeitores: 4.6 },
];


// 3. RESOLVERS
// Aqui definimos COMO buscar os dados, incluindo as relações entre eles.
const resolvers = {
  // Resolvers para as queries principais
  Query: {
    livros: () => livros,
    livro: (parent, args) => livros.find(livro => livro.id === args.id),
    autores: () => autores,
    autor: (parent, args) => autores.find(autor => autor.id === args.id),
  },

  // Resolvers para os campos aninhados (a "mágica" do grafo)
  Livro: {
    // Quando uma query pedir o campo "autor" dentro de um "Livro"...
    autor: (parent) => {
      // ... o 'parent' é o objeto Livro. Usamos seu 'autorId' para encontrar o autor correspondente.
      return autores.find(autor => autor.id === parent.autorId);
    }
  },

  Autor: {
    // Quando uma query pedir o campo "livros" dentro de um "Autor"...
    livros: (parent) => {
      // ... o 'parent' é o objeto Autor. Filtramos a lista de livros para achar todos que pertencem a ele.
      return livros.filter(livro => livro.autorId === parent.id);
    }
  }
};


// 4. CONFIGURAÇÃO E INICIALIZAÇÃO DO SERVIDOR
async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀 Servidor pronto em: ${url}`);
}

startServer();