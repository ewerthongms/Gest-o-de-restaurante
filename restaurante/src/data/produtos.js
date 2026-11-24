export const CATEGORIAS = [
  {
    "id": "hamburguers",
    "titulo": "Hambúrguer Clássico",
    "img": "hamburguer.webp",
    "opcoes": [
      {
        "id": "hamburguers:x-bacon",
        "nome": "X-Bacon",
        "preco": 27.9
      },
      {
        "id": "hamburguers:x-salada",
        "nome": "X-Salada",
        "preco": 22.9
      },
      {
        "id": "hamburguers:x-egg",
        "nome": "X-Egg",
        "preco": 24.9
      }
    ]
  },
  {
    "id": "pratos",
    "titulo": "Prato do Dia",
    "img": "prato.avif",
    "opcoes": [
      {
        "id": "pratos:mineiro",
        "nome": "Mineiro",
        "preco": 38.5
      },
      {
        "id": "pratos:arroz-carreteiro",
        "nome": "Arroz Carreteiro",
        "preco": 36.0
      },
      {
        "id": "pratos:moda-da-casa",
        "nome": "Moda da Casa",
        "preco": 40.0
      }
    ]
  },
  {
    "id": "pasteis",
    "titulo": "Pastel de Carne",
    "img": "pastel.jpg",
    "opcoes": [
      {
        "id": "pasteis:frango-catupiry",
        "nome": "Frango Catupiry",
        "preco": 13.5
      },
      {
        "id": "pasteis:costela",
        "nome": "Costela",
        "preco": 15.0
      },
      {
        "id": "pasteis:carne-seca",
        "nome": "Carne Seca",
        "preco": 14.5
      }
    ]
  },
  {
    "id": "saladas",
    "titulo": "Salada Mista",
    "img": "salada.jpg",
    "opcoes": [
      {
        "id": "saladas:salada-de-frutas",
        "nome": "Salada de Frutas",
        "preco": 19.9
      },
      {
        "id": "saladas:folhas-verdes",
        "nome": "Folhas Verdes",
        "preco": 17.5
      },
      {
        "id": "saladas:graos",
        "nome": "Grãos",
        "preco": 21.0
      }
    ]
  },
  {
    "id": "espetos",
    "titulo": "Espetos",
    "img": "espeto.jpg",
    "opcoes": [
      {
        "id": "espetos:kafta",
        "nome": "Kafta",
        "preco": 16.0
      },
      {
        "id": "espetos:carne-queijo-bacon",
        "nome": "Carne, Queijo e Bacon",
        "preco": 18.5
      },
      {
        "id": "espetos:coracao-galinha",
        "nome": "Coração de Galinha",
        "preco": 14.0
      }
    ]
  },
  {
    "id": "hotdog",
    "titulo": "Hot Dog Especial",
    "img": "hotdog.avif",
    "opcoes": [
      {
        "id": "hotdog:hotdog-simples",
        "nome": "Hotdog Simples",
        "preco": 21.9
      },
      {
        "id": "hotdog:hotdog-duplo",
        "nome": "Hotdog Duplo",
        "preco": 26.9
      },
      {
        "id": "hotdog:hotdog-especial",
        "nome": "Hotdog Especial",
        "preco": 31.9
      }
    ]
  },
  {
    "id": "especial",
    "titulo": "Especial Da Casa",
    "img": "especial.avif",
    "opcoes": [
      {
        "id": "especial:moda-da-casa",
        "nome": "A Moda da Casa",
        "preco": 47.0
      },
      {
        "id": "especial:feijoada",
        "nome": "Feijoada",
        "preco": 44.9
      },
      {
        "id": "especial:lasanha",
        "nome": "Lasanha",
        "preco": 42.5
      }
    ]
  },
  {
    "id": "sucos",
    "titulo": "Suco Natural",
    "img": "suco.jpg",
    "opcoes": [
      {
        "id": "sucos:laranja",
        "nome": "Laranja",
        "preco": 11.0
      },
      {
        "id": "sucos:goiaba",
        "nome": "Goiaba",
        "preco": 11.0
      },
      {
        "id": "sucos:morango",
        "nome": "Morango",
        "preco": 12.5
      }
    ]
  },
  {
    "id": "vinhos",
    "titulo": "Vinho Tinto",
    "img": "vinhos.jpg",
    "opcoes": [
      {
        "id": "vinhos:vinho-tinto",
        "nome": "Vinho Tinto",
        "preco": 84.9
      },
      {
        "id": "vinhos:vinho-branco",
        "nome": "Vinho Branco",
        "preco": 79.9
      },
      {
        "id": "vinhos:vinho-rose",
        "nome": "Vinho Rosé",
        "preco": 82.0
      }
    ]
  },
  {
    "id": "refrigerantes",
    "titulo": "Refrigerante Lata",
    "img": "refrigerantes.webp",
    "opcoes": [
      {
        "id": "refrigerantes:coca-cola",
        "nome": "Coca-Cola",
        "preco": 7.5
      },
      {
        "id": "refrigerantes:guarana",
        "nome": "Guaraná",
        "preco": 6.5
      },
      {
        "id": "refrigerantes:fanta",
        "nome": "Fanta",
        "preco": 6.5
      }
    ]
  }
];

export const brl = (n) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
