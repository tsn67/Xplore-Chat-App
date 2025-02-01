import fs from 'fs';
import OpenAI from 'openai';
import NodeCache from 'node-cache';
import { config } from 'dotenv';
config();

class LocalVectorStore {
  constructor() {
    this.documents = [];
  }

  add(documents) {
    this.documents.push(...documents);
  }

  async query({ queryTexts, nResults = 3 }) {
    const similarities = this.documents.map(doc =>
      this.calculateSimilarity(doc, queryTexts[0])
    );

    const sortedIndices = similarities
      .map((score, index) => ({ score, index }))
      .sort((a, b) => b.score - a.score)
      .slice(0, nResults);

    return {
      documents: [sortedIndices.map(item => this.documents[item.index])]
    };
  }

  calculateSimilarity(doc, query) {
    const docWords = doc.toLowerCase().split(/\s+/);
    const queryWords = query.toLowerCase().split(/\s+/);
    return queryWords.filter(word => docWords.includes(word)).length;
  }

  count() {
    return this.documents.length;
  }
}

// Initialize cache
const cache = new NodeCache({ 
  stdTTL: 300,  
  checkperiod: 60
});

// Parse description from file
function parseDescription(filePath) {
  return fs.readFileSync(filePath, 'utf-8').split('\n\n')
    .filter(paragraph => paragraph.trim());
}

// Initialize vector database
const vectorStore = new LocalVectorStore();
const descriptions = parseDescription('data.txt');
vectorStore.add(descriptions);

// OpenAI client initialization
const openaiClient = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": process.env.SITE_URL || "https://xplore24.com",
    "X-Title": process.env.SITE_NAME || "Xplore24 GCEK",
  }
});

export const chat = async (req, res) => {
  const startTime = Date.now();

  try {
    const { message } = req.body;
    var query = message;

    if (!query) {
      return res.status(400).json({ 
        error: 'Query is required' 
      });
    }

    // Check cache
    const cacheKey = `vector_${Buffer.from(query).toString('base64')}`;
    const cachedResponse = cache.get(cacheKey);

    if (cachedResponse) {
      return res.json({
        response: cachedResponse,
        source: 'cache',
        processingTime: `${Date.now() - startTime}ms`
      });
    }

    // Perform vector search
    const results = await vectorStore.query({
      queryTexts: [query],
      nResults: 3
    });

    const context = results.documents[0].join('\n\n');

    const systemPrompt = `
      You are an assistant for Xplore '24. 
      Answer based ONLY on the following context:
      ${context}
      Use the above information to provide a relevant answer to the query.
      Important: Never provide information unrelated to the event Xplore '24
    `;

    const completion = await openaiClient.chat.completions.create({
      model: "openai/gpt-3.5-turbo-1106",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: query
        }
      ],
      temperature: 0.7
    });

    const response = completion.choices[0].message.content;

    // Cache the response
    cache.set(cacheKey, response);

    res.json({
      response,
      source: 'live',
      processingTime: `${Date.now() - startTime}ms`
    });

  } catch (error) {
    console.error('Vector search error:', error);

    if (error.status === 401) {
      return res.status(401).json({
        error: 'Invalid API key or authentication failed',
        details: error.message
      });
    }

    if (error.status === 429) {
      return res.status(429).json({
        error: 'Rate limit exceeded. Please try again later.'
      });
    }

    res.status(500).json({ 
      error: 'Failed to process query',
      details: error.message
    });
  }
};