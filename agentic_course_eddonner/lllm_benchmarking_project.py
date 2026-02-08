# ============================================================================
# LLM INTELLIGENCE BENCHMARK TOOL
# ============================================================================
# This script implements an agentic AI system that:
# 1. Generates a challenging question using GPT
# 2. Has multiple LLMs answer the question
# 3. Uses GPT as a judge to rank the responses
#
# Agentic Patterns Used:
# - Evaluator/Critic: GPT judges and ranks competitor responses
# - Orchestrator: Main script coordinates the entire workflow
# ============================================================================

# ----------------------------------------------------------------------------
# IMPORTS - Required libraries for API interaction and environment management
# ----------------------------------------------------------------------------

import os  # For accessing environment variables
import json  # For parsing JSON responses from the judge
from dotenv import load_dotenv  # For loading API keys from .env file
from openai import OpenAI  # OpenAI API client
from anthropic import Anthropic  # Anthropic (Claude) API client
from IPython.display import Markdown, display  # For pretty-printing responses

# ----------------------------------------------------------------------------
# ENVIRONMENT SETUP - Load API keys from .env file
# ----------------------------------------------------------------------------

# Load environment variables from .env file
# override=True ensures we use the latest values if the file changes
load_dotenv(override=True)

# ----------------------------------------------------------------------------
# API KEY VALIDATION - Check which API keys are available
# ----------------------------------------------------------------------------

# Retrieve API keys from environment variables
openai_api_key = os.getenv('OPENAI_API_KEY')
anthropic_api_key = os.getenv('ANTHROPIC_API_KEY')
google_api_key = os.getenv('GOOGLE_API_KEY')
deepseek_api_key = os.getenv('DEEPSEEK_API_KEY')
groq_api_key = os.getenv('GROQ_API_KEY')

# Print key prefixes to verify they're loaded correctly (helps with debugging)
# We only show the first few characters for security
if openai_api_key:
    print(f"OpenAI API Key exists and begins {openai_api_key[:8]}")
else:
    print("OpenAI API Key not set")
    
if anthropic_api_key:
    print(f"Anthropic API Key exists and begins {anthropic_api_key[:7]}")
else:
    print("Anthropic API Key not set (and this is optional)")

if google_api_key:
    print(f"Google API Key exists and begins {google_api_key[:2]}")
else:
    print("Google API Key not set (and this is optional)")

if deepseek_api_key:
    print(f"DeepSeek API Key exists and begins {deepseek_api_key[:3]}")
else:
    print("DeepSeek API Key not set (and this is optional)")

if groq_api_key:
    print(f"Groq API Key exists and begins {groq_api_key[:4]}")
else:
    print("Groq API Key not set (and this is optional)")

# ----------------------------------------------------------------------------
# PHASE 1: QUESTION GENERATION
# ----------------------------------------------------------------------------
# Use GPT to generate a challenging question that will test LLM intelligence
# across multiple dimensions: reasoning, nuance, policy analysis, etc.
# ----------------------------------------------------------------------------

# Craft the request for question generation
request = "Please come up with a challenging, nuanced question that I can ask a number of LLMs to evaluate their intelligence. "
request += "Answer only with the question, no explanation."

# Format as a chat message (required format for OpenAI API)
messages = [{"role": "user", "content": request}]

# Initialize OpenAI client and generate the question
openai = OpenAI()
response = openai.chat.completions.create(
    model="gpt-5-mini",  # Using GPT-5-mini as the question generator
    messages=messages,
)

# Extract the generated question from the API response
question = response.choices[0].message.content
print(question)

# ----------------------------------------------------------------------------
# DATA STRUCTURES - Initialize lists to store competitors and their answers
# ----------------------------------------------------------------------------

competitors = []  # Will store model names (e.g., "gpt-5-nano", "llama3.2")
answers = []      # Will store corresponding answers from each model

# ----------------------------------------------------------------------------
# PHASE 2: MULTI-MODEL TESTING
# ----------------------------------------------------------------------------
# Send the same question to multiple LLMs and collect their responses
# This demonstrates the Orchestrator pattern
# ----------------------------------------------------------------------------

# Prepare the question as a message for the competitors
messages = [{"role": "user", "content": question}]

# --- COMPETITOR 1: GPT-5-nano via OpenAI ---
model_name = "gpt-5-nano"

# Call the OpenAI API with the question
response = openai.chat.completions.create(model=model_name, messages=messages)
answer = response.choices[0].message.content

# Display the answer in formatted Markdown
display(Markdown(answer))

# Store the competitor name and answer for later evaluation
competitors.append(model_name)
answers.append(answer)

# --- COMPETITOR 2: Llama 3.2 via Ollama (local model) ---
# Ollama runs locally and provides an OpenAI-compatible API
ollama = OpenAI(
    base_url='http://localhost:11434/v1',  # Ollama's local API endpoint
    api_key='ollama'  # Ollama doesn't need a real API key
)
model_name = "llama3.2"

# Call Ollama's API with the question
response = ollama.chat.completions.create(model=model_name, messages=messages)
answer = response.choices[0].message.content

# Display and store the answer
display(Markdown(answer))
competitors.append(model_name)
answers.append(answer)

# ----------------------------------------------------------------------------
# DATA VERIFICATION - Quick check of what we've collected
# ----------------------------------------------------------------------------

print(competitors)  # Show list of model names
print(answers)      # Show list of answers

# ----------------------------------------------------------------------------
# RESPONSE FORMATTING - Prepare answers for the judge
# ----------------------------------------------------------------------------

# Use zip() to iterate over competitors and answers simultaneously
# This is useful for displaying paired data
for competitor, answer in zip(competitors, answers):
    print(f"Competitor: {competitor}\n\n{answer}")

# Create a single string containing all responses
# enumerate() gives us both the index and the value
together = ""
for index, answer in enumerate(answers):
    together += f"# Response from competitor {index+1}\n\n"
    together += answer + "\n\n"

print(together)

# ----------------------------------------------------------------------------
# PHASE 3: AUTOMATED EVALUATION (Evaluator/Critic Pattern)
# ----------------------------------------------------------------------------
# Use GPT as an independent judge to evaluate and rank all responses
# The judge uses structured JSON output for consistent, parseable results
# ----------------------------------------------------------------------------

# Construct the judging prompt
# This prompt:
# 1. Explains the judge's role
# 2. Provides the original question for context
# 3. Specifies the desired JSON output format
# 4. Includes all competitor responses
judge = f"""You are judging a competition between {len(competitors)} competitors.
Each model has been given this question:

{question}

Your job is to evaluate each response for clarity and strength of argument, and rank them in order of best to worst.
Respond with JSON, and only JSON, with the following format:
{{"results": ["best competitor number", "second best competitor number", "third best competitor number", ...]}}

Here are the responses from each competitor:

{together}

Now respond with the JSON with the ranked order of the competitors, nothing else. Do not include markdown formatting or code blocks."""

print(judge)

# Format the judge prompt as a message
judge_messages = [{"role": "user", "content": judge}]

# ----------------------------------------------------------------------------
# JUDGMENT EXECUTION - Get rankings from GPT
# ----------------------------------------------------------------------------

openai = OpenAI()
response = openai.chat.completions.create(
    model="gpt-5-mini",  # Using GPT-5-mini as the judge
    messages=judge_messages,
)

# Extract the JSON results
results = response.choices[0].message.content
print(results)

# ----------------------------------------------------------------------------
# RESULTS PROCESSING - Parse and display the rankings
# ----------------------------------------------------------------------------

# Parse the JSON string into a Python dictionary
results_dict = json.loads(results)

# Extract the ranked list of competitor numbers
ranks = results_dict["results"]

# Display the final rankings
# Convert competitor numbers (strings like "1", "2") to array indices (0, 1)
for index, result in enumerate(ranks):
    competitor = competitors[int(result)-1]  # -1 because arrays are 0-indexed
    print(f"Rank {index+1}: {competitor}")

# ============================================================================
# AGENTIC DESIGN PATTERNS IDENTIFIED
# ============================================================================
# 
# This implementation uses TWO key agentic patterns:
#
# 1. EVALUATOR/CRITIC PATTERN
#    - An LLM (GPT-5-mini) acts as an independent judge
#    - Evaluates multiple responses against criteria (clarity, argument strength)
#    - Provides structured, objective rankings
#    - Eliminates human bias from the evaluation process
#
# 2. ORCHESTRATOR PATTERN
#    - The main script coordinates a complex workflow:
#      a) Question generation (GPT-5-mini)
#      b) Distribution to multiple LLM competitors
#      c) Collection and aggregation of responses
#      d) Submission to judge for evaluation
#      e) Parsing and display of results
#    - Manages multiple API calls and data transformations
#    - Ensures proper sequencing of operations
#
# POTENTIAL ENHANCEMENTS (Additional Agentic Patterns):
#
# 3. REFLECTION PATTERN
#    - Have each competitor LLM review and improve its own answer
#    - Before final submission, ask: "Review your answer and identify weaknesses"
#
# 4. TOOL USE PATTERN
#    - Allow LLMs to use external tools (calculators, search engines, databases)
#    - Could improve answer quality for data-heavy questions
#
# 5. MULTI-AGENT DEBATE
#    - Have LLMs discuss the question together before answering
#    - Could lead to more nuanced, well-rounded responses
#
# 6. PLANNING PATTERN
#    - Have LLMs break down complex questions into sub-problems
#    - Solve each sub-problem before synthesizing a final answer
#
# ============================================================================
