-- CATEGORIAS
INSERT INTO categoria (id, nome, descricao) VALUES (1, 'Alfabetização e Números', 'Brinquedos que auxiliam no aprendizado das letras e numerais de forma tátil e divertida.');
INSERT INTO categoria (id, nome, descricao) VALUES (2, 'Quebra-Cabeças', 'Desafios lógicos em EVA macio para desenvolver a coordenação motora e raciocínio.');
INSERT INTO categoria (id, nome, descricao) VALUES (3, 'Tapetes e Tatames', 'Áreas de lazer seguras e coloridas para proteger os pequenos durante as brincadeiras.');
INSERT INTO categoria (id, nome, descricao) VALUES (4, 'Jogos de Memória', 'Estimule a concentração e a memória com peças temáticas e resistentes.');
INSERT INTO categoria (id, nome, descricao) VALUES (5, 'Faz de Conta', 'Cozinhas, ferramentas e acessórios em EVA para estimular a imaginação e a criatividade.');
INSERT INTO categoria (id, nome, descricao) VALUES (6, 'Banho Divertido', 'Brinquedos que grudam no azulejo quando molhados, tornando a hora do banho uma festa.');
INSERT INTO categoria (id, nome, descricao) VALUES (7, 'Montagem 3D', 'Blocos e peças para construir estruturas tridimensionais, desenvolvendo a noção espacial.');
INSERT INTO categoria (id, nome, descricao) VALUES (8, 'Esportes e Lazer', 'Bolas, boliches e itens de atividade física seguros para brincar dentro de casa.');
INSERT INTO categoria (id, nome, descricao) VALUES (9, 'Veículos e Carrinhos', 'Carrinhos, aviões, barcos e pistas de corrida em EVA, leves e totalmente seguros para os pequenos pilotos.');
INSERT INTO categoria (id, nome, descricao) VALUES (10, 'Bolas e Esportes', 'Bolas macias e conjuntos esportivos ideais para brincadeiras dinâmicas sem risco de quebrar nada em casa.');
INSERT INTO categoria (id, nome, descricao) VALUES (11, 'Bonecos e Bonecas', 'Personagens articulados e companheiros de aventura feitos com material atóxico e toque suave.');
INSERT INTO categoria (id, nome, descricao) VALUES (12, 'Instrumentos Musicais', 'Xilofones, tambores e chocalhos lúdicos para despertar o ritmo e o amor pela música desde cedo.');
INSERT INTO categoria (id, nome, descricao) VALUES (13, 'Animais e Natureza', 'Conjuntos de animais da fazenda, selva e dinossauros para ensinar sobre o meio ambiente brincando.');
INSERT INTO categoria (id, nome, descricao) VALUES (14, 'Construção e Blocos', 'Blocos de empilhar e encaixar que desafiam a gravidade e desenvolvem o foco e a paciência.');
INSERT INTO categoria (id, nome, descricao) VALUES (15, 'Fantasia e Acessórios', 'Coroas, espadas, escudos e máscaras para transformar qualquer tarde em um reino encantado.');
INSERT INTO categoria (id, nome, descricao) VALUES (16, 'Artes e Pintura', 'Kits de carimbos, moldes e telas em EVA para os pequenos artistas expressarem sua genialidade.');
INSERT INTO categoria (id, nome, descricao) VALUES (17, 'Jogos de Tabuleiro', 'Jogos de tabuleiro para jogar com toda a família e amigos.');

-- MARCAS
INSERT INTO marca (id, nome, logo_url) VALUES (1, 'Estrela', 'https://res.cloudinary.com/dk7bgyams/image/upload/v1775702857/pjnaujv2vbzmqltup9fg.webp');
INSERT INTO marca (id, nome, logo_url) VALUES (2, 'HotWheels', 'https://res.cloudinary.com/dk7bgyams/image/upload/v1775587620/lzuywrcwpwjdtyjcuo4o.png');
INSERT INTO marca (id, nome, logo_url) VALUES (3, 'Lego', 'https://res.cloudinary.com/dk7bgyams/image/upload/v1775587591/rs4kiwtfasxqiyxita1x.png');
INSERT INTO marca (id, nome, logo_url) VALUES (4, 'Play-Doh', 'https://res.cloudinary.com/dk7bgyams/image/upload/v1775587650/fcnm0ympfovxxrggn8us.jpg');
INSERT INTO marca (id, nome, logo_url) VALUES (5, 'Barbie', 'https://res.cloudinary.com/dk7bgyams/image/upload/v1775703402/barbielogo_gqjy0n.png');

-- BRINQUEDOS E SUAS IMAGENS

-- Brinquedo 1
INSERT INTO brinquedo (id, nome_brinquedo, descricao, valor, quantidade_estoque, desconto, destacar, idade_recomendada, categoria_id, marca_id, data_cadastro) VALUES (1, 'Lava Rápido HotWheels', 'Lava rápido super maneiro com carros irados!.', 250.00, 20, 0.0, 1, 'Crianças: 3-5 anos', 9, 2, NOW());
INSERT INTO brinquedo_imagens (brinquedo_id, imagens) VALUES (1, 'https://res.cloudinary.com/dk7bgyams/image/upload/v1775705742/D_NQ_NP_617823-MLB76105389629_042024-O_ksb60z.webp');
INSERT INTO brinquedo_imagens (brinquedo_id, imagens) VALUES (1, 'https://res.cloudinary.com/dk7bgyams/image/upload/v1775705743/61x13cBC5wL._AC_UF894_1000_QL80__rvdcpp.jpg');

-- Brinquedo 2
INSERT INTO brinquedo (id, nome_brinquedo, descricao, valor, quantidade_estoque, desconto, destacar, idade_recomendada, categoria_id, marca_id, data_cadastro) VALUES (2, 'MonsterTruck Shark HotWheels', 'O caminhão monster truck mais assustador dos sete mares!.', 50.00, 15, 10.0, 0, 'Bebês: 1-2 anos', 9, 2, NOW());
INSERT INTO brinquedo_imagens (brinquedo_id, imagens) VALUES (2, 'https://res.cloudinary.com/dk7bgyams/image/upload/v1775705832/ko3912h37he9h69lsacr_66439d96-83be-4d49-9292-6a432beafa90_qpzalo.jpg');
INSERT INTO brinquedo_imagens (brinquedo_id, imagens) VALUES (2, 'https://res.cloudinary.com/dk7bgyams/image/upload/v1775705835/image-0_sepf0h.jpg');

-- Brinquedo 3
INSERT INTO brinquedo (id, nome_brinquedo, descricao, valor, quantidade_estoque, desconto, destacar, idade_recomendada, categoria_id, marca_id, data_cadastro) VALUES (3, 'Pista Ataque Dinossauro HotWheels', 'Pista super radical com dinossauro assustador ai que medo!.', 150.00, 10, 30.0, 1, 'Crianças: 3-5 anos', 9, 2, NOW());
INSERT INTO brinquedo_imagens (brinquedo_id, imagens) VALUES (3, 'https://res.cloudinary.com/dk7bgyams/image/upload/v1775705937/Hot-Wheels-City-Pista-T-Rex-Devorador---Mattel-1_cd3fbe.jpg');

-- Brinquedo 4
INSERT INTO brinquedo (id, nome_brinquedo, descricao, valor, quantidade_estoque, desconto, destacar, idade_recomendada, categoria_id, marca_id, data_cadastro) VALUES (4, 'Aquaplay Estrela', 'Se divirta tentando acertar as argolas!', 78.00, 90, 0.0, 1, 'Para todas as idades', 6, 1, NOW());
INSERT INTO brinquedo_imagens (brinquedo_id, imagens) VALUES (4, 'https://res.cloudinary.com/dk7bgyams/image/upload/v1775706275/CAIXA_AQUAPLAY-PRODUTO-ALTA_jqjxqf.jpg');

-- Brinquedo 5
INSERT INTO brinquedo (id, nome_brinquedo, descricao, valor, quantidade_estoque, desconto, destacar, idade_recomendada, categoria_id, marca_id, data_cadastro) VALUES (5, 'Jogo da Vida Estrela', 'Simule sua vida no jogo da vida!', 200.00, 52, 15.0, 1, 'Adolescentes: 13-17 anos', 17, 1, NOW());
INSERT INTO brinquedo_imagens (brinquedo_id, imagens) VALUES (5, 'https://res.cloudinary.com/dk7bgyams/image/upload/v1775706429/1011350-00_ytutok.jpg');
INSERT INTO brinquedo_imagens (brinquedo_id, imagens) VALUES (5, 'https://res.cloudinary.com/dk7bgyams/image/upload/v1775706433/jogo_da_vida_brinquedos_estrela_93012041_2_b7d7376dcde4213340518ca964ae4da7_nbtny8.jpg');

-- Brinquedo 6
INSERT INTO brinquedo (id, nome_brinquedo, descricao, valor, quantidade_estoque, desconto, destacar, idade_recomendada, categoria_id, marca_id, data_cadastro) VALUES (6, 'Pula Pirata Estrela', 'Pula!', 60.00, 50, 0.0, 0, 'Adolescentes: 13-17 anos', 7, 1, NOW());
INSERT INTO brinquedo_imagens (brinquedo_id, imagens) VALUES (6, 'https://res.cloudinary.com/dk7bgyams/image/upload/v1775706766/4119GttlY4L._AC_UF894_1000_QL80__k3h2m5.jpg');
INSERT INTO brinquedo_imagens (brinquedo_id, imagens) VALUES (6, 'https://res.cloudinary.com/dk7bgyams/image/upload/v1775706767/8060225_k6ezlb.jpg');

-- Brinquedo 7
INSERT INTO brinquedo (id, nome_brinquedo, descricao, valor, quantidade_estoque, desconto, destacar, idade_recomendada, categoria_id, marca_id, data_cadastro) VALUES (7, 'Lego Millenium Falcon', 'Minuatura do veículo millenium falcon da saga Star Wars.', 600.00, 20, 0.0, 1, 'Adolescentes: 13-17 anos', 14, 3, NOW());
INSERT INTO brinquedo_imagens (brinquedo_id, imagens) VALUES (7, 'https://res.cloudinary.com/dk7bgyams/image/upload/v1775706906/81PhO-kyPuL._AC_UF894_1000_QL80__cj0lr8.jpg');
INSERT INTO brinquedo_imagens (brinquedo_id, imagens) VALUES (7, 'https://res.cloudinary.com/dk7bgyams/image/upload/v1775706910/75192_alt28_uxjl2w.jpg');

-- Brinquedo 8
INSERT INTO brinquedo (id, nome_brinquedo, descricao, valor, quantidade_estoque, desconto, destacar, idade_recomendada, categoria_id, marca_id, data_cadastro) VALUES (8, 'Lego Titanic', 'Uma das maiores tragédias em alto mar muito triste.', 399.99, 1, 10.0, 1, 'Adolescentes: 13-17 anos', 14, 3, NOW());
INSERT INTO brinquedo_imagens (brinquedo_id, imagens) VALUES (8, 'https://res.cloudinary.com/dk7bgyams/image/upload/v1775707101/10294_alt13_cjlhy9.jpg');
INSERT INTO brinquedo_imagens (brinquedo_id, imagens) VALUES (8, 'https://res.cloudinary.com/dk7bgyams/image/upload/v1775707105/10294_Prod_siynyj.jpg');

-- Brinquedo 9
INSERT INTO brinquedo (id, nome_brinquedo, descricao, valor, quantidade_estoque, desconto, destacar, idade_recomendada, categoria_id, marca_id, data_cadastro) VALUES (9, 'Lego Noite Estrelada', 'Uma das maiores pinturas muito bonita uau.', 210.50, 13, 0.0, 0, 'Adolescentes: 13-17 anos', 14, 3, NOW());
INSERT INTO brinquedo_imagens (brinquedo_id, imagens) VALUES (9, 'https://res.cloudinary.com/dk7bgyams/image/upload/v1775707177/81n1a0P_yyL_mbeeyc.jpg');

-- Brinquedo 10
INSERT INTO brinquedo (id, nome_brinquedo, descricao, valor, quantidade_estoque, desconto, destacar, idade_recomendada, categoria_id, marca_id, data_cadastro) VALUES (10, 'Massinha Verde-Neon Play-Doh', 'Solte a imaginação com essa incrível massinha Play-Doh!', 14.90, 200, 20.0, 1, 'Crianças: 3-5 anos', 7, 4, NOW());
INSERT INTO brinquedo_imagens (brinquedo_id, imagens) VALUES (10, 'https://res.cloudinary.com/dk7bgyams/image/upload/v1775707399/5ada0bbf1e0000771b7b213b_lynbkk.jpg');

-- Brinquedo 11
INSERT INTO brinquedo (id, nome_brinquedo, descricao, valor, quantidade_estoque, desconto, destacar, idade_recomendada, categoria_id, marca_id, data_cadastro) VALUES (11, 'Barbie - Filme: Barbie', 'Boneca Barbie do Filme da Boneca Barbie a Boneca!', 500.00, 20, 0.0, 1, 'Crianças: 3-5 anos', 11, 5, NOW());
INSERT INTO brinquedo_imagens (brinquedo_id, imagens) VALUES (11, 'https://res.cloudinary.com/dk7bgyams/image/upload/v1775707579/71_I3hfh5mL_zrkzqc.jpg');

-- Brinquedo 12
INSERT INTO brinquedo (id, nome_brinquedo, descricao, valor, quantidade_estoque, desconto, destacar, idade_recomendada, categoria_id, marca_id, data_cadastro) VALUES (12, 'Casa da Barbie', 'Casa da Boneca Barbie.', 100.00, 20, 0.0, 0, 'Crianças: 3-5 anos', 11, 5, NOW());
INSERT INTO brinquedo_imagens (brinquedo_id, imagens) VALUES (12, 'https://res.cloudinary.com/dk7bgyams/image/upload/v1775707611/7c61a0dc-9a8d-451a-abc2-66acd377bd7d.af7f7b8b90199ae3f0179512f3f0e426_cj1coy.jpg');
INSERT INTO brinquedo_imagens (brinquedo_id, imagens) VALUES (12, 'https://res.cloudinary.com/dk7bgyams/image/upload/v1775707614/Barbie-Cook-n-Grill-Restaurant-Playset-with-30-Pieces-Gift-for-3-to-7-Year-Olds_75702d38-1fd3-4a7e-9e92-f525206bf6a1.866de97242bf24467a25f14c308d49fd_r1uimd.jpg');

-- Brinquedo 13
INSERT INTO brinquedo (id, nome_brinquedo, descricao, valor, quantidade_estoque, desconto, destacar, idade_recomendada, categoria_id, marca_id, data_cadastro) VALUES (13, 'Barbie Escaladora', 'Boneca Barbie que ama escalar uma montanha.', 110.00, 20, 20.0, 0, 'Crianças: 3-5 anos', 11, 5, NOW());
INSERT INTO brinquedo_imagens (brinquedo_id, imagens) VALUES (13, 'https://res.cloudinary.com/dk7bgyams/image/upload/v1775707718/81W_V-VScS_umxsv4.jpg');
INSERT INTO brinquedo_imagens (brinquedo_id, imagens) VALUES (13, 'https://res.cloudinary.com/dk7bgyams/image/upload/v1775707722/61BinWX6VLS._AC_UF894_1000_QL80__xrxc9n.jpg');