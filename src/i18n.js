import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: localStorage.getItem("i18nextLng") || "pt",
    debug: true,
    // lng: "pt", // Removido para permitir detecção automática
    interpolation: {
      escapeValue: false,
    },
    resources: {
      pt: {
        translation: {
          faqs: [
            {
              question: "O que é o Linga Tchoss?",
              answer:
                "O Linga Tchoss é uma plataforma digital que conecta empresas e clientes em um único espaço. Farmácias, hospitais, escolas, transportes e outros serviços podem oferecer seus atendimentos e produtos diretamente aos usuários, com suporte a geolocalização e atendimento via WhatsApp.",
            },
            {
              question:
                "Como as empresas podem criar uma conta no Linga Tchoss?",
              answer:
                "O cadastro de empresas é feito manualmente pelo administrador da plataforma. Para solicitar a criação de uma conta, a instituição deve entrar em contato pelo WhatsApp disponível na seção “Contactos”. Após a verificação, o administrador criará o acesso e enviará os dados de login.",
            },
            {
              question: "Como os clientes utilizam o Linga Tchoss?",
              answer:
                "Os clientes podem procurar instituições, visualizar serviços disponíveis e entrar em contato diretamente pelo WhatsApp. Também podem solicitar entregas, marcar consultas ou pedir informações de forma rápida e prática.",
            },
            {
              question:
                "Posso marcar consultas ou solicitar serviços pelo WhatsApp?",
              answer:
                "Sim. O Linga Tchoss integra um assistente inteligente que entende sua mensagem e ajuda a marcar consultas, solicitar serviços ou tirar dúvidas diretamente pelo WhatsApp.",
            },
            {
              question: "O serviço tem custo para o cliente?",
              answer:
                "O acesso ao Linga Tchoss é totalmente gratuito para os clientes. Apenas as instituições que desejarem mais visibilidade ou recursos avançados poderão optar por planos pagos.",
            },
            {
              question: "Que tipos de serviços posso encontrar?",
              answer:
                "No Linga Tchoss você encontra serviços de saúde, educação, transportes, entregas, compras e muito mais. A plataforma é atualizada constantemente com novas empresas e setores.",
            },
            {
              question: "Como a plataforma protege meus dados?",
              answer:
                "O Linga Tchoss utiliza autenticação segura e criptografia para proteger os dados de usuários e empresas. Nenhuma informação é compartilhada sem consentimento e seguimos políticas de privacidade rigorosas.",
            },
            {
              question: "Posso alterar ou cancelar um pedido feito?",
              answer:
                "Sim. Você pode entrar em contato com a empresa diretamente pelo WhatsApp para alterar ou cancelar pedidos, conforme a política de cada instituição.",
            },
            {
              question: "Como relatar um problema técnico na plataforma?",
              answer:
                "Caso encontre algum problema técnico, vá até a seção “Contactos” e envie uma mensagem pelo WhatsApp. Nossa equipe de suporte verificará e solucionará o problema o mais rápido possível.",
            },
            {
              question: "O Linga Tchoss está disponível em todo o país?",
              answer:
                "Sim. Qualquer instituição pode ser adicionada, independentemente da província. O sistema utiliza geolocalização para exibir os serviços mais próximos de cada usuário.",
            },
          ],
          _faqs: "Perguntas Frequentes",
          _home: "Início",
          _services: "Serviços",
          _about: "Sobre",
          _companies: "Empresas",
          _contacts: "Contactos",
          innovation: "Inovação",
          innovation_desc:
            "Criamos soluções modernas que transformam a forma como pessoas e empresas se conectam e interagem todos os dias.",

          accessibility: "Acessibilidade",
          accessibility_desc:
            "Facilitamos o acesso aos serviços essenciais, tornando a tecnologia simples, útil e disponível para todos.",

          trust: "Confiança",
          trust_desc:
            "Valorizamos relações transparentes e seguras entre empresas e clientes, garantindo credibilidade e respeito.",

          digital_inclusion: "Inclusão Digital",
          digital_inclusion_desc:
            "Promovemos igualdade no acesso às ferramentas digitais, ajudando comunidades a crescer no ambiente online.",
          values_in_action: "Nossos Valores em Ação",
          about_title: "Sobre o Linga Tchoss",
          values_title: "Nossos valores",
          values_text:
            "No Linga Tchoss, acreditamos em quatro pilares fundamentais: Inovação, Acessibilidade, Confiança e Inclusão Digital. Trabalhamos todos os dias para criar soluções tecnológicas que aproximam empresas e pessoas, promovendo um futuro mais conectado e justo para todos.",
          vision_title: "Nossa visão",
          vision_text:
            "Ser a principal plataforma digital de Angola, reconhecida por aproximar pessoas e instituições, transformando a forma como o país acessa serviços essenciais e promove o desenvolvimento através da tecnologia.",
          mission_title: "Nossa missão",
          mission_text:
            "O Linga Tchoss tem como missão conectar empresas e pessoas em toda Angola, facilitando o acesso a serviços essenciais como saúde, educação e transporte com apenas um clique. Acreditamos em uma Angola mais digital, acessível e unida através da tecnologia.",
          language: "Língua",
          healph_services: "Serviços de saúde",
          education_services: "Serviços de educação e ensino",
          pharmacy_services: "Serviços de farmácias",
          supermarket_services: "Serviços de supermercado",
          transport_services: "Serviços de transporte e Logística",
          hotel_services: "Serviços de Hotelaria, restauração e Hospedagem",
          more_by: "Mais de",
          greetings_service: "quero marcar ",
          service: "Serviço",
          request_on_whastapp: "Solicitar no whatsapp",
          welcome: "Conectando aos serviços perto de si!",
          login: "Iniciar sessão no Linga Tchoss",
          forInstitutions: "para Instituições",
          loginWithManagedAccount:
            "Iniciar sessão com uma conta Linga Tchoss gerida",
          createNewAccount: "Criar conta nova",
          signInWithGoogle: "Continuar com o Google",
          loading: "A carregar...",
          signingOut: "A sair...",
          signOut: "Sair",
          loggedInAs: "Está autenticado como:",
          googleSignInError: "Erro ao iniciar sessão com Google",
          signOutError: "Erro ao terminar sessão",
          dashboard: "Painel de Controlo",
          dashboardWelcome: "Bem-vindo ao seu painel de controlo",
          userInfo: "Informações do Utilizador",
          email: "Email",
          userId: "ID",
          lastLogin: "Último login",
          services: "Meus serviços",
          interactions: "Interações do Bot",
          invoices: "Plano e faturame. ",
          settings: "Configurações",
          institution: "Instituição",
          controlPanel: "Painel de controlo",
          search: "Pesquisar serviço/categoria",
          all_categories: "Todas os serviços",
          search_placeholder: "Pesquisar serviço",
          close: "Fechar",
          // Institution Details translations
          institutionDetails: "Detalhes da Instituição",
          completeInstitutionProfile:
            "Complete o seu perfil de instituição para continuar",
          institutionName: "Nome da Instituição",
          institutionNamePlaceholder: "Ex: Empresa ABC Ltda",
          whatsappNumber: "Número do WhatsApp",
          location: "Localização",
          locationPlaceholder: "Ex: Luanda, Angola",
          logoUrl: "URL do Logo",
          sector: "Setor",
          plan: "Plano",
          selectSector: "Selecionar setor",
          selectPlan: "Selecionar plano",
          free: "Grátis",
          saving: "A guardar...",
          saveInstitution: "Guardar Instituição",
          // Location translations
          getLocation: "Obter Localização",
          gettingLocation: "A obter localização...",
          locationCaptured: "Localização capturada",
          locationPermissionDenied: "Permissão de localização negada",
          locationUnavailable: "Informação de localização indisponível",
          locationTimeout: "Tempo limite para obter localização",
          locationError: "Erro ao obter localização",
          geolocationNotSupported:
            "Geolocalização não é suportada pelo seu navegador",
          // Step-by-step translations
          step1Title: "Passo 1: Nome da Instituição",
          step1Description: "Digite o nome da sua instituição ou empresa",
          step2Title: "Passo 2: Contacto",
          step2Description: "Forneça o seu número de WhatsApp para contacto",
          step3Title: "Passo 3: Localização",
          step3Description: "Capture a localização da sua instituição",
          step4Title: "Passo 4: Setor e Plano",
          step4Description: "Selecione o setor de atividade e o plano desejado",
          previous: "Anterior",
          next: "Próximo",
          // Service translations
          add_a: "Adicionar um",
          new_service: "Novo serviço",
          service_name: "Nome do serviço",
          service_name_placeholder: "Ex: Serviço de limpeza",
          serviceName: "Nome do Serviço",
          serviceNamePlaceholder: "Ex: Serviço de limpeza",
          serviceDescription: "Descrição do Serviço",
          serviceDescriptionPlaceholder:
            "Descreva detalhadamente o seu serviço...",
          serviceCategory: "Categoria",
          servicePrice: "Preço",
          serviceActive: "Serviço ativo",
          serviceImage: "Imagem do Serviço",
          serviceImageUrl: "URL da Imagem",
          serviceImageFile: "Fazer Upload de Imagem",
          serviceImagePreview: "Pré-visualização",
          serviceImagePlaceholder: "Ex: https://exemplo.com/imagem.jpg",
          or: "ou",
          uploadingImage: "A fazer upload da imagem...",
          selectCategory: "Selecionar categoria",
          saveService: "Guardar Serviço",
          // Service step translations
          step1ServiceTitle: "Passo 1: Nome do Serviço",
          step1ServiceDescription: "Digite o nome do seu serviço",
          step2ServiceTitle: "Passo 2: Descrição e Imagem",
          step2ServiceDescription:
            "Descreva o seu serviço e adicione uma imagem (opcional)",
          step3ServiceTitle: "Passo 3: Categoria",
          step3ServiceDescription: "Selecione a categoria do serviço",
          step4ServiceTitle: "Passo 4: Preço e Estado",
          step4ServiceDescription: "Defina o preço e estado do serviço",
          step5ServiceTitle: "Passo 5: Tradução em Português",
          step5ServiceDescription:
            "Adicione o nome e descrição do serviço em português",
          step6ServiceTitle: "Passo 6: Tradução em Inglês",
          step6ServiceDescription:
            "Adicione o nome e descrição do serviço em inglês",
          step7ServiceTitle: "Passo 7: Tradução em Francês",
          step7ServiceDescription:
            "Adicione o nome e descrição do serviço em francês",
          step8ServiceTitle: "Passo 8: Tradução em Umbundu (Opcional)",
          step8ServiceDescription:
            "Adicione o nome e descrição do serviço em Umbundu (opcional)",
          // Category translations
          addCategory: "Adicionar Categoria",
          new_category: "Nova categoria",
          categoryName: "Nome da Categoria",
          categoryNamePlaceholder: "Ex: Limpeza",
          categoryDescription: "Descrição da Categoria",
          categoryDescriptionPlaceholder: "Descreva a categoria...",
          categoryActive: "Categoria ativa",
          saveCategory: "Guardar Categoria",
          cancel: "Cancelar",
          // Category step translations
          step1CategoryTitle: "Passo 1: Nome da Categoria",
          step1CategoryDescription: "Digite o nome da categoria",
          step2CategoryTitle: "Passo 2: Descrição",
          step2CategoryDescription: "Descreva a categoria",
          exportList: "Exportar lista",
          no_change: "Sem alterações",
          compared_to_last_month: "em relação ao mês passado",
          searchResultsFor: "Resultados para",
          filteredBy: "Filtrado por",
          category: "Categoria",
          loadingServices: "A carregar serviços...",
          noServicesFoundWithFilters:
            "Nenhum serviço encontrado com os filtros aplicados",
          noNearbyServices: "Nenhum serviço encontrado próximo de você.",
          noServicesRegistered: "Você ainda não tem serviços cadastrados",
          editService: "Editar Serviço",
          updateService: "Atualizar Serviço",
          // Header translations
          home: "Início",
          servi: "Serviços",
          contact: "Contato",
          about: "Sobre",
          signin: "Entrar",

          //Home translations
          search_service: "Pesquisar serviço",
          services_side: "Serviços perto de si",

          companies: "Empresas",
          docs: "Docs",
          blog: "Blog",
          resources: "Recursos",
          community: "Comunidade",

          business_messaging: "Mensagens empresariais",
          plans_available: "Planos disponíveis",
          enterprise_registration: "Registro de empresa",

          company_account: "Conta empresarial",
          sign_up: "Criar conta",
          sign_in: "Iniciar sessão",

          ia_resources: "Recursos de IA",
          ia_response: "Resposta de IA",
          test_ia: "Testar IA",

          app_resources: "Recursos da aplicação",
          explore_app: "Explorar aplicação",
          new_features: "Novas funcionalidades",

          system_policies: "Políticas do sistema",
          privacy_policies: "Políticas de privacidade",
          terms_of_use: "Termos de uso",

          enterprises: "Empresas",
          people: "Pessoal",

          account: "Conta",

          main_text:
            "Conectando você aos serviços que precisa, em qualquer lugar e em tempo real!",
          secondary_text:
            "Linga Tchoss é uma plataforma da KARGA MIDIA que, via WhatsApp, conecta você a escolas, farmácias, supermercados, transportes, hospedagens e restaurantes próximos, com apenas cinco cliques.",
          explore_services: "Explorar Serviços",
          whatsapp: "Whatsapp",
          appointments: "Agendamentos",
          on_your_door: "Na sua porta",
          see_all: "Ver todos",
          discover_service_categories: "Descubra categorias de serviços",
          no_services_found_near_you:
            "Nenhum serviço encontrado próximo de você.",

          service_not_found: "O serviço que busca não foi encontrado",
          go_back_home: "Voltar para a página inicial",
          contact_support: "Contactar o suporte",
          instituitions_near_you: "Instituições perto de você",
          footer_p:
            "Encontre e solicite serviços de forma rápida, prática e com entrega até sua porta",
          quick_links: "Lins rápidos",
          about_us: "Sobre nós",
          institutions: "Instituições",
          all_rights_reserved: "Todos os direitos reservados",
          contacts: "Contactos",
          no_institutions_found: "Nenhuma instituição perto de si",
          // Appointment details translations
          back: "Voltar",
          back_to_list: "Voltar à lista",
          no_image: "Sem imagem",
          price: "Preço",
          client_phone: "Telefone do cliente",
          created_at: "Criado em",
          preferred_time: "Data preferencial",
          status: "Estado",
          notes: "Notas",
          not_found: "Não encontrado",
          confirm: "Confirmar",
          view: "Ver",
          updateProfile: "Atualizar perfil",
          profileUpdated: "Perfil atualizado com sucesso",
          // Instituition page
          instituition_not_found: "Instituição não encontrada",
          services_of_institution: "Serviços da instituição",
          contact_institution: "Contactar no WhatsApp",
          items: "itens",
        },
      },
      en: {
        translation: {
          faqs: [
            {
              question: "What is Linga Tchoss?",
              answer:
                "Linga Tchoss is a digital platform that connects businesses and customers in one place. Pharmacies, hospitals, schools, transport and other services can offer their products and services directly to users, with geolocation and WhatsApp support.",
            },
            {
              question: "How can companies create an account on Linga Tchoss?",
              answer:
                "Company registration is done manually by the platform administrator. To request an account, institutions must contact via WhatsApp in the 'Contacts' section. After verification, the administrator will create access and send login details.",
            },
            {
              question: "How do customers use Linga Tchoss?",
              answer:
                "Customers can search for institutions, view available services, and contact them directly via WhatsApp. They can also request deliveries, schedule appointments, or get information easily.",
            },
            {
              question:
                "Can I book appointments or request services via WhatsApp?",
              answer:
                "Yes. Linga Tchoss integrates an intelligent assistant that understands your message and helps you schedule appointments, request services, or answer questions directly through WhatsApp.",
            },
            {
              question: "Does the service cost anything for customers?",
              answer:
                "Access to Linga Tchoss is completely free for customers. Only institutions that want more visibility or advanced features can subscribe to paid plans.",
            },
            {
              question: "What types of services can I find?",
              answer:
                "You can find healthcare, education, transport, delivery, and shopping services on Linga Tchoss. The platform is constantly updated with new businesses and sectors.",
            },
            {
              question: "How does the platform protect my data?",
              answer:
                "Linga Tchoss uses secure authentication and encryption to protect user and company data. No information is shared without consent, and strict privacy policies are followed.",
            },
            {
              question: "Can I modify or cancel a request?",
              answer:
                "Yes. You can contact the company directly via WhatsApp to modify or cancel requests, according to each institution’s policy.",
            },
            {
              question: "How can I report a technical issue?",
              answer:
                "If you experience any technical issues, go to the 'Contacts' section and send us a message on WhatsApp. Our support team will solve it as soon as possible.",
            },
            {
              question: "Is Linga Tchoss available nationwide?",
              answer:
                "Yes. Any institution can be added, regardless of province. The system uses geolocation to show services closest to each user.",
            },
          ],
          _faqs: "Frequently Asked Questions",
          _home: "Home",
          _services: "Services",
          _about: "About",
          _companies: "Companies",
          _contacts: "Contacts",
          innovation: "Innovation",
          innovation_desc:
            "We create modern solutions that transform how people and businesses connect and interact every day.",

          accessibility: "Accessibility",
          accessibility_desc:
            "We make essential services easy to access, keeping technology simple, useful, and available to everyone.",

          trust: "Trust",
          trust_desc:
            "We value transparency and security, building strong relationships between companies and clients.",

          digital_inclusion: "Digital Inclusion",
          digital_inclusion_desc:
            "We promote equal access to digital tools, helping communities grow and thrive in the online world.",
          values_in_action: "Our Values in Action",
          about_title: "About Linga Tchoss",
          values_title: "Our values",
          values_text:
            "At Linga Tchoss, we believe in four core pillars: Innovation, Accessibility, Trust, and Digital Inclusion. We work every day to build technological solutions that bring businesses and people closer together, promoting a more connected and fair future for everyone.",
          vision_title: "Our vision",
          vision_text:
            "To be Angola’s leading digital platform, recognized for bringing people and institutions closer together, transforming the way the country accesses essential services and drives development through technology.",
          mission_title: "Our mission",
          mission_text:
            "Linga Tchoss aims to connect businesses and people across Angola, making access to essential services like healthcare, education, and transport easier with just one click. We believe in a more digital, accessible, and united Angola through technology.",
          language: "Language",
          healph_services: "Health services",
          education_services: "Education and teaching services",
          pharmacy_services: "Pharmacy services",
          supermarket_services: "Supermarket services",
          transport_services: "Transport and logistics services",
          hotel_services: "Hospitality, restaurant and lodging services",
          more_by: "More by",
          greetings_service: "i want to book ",
          service: "Service",
          request_on_whastapp: "Request on whatsapp",
          welcome: "Conecting to the services near you!",
          login: "Login to Linga Tchoss for Institutions",
          forInstitutions: "for Institutions",
          loginWithManagedAccount: "Login with a Linga Tchoss managed account",
          createNewAccount: "Create new account",
          signInWithGoogle: "Continue with Google",
          loading: "Loading...",
          signingOut: "Signing out...",
          signOut: "Sign out",
          loggedInAs: "You are logged in as:",
          googleSignInError: "Error signing in with Google",
          signOutError: "Error signing out",
          dashboard: "Dashboard",
          dashboardWelcome: "Welcome to your dashboard",
          userInfo: "User Information",
          email: "Email",
          userId: "ID",
          lastLogin: "Last login",
          services: "My services",
          interactions: "Bot interactions",
          invoices: "Plan and billing",
          settings: "Settings",
          institution: "Institution",
          controlPanel: "Control Panel",
          search: "Search service/category",
          all_categories: "All services",
          search_placeholder: "Search service",
          close: "Close",
          // Institution Details translations
          institutionDetails: "Institution Details",
          completeInstitutionProfile:
            "Complete your institution profile to continue",
          institutionName: "Institution Name",
          institutionNamePlaceholder: "Ex: ABC Company Ltd",
          whatsappNumber: "WhatsApp Number",
          location: "Location",
          locationPlaceholder: "Ex: Luanda, Angola",
          logoUrl: "Logo URL",
          sector: "Sector",
          plan: "Plan",
          selectSector: "Select sector",
          selectPlan: "Select plan",
          free: "Free",
          saving: "Saving...",
          saveInstitution: "Save Institution",
          // Location translations
          getLocation: "Get Location",
          gettingLocation: "Getting location...",
          locationCaptured: "Location captured",
          locationPermissionDenied: "Location permission denied",
          locationUnavailable: "Location information unavailable",
          locationTimeout: "Location request timeout",
          locationError: "Error getting location",
          geolocationNotSupported:
            "Geolocation is not supported by your browser",
          // Step-by-step translations
          step1Title: "Step 1: Institution Name",
          step1Description: "Enter your institution or company name",
          step2Title: "Step 2: Contact",
          step2Description: "Provide your WhatsApp number for contact",
          step3Title: "Step 3: Location",
          step3Description: "Capture your institution's location",
          step4Title: "Step 4: Sector and Plan",
          step4Description: "Select your activity sector and desired plan",
          previous: "Previous",
          next: "Next",
          // Service translations
          add_a: "Add a",
          new_service: "New service",
          service_name: "Service name",
          service_name_placeholder: "Ex: Cleaning service",
          serviceName: "Service Name",
          serviceNamePlaceholder: "Ex: Cleaning service",
          serviceDescription: "Service Description",
          serviceDescriptionPlaceholder: "Describe your service in detail...",
          serviceCategory: "Category",
          servicePrice: "Price",
          serviceActive: "Service active",
          serviceImage: "Service Image",
          serviceImageUrl: "Image URL",
          serviceImageFile: "Upload Image",
          serviceImagePreview: "Preview",
          serviceImagePlaceholder: "Ex: https://example.com/image.jpg",
          or: "or",
          uploadingImage: "Uploading image...",
          selectCategory: "Select category",
          saveService: "Save Service",
          // Service step translations
          step1ServiceTitle: "Step 1: Service Name",
          step1ServiceDescription: "Enter your service name",
          step2ServiceTitle: "Step 2: Description and Image",
          step2ServiceDescription:
            "Describe your service and add an image (optional)",
          step3ServiceTitle: "Step 3: Category",
          step3ServiceDescription: "Select the service category",
          step4ServiceTitle: "Step 4: Price and Status",
          step4ServiceDescription: "Set the price and status of the service",
          step5ServiceTitle: "Step 5: Portuguese Translation",
          step5ServiceDescription:
            "Add the service name and description in Portuguese",
          step6ServiceTitle: "Step 6: English Translation",
          step6ServiceDescription:
            "Add the service name and description in English",
          step7ServiceTitle: "Step 7: French Translation",
          step7ServiceDescription:
            "Add the service name and description in French",
          step8ServiceTitle: "Step 8: Umbundu Translation (Optional)",
          step8ServiceDescription:
            "Add the service name and description in Umbundu (optional)",
          // Category translations
          addCategory: "Add Category",
          new_category: "New category",
          categoryName: "Category Name",
          categoryNamePlaceholder: "Ex: Cleaning",
          categoryDescription: "Category Description",
          categoryDescriptionPlaceholder: "Describe the category...",
          categoryActive: "Category active",
          saveCategory: "Save Category",
          cancel: "Cancel",
          // Category step translations
          step1CategoryTitle: "Step 1: Category Name",
          step1CategoryDescription: "Enter the category name",
          step2CategoryTitle: "Step 2: Description",
          step2CategoryDescription: "Describe the category",
          exportList: "Export list",
          no_change: "No change",
          compared_to_last_month: "compared to last month",
          searchResultsFor: "Results for",
          filteredBy: "Filtered by",
          category: "Category",
          loadingServices: "Loading services...",
          noServicesFoundWithFilters: "No services found with applied filters",
          noServicesRegistered: "You don't have any registered services yet",
          editService: "Edit Service",
          updateService: "Update Service",
          home: "Home",
          servi: "Services",
          contact: "Contact",
          about: "About",
          signin: "Sign in",
          //Home translations
          search_service: "Search service",
          services_side: "Services near you",

          companies: "Companies",
          docs: "Docs",
          blog: "Blog",
          resources: "Resources",
          community: "Community",

          business_messaging: "Business messaging",
          plans_available: "Plans available",
          enterprise_registration: "Company registration",

          company_account: "Company account",
          sign_up: "Sign up",
          sign_in: "Sign in",

          ia_resources: "AI Resources",
          ia_response: "AI Responses",
          test_ia: "Test AI",

          app_resources: "App resources",
          explore_app: "Explore app",
          new_features: "New features",

          system_policies: "System policies",
          privacy_policies: "Privacy policies",
          terms_of_use: "Terms of use",

          enterprises: "Companies",
          people: "People",

          account: "Account",

          main_text:
            "Connecting you to the services you need, anywhere in real time!",

          secondary_text:
            "Linga Tchoss is a platform by KARGA MIDIA that, via WhatsApp, connects you to nearby schools, pharmacies, supermarkets, transport, accommodations, and restaurants in just five clicks.",
          explore_services: "Explore Services",

          whatsapp: "Whatsapp",
          appointments: "Appointments",
          on_your_door: "On your door",
          see_all: "See all",
          discover_service_categories: "Discover service categories",
          no_services_found_near_you: "No services found near you.",
          service_not_found: "The service you are looking for was not found",
          go_back_home: "Go back home",
          contact_support: "Contact support",
          instituitions_near_you: "Institutions near you",
          footer_p:
            "Find and request services quickly, easily, and with delivery right to your door",
          quick_links: "Quick Links",
          about_us: "About us",
          institutions: "Institutions",
          all_rights_reserved: "All rights reserved",
          contacts: "Contacts",
          no_institutions_found: "No institutions near you",
          // Appointment details translations
          back: "Back",
          back_to_list: "Back to list",
          no_image: "No image",
          price: "Price",
          client_phone: "Client phone",
          created_at: "Created at",
          preferred_time: "Preferred date",
          status: "Status",
          notes: "Notes",
          not_found: "Not found",
          confirm: "Confirm",
          view: "View",
          updateProfile: "Update profile",
          profileUpdated: "Profile updated successfully",
          // Instituition page
          instituition_not_found: "Institution not found",
          services_of_institution: "Institution services",
          contact_institution: "Contact on WhatsApp",
          items: "items",
        },
      },
      umb: {
        translation: {
          faqs: [
            {
              question: "Linga Tchoss olombwene k'ey?",
              answer:
                "Linga Tchoss olombwene k’ombela yokupanga okuti ovasili pamwe na ovakwate. Ovafármasia, ovahospitali, ovakoléji na ovakalunga vakwete esengele okuhala avali pamwe na omanu k’epata limwe, vali na WhatsApp oha olondunge lwa geolocalização.",
            },
            {
              question:
                "Ovakalunga vakwete eteke lyokutala k’okalunga Linga Tchoss olombwene?",
              answer:
                "Eteke lyokutala likwete k’okupangwa kwa ofeteka lya Linga Tchoss. Okukwata, vakwete okuhambela WhatsApp k’esima 'Contactos'. Feteka lyokupanda olondunge, likwate okupeha eteke lyo acesso.",
            },
            {
              question:
                "Ovakwate vakwete okuhala Linga Tchoss valipate shimbwi?",
              answer:
                "Ovakwate vakwete okuhalela ovakalunga, vakulipata esengele, na vakwate okuhambela vala kupita WhatsApp. Vakwete okuhumana okukwata esengele, okuhupitha oconsultas, na okwelela oinfo wa pepaya.",
            },
            {
              question: "Ngayi vakwete okuhupitha oconsultas kupita WhatsApp?",
              answer:
                "Ee. Linga Tchoss olombwene na assistente yolombwene yolokuti, yehupa ovakwate okukwata na ovakalunga okuhupitha oconsultas na ovakasi va vala WhatsApp.",
            },
            {
              question: "Esengele lyali li na k’osema?",
              answer:
                "Linga Tchoss li pange k’osema kwa ovakwate. Ovakalunga vakwete okusalela osima va li na planos va okwelela esengele va vala lya kuoneka elipo.",
            },
            {
              question: "Ovasele esengele vali valipate k’oling?",
              answer:
                "Linga Tchoss vali vali na ovasele vya saúde, educação, transporte, entregas na ovasele vyokutala. Osite lisumbulula ovakalunga ovapala kuvala posi.",
            },
            {
              question: "Okalunga li pange k’osemana kudiva kwange?",
              answer:
                "Linga Tchoss li pange na ovipange vyokupangula kuvalela kudiva kwa ovakwate na ovakalunga. Elitava lyali li na kudiva kovakwate okuti.",
            },
            {
              question: "Ngayi vakwete okuhupitha oserviço kwandje?",
              answer:
                "Ee. Vakwe okwelela ovakalunga okuhupitha WhatsApp, vakwete okuhindula oserviço valipele valimbwate esengele.",
            },
            {
              question: "Ngayi vakwete okuleka oshike shikwete?",
              answer:
                "Okuleka oshike shikwete, vakwe okuhambela esima 'Contactos' vakwete okupa ombinga kupita WhatsApp. Okalunga k’efeteka li t’ehupitha oshike oshonene.",
            },
            {
              question: "Linga Tchoss li li po Angolayosi yosima?",
              answer:
                "Ee. Ovakalunga vosima vakwete okuvalela. Linga Tchoss li pange na geolocalização okuhupa ovakalunga vava posi.",
            },
          ],
          _faqs: "Ombinga dzokupulika kovanda",
          _home: "Onjo",
          _services: "Ovasele",
          _about: "Ohandi",
          _companies: "Ovakalunga",
          _contacts: "Ovapandji",
          innovation: "Okupanga vyovipange",
          innovation_desc:
            "Tupanga ovipange vipya vyokuhupitha esimbi lyokuhupitha ovakwate na ovakalunga posi k’omanu vosi.",

          accessibility: "Okupitavala",
          accessibility_desc:
            "Tuvala ovasele vya kuvalela ovakwate, eteknologia li pange kupangwa, kuyandama na kuvalela vosi.",

          trust: "Ekoloto",
          trust_desc:
            "Tuholela ekoloto na etetululo, okutula esimbi lyokutwelela kovakalunga na ovakwate.",

          digital_inclusion: "Okutumbuluka yolombwene",
          digital_inclusion_desc:
            "Tuvala okutumbuluka k’okuhupitha ovipange vyoteknologia, okuhupitha ovakwate vosi posi yolombwene.",
          values_in_action: "Ovatunda vyetu k’okuhupitha",
          about_title: "Ohandi Linga Tchoss",
          values_title: "Ovatunda vyetu",
          values_text:
            "Linga Tchoss li holela ovatunda vikende: Okupanga vyovipange, Okupitavala, Ekoloto na Okutumbuluka yolombwene. Tuhupitha ovipange vyoteknologia okuvalela ovakalunga na ovakwate, okutula Angola yomoko yokukwatana na elipango lyokulinganisa.",
          vision_title: "Okulihoshe kwetu",
          vision_text:
            "Okulihoshe kwa Linga Tchoss li okuti osite li platforma yolombwene y’Angola, yokupitavala ovakwate na ovakalunga, okuhindula esimbi lyokuhupitha ovasele vya kuvalela na okwelela okutumbuluka kupita eteknologia.",
          mission_title: "Etona lyetu",
          mission_text:
            "Linga Tchoss li na etona lyokuhupitha ovakalunga na ovakwate posi Angola yose, okuhala ovasele vya saúde, educação na transporte vali k’epata limwe. Tuholela Angola yo kuvalela, yolombwene na yokukwatana kupita eteknologia.",
          language: "Olongele",
          healph_services: "Ovilonga vyokulikwata esanje",
          education_services: "Ovilonga vyokukwata esekola no kufundila",
          pharmacy_services: "Ovilonga vyofármacia",
          supermarket_services: "Ovilonga vyosupermercado",
          transport_services: "Ovilonga vyotransporte no Logística",
          hotel_services: "Ovilonga vyohotelaria, okulyakula no ohospedagem",
          more_by: "Okuti",
          greetings_service: "ndinge okulombolola ",
          service: "Ondaka",
          request_on_whastapp: "Twala k'okuti WhatsApp",
          welcome: "Okukwata k'ovisungo vi uli pepi nawe!",
          login: "Ulinga Linga Tchoss kwa Viomboloxelo",
          forInstitutions: "kwa Viomboloxelo",
          loginWithManagedAccount:
            "Ulinga ovikila vyatwalisiwa vya Linga Tchoss",
          createNewAccount: "Tunda ovikila vyapya",
          signInWithGoogle: "Ulonga na Google",
          loading: "Okutyanga...",
          signingOut: "Okuhumuka...",
          signOut: "Humuka",
          loggedInAs: "Owa longa vali cowu: ",
          googleSignInError: "Ecipepa k'oku longa na Google",
          signOutError: "Ecipepa k'oku humuka",
          dashboard: "Elyapa lyo mwelu",
          dashboardWelcome: "Ukomwua k'elyapa lyako lyo mwelu",
          userInfo: "Ovipange vyomutumishi",
          email: "Imeyili",
          userId: "ID",
          lastLogin: "Ulinga wokupedisa",
          services: "Ovisanju vyami",
          interactions: "Okutunda kwenje na bot",
          invoices: "Planu ne okutapulula",
          settings: "Ovipangiso",
          institution: "Etya/Viomboloxelo",
          controlPanel: "Elunga lyo kulongolola",
          search: "Twala ovipesu/visanju",
          all_categories: "Ovipuka vyosi",
          search_placeholder: "Twala ovisanju",
          close: "Feka",

          // Institution Details translations
          institutionDetails: "Ovipange vya viomboloxelo",
          completeInstitutionProfile:
            "Tundilila ovipange vy'etya kwenda uendele",
          institutionName: "Litunga ly'etya",
          institutionNamePlaceholder: "Ex: ABC Company Ltd",
          whatsappNumber: "Onomero ya WhatsApp",
          location: "Ongele",
          locationPlaceholder: "Ex: Luanda, Angola",
          logoUrl: "Endelo ya logo",
          sector: "Sekitoli",
          plan: "Planu",
          selectSector: "Sola sekitoli",
          selectPlan: "Sola planu",
          free: "Ka talisiwa",
          saving: "Okutekula...",
          saveInstitution: "Tekula etya",

          // Location translations
          getLocation: "Twala ongele",
          gettingLocation: "Okwatwa ongele...",
          locationCaptured: "Ongele yatwathiwe",
          locationPermissionDenied: "Olondunge lya ongele lyalikwi",
          locationUnavailable: "Ongele kayivali",
          locationTimeout: "Okulinga ongele kwapita esiku",
          locationError: "Ecipepa k’okulinga ongele",
          geolocationNotSupported:
            "Olongiso lyo ongele kayavali mu browser yaco",

          // Step-by-step translations
          step1Title: "Eci 1: Litunga ly'etya",
          step1Description: "Tyanya litunga lya etya lyaco",
          step2Title: "Eci 2: Epepa",
          step2Description: "Tyanya onomero ya WhatsApp yo kupepula",
          step3Title: "Eci 3: Ongele",
          step3Description: "Twala ongele ya etya lyaco",
          step4Title: "Eci 4: Sekitoli kwenda Planu",
          step4Description: "Sola sekitoli kwenda planu eye otava",
          previous: "Komboka",
          next: "Kwenda eci",
          // Service translations
          add_a: "Tunda",
          new_service: "Ovisanju vyapya",
          service_name: "Litunga ly'etya",
          service_name_placeholder: "Ex: Ovisanju vy'etya",
          serviceName: "Litunga ly'Ovisanju",
          serviceNamePlaceholder: "Ex: Ovisanju vy'etya",
          serviceDescription: "Eci ly'Ovisanju",
          serviceDescriptionPlaceholder: "Cilila ovisanju vyaco...",
          serviceCategory: "Ocipande",
          servicePrice: "Ondaleka",
          serviceActive: "Ovisanju vyavali",
          serviceImage: "Eci ly'Ovisanju",
          serviceImageUrl: "Endelo ya Eci",
          serviceImageFile: "Tunda Eci",
          serviceImagePreview: "Okutala",
          serviceImagePlaceholder: "Ex: https://exemplo.com/eci.jpg",
          or: "okupenda",
          uploadingImage: "Okutunda eci...",
          selectCategory: "Sola ocipande",
          saveService: "Tekula Ovisanju",
          // Service step translations
          step1ServiceTitle: "Eci 1: Litunga ly'Ovisanju",
          step1ServiceDescription: "Tyanya litunga lya ovisanju vyaco",
          step2ServiceTitle: "Eci 2: Eci kwenda Eci",
          step2ServiceDescription:
            "Cilila ovisanju vyaco kwenda tunda eci (okupenda)",
          step3ServiceTitle: "Eci 3: Ocipande",
          step3ServiceDescription: "Sola ocipande lya ovisanju",
          step4ServiceTitle: "Eci 4: Ondaleka kwenda Eci",
          step4ServiceDescription: "Tyanya ondaleka kwenda eci lya ovisanju",
          step5ServiceTitle: "Eci 5: Ovipange mu Português",
          step5ServiceDescription:
            "Tunda litunga kwenda eci lya ovisanju mu Português",
          step6ServiceTitle: "Eci 6: Ovipange mu English",
          step6ServiceDescription:
            "Tunda litunga kwenda eci lya ovisanju mu English",
          step7ServiceTitle: "Eci 7: Ovipange mu Français",
          step7ServiceDescription:
            "Tunda litunga kwenda eci lya ovisanju mu Français",
          step8ServiceTitle: "Eci 8: Ovipange mu Umbundu (Okupenda)",
          step8ServiceDescription:
            "Tunda litunga kwenda eci lya ovisanju mu Umbundu (okupenda)",
          // Category translations
          addCategory: "Tunda Ocipande",
          new_category: "Ocipande vyapya",
          categoryName: "Litunga ly'Ocipande",
          categoryNamePlaceholder: "Ex: Etya",
          categoryDescription: "Eci ly'Ocipande",
          categoryDescriptionPlaceholder: "Cilila ocipande...",
          categoryActive: "Ocipande vyavali",
          saveCategory: "Tekula Ocipande",
          cancel: "Komboka",
          // Category step translations
          step1CategoryTitle: "Eci 1: Litunga ly'Ocipande",
          step1CategoryDescription: "Tyanya litunga lya ocipande",
          step2CategoryTitle: "Eci 2: Eci",
          step2CategoryDescription: "Cilila ocipande",
          exportList: "Tunda okutala",
          no_change: "Okuvandja",
          compared_to_last_month: "okuya kovili oyenda",
          searchResultsFor: "Ovipange vya",
          filteredBy: "Okuyandja na",
          category: "Ocipande",
          loadingServices: "Okutyanga ovisanju...",
          noServicesFoundWithFilters:
            "Ka ovisanju vyatwathiwe na ovipangiso vyatundililwe",
          noServicesRegistered: "Ka ovisanju vyaco vyatundililwe",
          editService: "Tunda Ovisanju",
          updateService: "Tunda Ovisanju",
          // Header translations
          home: "Koma",
          servi: "Ovisanju",
          contact: "Kontakto",
          about: "Kutalala",
          signin: "Kongola",
          // Home translations
          search_service: "Twala ovisanju",
          services_side: "Ovisanju vyavali k'oku",

          companies: "Vi-ñganda",
          docs: "Vi-livulu vya ndunge",
          blog: "Ohandi y'okutunga",
          resources: "Ovikoko",
          community: "Onjo y’omunu",

          business_messaging: "Ohandi dovi-ñganda",
          plans_available: "Ovipango vilipavailable",
          enterprise_registration: "Okusajila kwa vi-ñganda",

          company_account: "Ekonto lyovi-ñganda",
          sign_up: "Okutunga ekonto",
          sign_in: "Okwingila mukonto",

          ia_resources: "Ovikoko vya AI",
          ia_response: "Ohandi yavi AI",
          test_ia: "Kukwate AI",

          app_resources: "Ovikoko vya aplikasyoni",
          explore_app: "Okutandulula aplikasyoni",
          new_features: "Ovinji vyovakulu",

          system_policies: "Ombwa yomalume",
          privacy_policies: "Ombwa yokutalika okuhandi",
          terms_of_use: "Ovihendo vokukwata",

          enterprises: "Vi-ñganda",
          people: "Onjo y'omunu",

          account: "Ekonto",

          main_text:
            "Okuyokiya kwenda kuvisanje vyowi ulomboloka, koko kuli osi Okuti kwenda vali!",

          secondary_text:
            "Linga Tchoss oco plataforma ya KARGA MIDIA eyi, kupita ko WhatsApp, okutila we k’ekola, ofármacia, osupermercado, okutransporta, ovilipo vyokulala pamwe na orestaurante vya pepi, okuhala vali vatalo vitano.",
          explore_services: "Tandulula Ovisanju",

          whatsapp: "Whatsapp",
          appointments: "okulilo",
          on_your_door: "Kuli wowo",
          see_all: "Twala osi",
          discover_service_categories: "Tandulula ocipande vy 'ovisanju",
          no_services_found_near_you: "Ka ovisanju vyatwathiwe k'oku.",
          service_not_found: "Ovisanju ovi olomboloka kaviwathiwe",
          go_back_home: "Komboka kuli koma",
          contact_support: "Kontakto ovipange vya ndunge",
          instituitions_near_you: "Viomboloxelo vyavali k'oku",
          footer_p:
            "Twala ovilonga kwenda kuvisanje vyowi ulomboloka, koko kuli osi",
          quick_links: "Ovilapo vyalekele",
          about_us: "Okusumba kwetu",
          institutions: "Omanu asokiyo",
          all_rights_reserved: "Oluvile lwosi lwalipandike",
          contacts: "Ovakwetu",
          no_institutions_found: "Ka viomboloxelo vyatwathiwe k'oku",
          // Appointment details translations
          back: "Komboka",
          back_to_list: "Komboka kulipandiso",
          no_image: "Ka eci",
          price: "Ondaleka",
          client_phone: "Onomero ya klandente",
          created_at: "Yatundilwe k'oku",
          preferred_time: "Eci yo kusola",
          status: "Ondunge",
          notes: "Ovipande",
          not_found: "Kaviwathiwe",
          confirm: "Okukwata",
          view: "Okutala",
          updateProfile: "Okwaha ekonto",
          profileUpdated: "Perfil oti kwahile",
          // Instituition page
          instituition_not_found: "Etya kaviwathiwe",
          services_of_institution: "Ovisanju vy’etya",
          contact_institution: "Kontakto k’O WhatsApp",
          items: "itens",
        },
      },
      fr: {
        translation: {
          faqs: [
            {
              question: "Qu'est-ce que Linga Tchoss ?",
              answer:
                "Linga Tchoss est une plateforme numérique qui relie les entreprises et les clients en un seul endroit. Les pharmacies, hôpitaux, écoles, services de transport et autres peuvent offrir leurs services directement aux utilisateurs, avec géolocalisation et assistance via WhatsApp.",
            },
            {
              question:
                "Comment les entreprises peuvent-elles créer un compte sur Linga Tchoss ?",
              answer:
                "L'inscription des entreprises est effectuée manuellement par l'administrateur de la plateforme. Pour demander un compte, contactez-nous via WhatsApp dans la section « Contacts ». Après vérification, l'administrateur créera l'accès et enverra les informations de connexion.",
            },
            {
              question: "Comment les clients utilisent-ils Linga Tchoss ?",
              answer:
                "Les clients peuvent rechercher des institutions, voir les services disponibles et les contacter directement via WhatsApp. Ils peuvent également demander des livraisons, planifier des rendez-vous ou obtenir des informations facilement.",
            },
            {
              question:
                "Puis-je prendre des rendez-vous ou demander des services via WhatsApp ?",
              answer:
                "Oui. Linga Tchoss intègre un assistant intelligent qui comprend votre message et vous aide à planifier des rendez-vous, demander des services ou poser des questions directement via WhatsApp.",
            },
            {
              question: "Le service a-t-il un coût pour les clients ?",
              answer:
                "L'accès à Linga Tchoss est entièrement gratuit pour les clients. Seules les institutions souhaitant plus de visibilité ou des fonctionnalités avancées peuvent souscrire à des plans payants.",
            },
            {
              question: "Quels types de services puis-je trouver ?",
              answer:
                "Sur Linga Tchoss, vous trouverez des services de santé, d’éducation, de transport, de livraison et bien plus encore. La plateforme est constamment mise à jour avec de nouvelles entreprises et secteurs.",
            },
            {
              question: "Comment la plateforme protège-t-elle mes données ?",
              answer:
                "Linga Tchoss utilise une authentification sécurisée et le cryptage pour protéger les données des utilisateurs et des entreprises. Aucune information n'est partagée sans consentement et nous respectons des politiques de confidentialité strictes.",
            },
            {
              question: "Puis-je modifier ou annuler une demande ?",
              answer:
                "Oui. Vous pouvez contacter directement l'entreprise via WhatsApp pour modifier ou annuler une demande, selon la politique de chaque institution.",
            },
            {
              question: "Comment signaler un problème technique ?",
              answer:
                "Si vous rencontrez un problème technique, rendez-vous dans la section « Contacts » et envoyez un message via WhatsApp. Notre équipe d'assistance résoudra le problème dès que possible.",
            },
            {
              question: "Linga Tchoss est-il disponible dans tout le pays ?",
              answer:
                "Oui. Toute institution peut être ajoutée, quelle que soit la province. Le système utilise la géolocalisation pour afficher les services les plus proches de chaque utilisateur.",
            },
          ],
          _faqs: "Questions Fréquentes",
          _home: "Accueil",
          _services: "Services",
          _about: "À propos",
          _companies: "Entreprises",
          _contacts: "Contacts",
          innovation: "Innovation",
          innovation_desc:
            "Nous créons des solutions modernes qui transforment la manière dont les gens et les entreprises interagissent chaque jour.",

          accessibility: "Accessibilité",
          accessibility_desc:
            "Nous facilitons l’accès aux services essentiels, en rendant la technologie simple, utile et disponible pour tous.",

          trust: "Confiance",
          trust_desc:
            "Nous valorisons la transparence et la sécurité, en construisant des relations solides entre entreprises et clients.",

          digital_inclusion: "Inclusion Numérique",
          digital_inclusion_desc:
            "Nous promouvons l’égalité d’accès aux outils numériques, aidant les communautés à se développer en ligne.",
          values_in_action: "Nos Valeurs en Action",
          about_title: "À propos de Linga Tchoss",
          values_title: "Nos valeurs",
          values_text:
            "Chez Linga Tchoss, nous croyons en quatre piliers essentiels : Innovation, Accessibilité, Confiance et Inclusion Numérique. Nous travaillons chaque jour à créer des solutions technologiques qui rapprochent les entreprises et les personnes, pour un avenir plus connecté et équitable.",
          vision_title: "Notre vision",
          vision_text:
            "Être la principale plateforme numérique d’Angola, reconnue pour rapprocher les personnes et les institutions, transformant la manière dont le pays accède aux services essentiels et favorise le développement grâce à la technologie.",
          mission_title: "Notre mission",
          mission_text:
            "Linga Tchoss a pour mission de connecter les entreprises et les citoyens à travers l’Angola, en facilitant l’accès aux services essentiels tels que la santé, l’éducation et le transport en un seul clic. Nous croyons en une Angola plus numérique et unie grâce à la technologie.",
          language: "Langue",
          healph_services: "Services de santé",
          education_services: "Services d’éducation et d’enseignement",
          pharmacy_services: "Services de pharmacies",
          supermarket_services: "Services de supermarché",
          transport_services: "Transport and logistics services",
          hotel_services:
            "Services d’hôtellerie, de restauration et d’hébergement",
          more_by: "Plus par",
          greetings_service: "je veux réserver ",
          service: "Service",
          request_on_whastapp: "Demander sur WhatsApp",
          welcome: "Connexion aux services près de chez vous !",
          login: "Connexion à Linga Tchoss pour les institutions",
          forInstitutions: "pour les institutions",
          loginWithManagedAccount: "Connexion avec un compte géré Linga Tchoss",
          createNewAccount: "Créer un nouveau compte",
          signInWithGoogle: "Continuer avec Google",
          loading: "Chargement...",
          signingOut: "Déconnexion...",
          signOut: "Se déconnecter",
          loggedInAs: "Connecté en tant que :",
          googleSignInError: "Erreur lors de la connexion avec Google",
          signOutError: "Erreur lors de la déconnexion",
          dashboard: "Tableau de bord",
          dashboardWelcome: "Bienvenue sur votre tableau de bord",
          userInfo: "Informations de l'utilisateur",
          email: "E-mail",
          userId: "ID",
          lastLogin: "Dernière connexion",
          services: "Mes services",
          interactions: "Interactions avec le bot",
          invoices: "Abonnement et facturation",
          settings: "Paramètres",
          institution: "Institution",
          controlPanel: "Panneau de contrôle",
          search: "Rechercher un service/catégorie",
          all_categories: "Toutes les services",
          search_placeholder: "Rechercher un service",
          close: "Fermer",

          // Institution Details translations
          institutionDetails: "Détails de l'institution",
          completeInstitutionProfile:
            "Complétez le profil de votre institution pour continuer",
          institutionName: "Nom de l'institution",
          institutionNamePlaceholder: "Ex : Société ABC SARL",
          whatsappNumber: "Numéro WhatsApp",
          location: "Localisation",
          locationPlaceholder: "Ex : Luanda, Angola",
          logoUrl: "URL du logo",
          sector: "Secteur",
          plan: "Forfait",
          selectSector: "Sélectionner un secteur",
          selectPlan: "Sélectionner un forfait",
          free: "Gratuit",
          saving: "Enregistrement...",
          saveInstitution: "Enregistrer l'institution",

          // Location translations
          getLocation: "Obtenir la localisation",
          gettingLocation: "Obtention de la localisation...",
          locationCaptured: "Localisation capturée",
          locationPermissionDenied: "Permission de localisation refusée",
          locationUnavailable: "Informations de localisation indisponibles",
          locationTimeout: "Temps d’attente pour la localisation dépassé",
          locationError: "Erreur lors de l'obtention de la localisation",
          geolocationNotSupported:
            "La géolocalisation n'est pas prise en charge par votre navigateur",

          // Step-by-step translations
          step1Title: "Étape 1 : Nom de l'institution",
          step1Description: "Entrez le nom de votre institution ou entreprise",
          step2Title: "Étape 2 : Contact",
          step2Description: "Fournissez votre numéro WhatsApp pour le contact",
          step3Title: "Étape 3 : Localisation",
          step3Description: "Capturez la localisation de votre institution",
          step4Title: "Étape 4 : Secteur et Forfait",
          step4Description:
            "Sélectionnez votre secteur d’activité et le forfait souhaité",
          previous: "Précédent",
          next: "Suivant",
          // Service translations
          add_a: "Ajouter un",
          new_service: "Nouveau service",
          service_name: "Nom du service",
          service_name_placeholder: "Ex: Service de nettoyage",
          serviceName: "Nom du Service",
          serviceNamePlaceholder: "Ex: Service de nettoyage",
          serviceDescription: "Description du Service",
          serviceDescriptionPlaceholder: "Décrivez votre service en détail...",
          serviceCategory: "Catégorie",
          servicePrice: "Prix",
          serviceActive: "Service actif",
          serviceImage: "Image du Service",
          serviceImageUrl: "URL de l'Image",
          serviceImageFile: "Télécharger une Image",
          serviceImagePreview: "Aperçu",
          serviceImagePlaceholder: "Ex: https://exemple.com/image.jpg",
          or: "ou",
          uploadingImage: "Téléchargement de l'image...",
          selectCategory: "Sélectionner une catégorie",
          saveService: "Enregistrer le Service",
          // Service step translations
          step1ServiceTitle: "Étape 1 : Nom du Service",
          step1ServiceDescription: "Entrez le nom de votre service",
          step2ServiceTitle: "Étape 2 : Description et Image",
          step2ServiceDescription:
            "Décrivez votre service et ajoutez une image (optionnel)",
          step3ServiceTitle: "Étape 3 : Catégorie",
          step3ServiceDescription: "Sélectionnez la catégorie du service",
          step4ServiceTitle: "Étape 4 : Prix et Statut",
          step4ServiceDescription: "Définissez le prix et le statut du service",
          step5ServiceTitle: "Étape 5 : Traduction en Portugais",
          step5ServiceDescription:
            "Ajoutez le nom et la description du service en portugais",
          step6ServiceTitle: "Étape 6 : Traduction en Anglais",
          step6ServiceDescription:
            "Ajoutez le nom et la description du service en anglais",
          step7ServiceTitle: "Étape 7 : Traduction en Français",
          step7ServiceDescription:
            "Ajoutez le nom et la description du service en français",
          step8ServiceTitle: "Étape 8 : Traduction en Umbundu (Optionnel)",
          step8ServiceDescription:
            "Ajoutez le nom et la description du service en Umbundu (optionnel)",
          // Category translations
          addCategory: "Ajouter une Catégorie",
          new_category: "Nouvelle catégorie",
          categoryName: "Nom de la Catégorie",
          categoryNamePlaceholder: "Ex: Nettoyage",
          categoryDescription: "Description de la Catégorie",
          categoryDescriptionPlaceholder: "Décrivez la catégorie...",
          categoryActive: "Catégorie active",
          saveCategory: "Enregistrer la Catégorie",
          cancel: "Annuler",
          // Category step translations
          step1CategoryTitle: "Étape 1 : Nom de la Catégorie",
          step1CategoryDescription: "Entrez le nom de la catégorie",
          step2CategoryTitle: "Étape 2 : Description",
          step2CategoryDescription: "Décrivez la catégorie",
          exportList: "Exporter la liste",
          no_change: "Aucun changement",
          compared_to_last_month: "par rapport au mois dernier",
          searchResultsFor: "Résultats pour",
          filteredBy: "Filtré par",
          category: "Catégorie",
          loadingServices: "Chargement des services...",
          noServicesFoundWithFilters:
            "Aucun service trouvé avec les filtres appliqués",
          noServicesRegistered:
            "Vous n'avez pas encore de services enregistrés",
          editService: "Modifier le Service",
          updateService: "Mettre à jour le Service",
          // Header translations
          home: "Accueil",
          servi: "Services",
          contact: "Contact",
          about: "À propos",
          signin: "Connexion",
          // Home translations
          search_service: "Rechercher un service",
          services_side: "Services près de chez vous",

          companies: "Entreprises",
          docs: "Documents",
          blog: "Blog",
          resources: "Ressources",
          community: "Communauté",

          business_messaging: "Messagerie d'entreprise",
          plans_available: "Plans disponibles",
          enterprise_registration: "Inscription entreprise",

          company_account: "Compte entreprise",
          sign_up: "Créer un compte",
          sign_in: "Se connecter",

          ia_resources: "Ressources IA",
          ia_response: "Réponses IA",
          test_ia: "Tester l'IA",

          app_resources: "Ressources de l'application",
          explore_app: "Explorer l'application",
          new_features: "Nouvelles fonctionnalités",

          system_policies: "Politiques du système",
          privacy_policies: "Politiques de confidentialité",
          terms_of_use: "Conditions d'utilisation",

          enterprises: "Entreprises",
          people: "Personnes",

          whatsapp: "Whatsapp",
          appointments: "Rendez-vous",
          on_your_door: "À votre porte",

          account: "Compte",
          main_text:
            "Vous connecter aux services dont vous avez besoin, partout En temps réel!",
          secondary_text:
            "Linga Tchoss est une plateforme de KARGA MIDIA qui, via WhatsApp, vous connecte à des écoles, pharmacies, supermarchés, transports, hébergements et restaurants à proximité, en seulement cinq clics.",
          explore_services: "Explorer les Services",
          see_all: "Voir tout",
          discover_service_categories: "Découvrir les catégories de services",
          no_services_found_near_you: "Aucun service trouvé près de chez vous.",
          service_not_found: "Le service que vous recherchez est introuvable",
          go_back_home: "Retour à l'accueil",
          contact_support: "Contacter le support",
          instituitions_near_you: "Institutions près de chez vous",
          footer_p:
            "Trouvez et demandez des services rapidement, facilement et avec livraison à votre porte",
          quick_links: "Liens rapides",
          about_us: "À propos de nous",
          institutions: "Institutions",
          all_rights_reserved: "Tous droits réservés",
          contacts: "Contacts",
          no_institutions_found: "Aucune institution près de chez vous",
          // Appointment details translations
          back: "Retour",
          back_to_list: "Retour à la liste",
          no_image: "Pas d'image",
          price: "Prix",
          client_phone: "Téléphone du client",
          created_at: "Créé le",
          preferred_time: "Date préférentielle",
          status: "Statut",
          notes: "Notes",
          not_found: "Introuvable",
          confirm: "Confirmer",
          view: "Voir",
          updateProfile: "Mettre à jour le profil",
          profileUpdated: "Profil mis à jour avec succès",
          // Instituition page
          instituition_not_found: "Institution introuvable",
          services_of_institution: "Services de l’institution",
          contact_institution: "Contacter sur WhatsApp",
          items: "articles",
        },
      },
    },
  });

export default i18n;
