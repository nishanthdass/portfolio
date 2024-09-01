const projects = [
    {
      name: "Political Fact Checker",
      link: "github.com/nishanthdass",
      timeSpent: "August 2024 - Current",
      description: "Tool that leverages Retrieval-Augmented Generation (RAG) to detect misinformation in political speeches, rallies, and debates",
      bullets: [
        "Utilized the Scrapy web crawling framework to scrape webpages containing transcripts and press releases, ensuring comprehensive data acquisition.",
        "Refactored scraped documents into an expansive collection of JSONs, categorizing content by speaker name and associated time segments for precise tracking.",
        "Implemented recursive and semantic chunking strategies using Langchain to optimize document content and metadata for effective similarity searches, enhancing accuracy in misinformation detection.",
        "Leveraged the OpenAI Embeddings API and PGvector to create and manage document embeddings in a vector database, facilitating fast and scalable retrievals.",
        "Enhanced query capabilities and result augmentation by integrating outputs from the large language model (LLM) back into the vector database, improving the relevance and breadth of retrieved information."
      ]
    },
    {
      name: "Marketing Content Generator",
      link: "www.rgbzebra.com",
      timeSpent: "June 2024 - Current",
      description: "Marketing content generation tool that uses OpenAI's GPT and DALL-E APIs to automate and customize marketing content creation with a scalable, user-friendly interface for editing and fine-tuning outputs.",
      bullets: [
        "Developed a RESTful backend API using Express.js.",
        "Contributed to the development of an OpenAI API script by optimizing prompts and leveraging promises, which led to an improvement in performance.",
        "Created a Postman collection and environment for testing HTTP calls.",
        "Designed MySQL database model and schema.",
        "Deployed the application on Google Cloud Platform by leveraging Kubernetes for orchestrating microservices and utilizing Google App Engine for managing the central server components.",
        "Implemented secure SSO and session verification using GCP tokens ensuring robust access control.",
        "Designed responsive and reusable UI components using React Framework."
      ]
    },
    {
      name: "Smallsh Custom Shell",
      link: "github.com/nishanthdass",
      timeSpent: "February 2023 – April 2023",
      description: "",
      bullets: [
        "Developed a custom shell in C with support for background processes, signal handling, and I/O redirection.",
        "Implemented core functionalities such as command execution and managing background processes."
      ]
    }
  ];
  
  export default projects;
  